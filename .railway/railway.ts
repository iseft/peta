import { bucket, defineRailway, github, postgres, project, service, volume } from "railway/iac";

// Variables are unmanaged: secrets are set with `railway variable set` from
// 1Password, never written here.
export default defineRailway(() => {
  const Postgres = postgres("Postgres", { region: "europe-west4-drams3a" });
  Postgres.networking = { privateNetworkEndpoint: "postgres" };
  const postgresVolume = volume("postgres-volume", { alerts: { usage: { "100": {}, "80": {}, "95": {} } }, allowOnlineResize: true, region: "europe-west4-drams3a", sizeMB: 50000 });
  const backend = service("backend", {
    source: github("iseft/peta", { branch: "main", checkSuites: false }),
    build: { buildEnvironment: "V3", builder: "RAILPACK", buildCommand: "pnpm run build:backend && pnpm --filter backend sentry:sourcemaps" },
    start: "pnpm run start:backend",
    preDeploy: "pnpm run prisma:deploy:backend && pnpm run seed:backend",
    healthcheck: "/api/health",
    healthcheckTimeout: 300,
    replicas: { "europe-west4-drams3a": 1 },
  });

  // Marketing site + CMS (apps/web). Before each deploy Payload migrates its
  // own `payload` schema in the shared Postgres, then the seed creates the
  // admin and launch pages if they are missing (never overwriting edits).
  const web = service("web", {
    source: github("iseft/peta", { branch: "main", checkSuites: false }),
    build: {
      buildEnvironment: "V3",
      builder: "RAILPACK",
      buildCommand: "pnpm run build:web",
      watchPatterns: ["/apps/web/**", "/package.json", "/pnpm-lock.yaml"],
    },
    start: "pnpm run start:web",
    preDeploy: "pnpm run payload:migrate:web && pnpm run seed:web",
    healthcheck: "/health",
    healthcheckTimeout: 300,
    replicas: { "europe-west4-drams3a": 1 },
  });

  // CMS media uploads (S3-compatible), in Amsterdam next to the database.
  const media = bucket("media", { region: "ams" });

  return project("peta", {
    variables: { managed: false },
    resources: [backend, web, Postgres, postgresVolume, media],
  });
});
