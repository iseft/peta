import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // The CMS keeps to its own schema; the API's Prisma tables are in `public`.
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS "payload"`)
  await db.execute(sql`
   CREATE TYPE "payload"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "payload"."enum_pages_blocks_hero_centered_supertitle_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_hero_centered_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_hero_centered_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_hero_angled_image_supertitle_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_hero_angled_image_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_hero_angled_image_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_cta_simple_branded_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_cta_simple_branded_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_cta_simple_stacked_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_cta_simple_stacked_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_cta_dark_panel_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_cta_dark_panel_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_pages_blocks_image_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "payload"."enum_pages_blocks_image_fit" AS ENUM('contain', 'cover');
  CREATE TYPE "payload"."enum_pages_blocks_video_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "payload"."enum_pages_blocks_video_title_heading_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "payload"."enum_pages_blocks_video_title_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "payload"."enum_pages_blocks_video_description_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "payload"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_centered_supertitle_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_centered_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_centered_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_angled_image_supertitle_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_angled_image_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_hero_angled_image_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_cta_simple_branded_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_cta_simple_branded_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_cta_simple_stacked_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_cta_simple_stacked_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_cta_dark_panel_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_cta_dark_panel_cta2_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum__pages_v_blocks_image_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "payload"."enum__pages_v_blocks_image_fit" AS ENUM('contain', 'cover');
  CREATE TYPE "payload"."enum__pages_v_blocks_video_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "payload"."enum__pages_v_blocks_video_title_heading_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "payload"."enum__pages_v_blocks_video_title_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "payload"."enum__pages_v_blocks_video_description_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "payload"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_blog_blocks_blog_title_level" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "payload"."enum_blog_blocks_image_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "payload"."enum_blog_blocks_image_fit" AS ENUM('contain', 'cover');
  CREATE TYPE "payload"."enum_blog_blocks_video_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "payload"."enum_blog_blocks_video_title_heading_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "payload"."enum_blog_blocks_video_title_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "payload"."enum_blog_blocks_video_description_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "payload"."enum_blog_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__blog_v_blocks_blog_title_level" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "payload"."enum__blog_v_blocks_image_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "payload"."enum__blog_v_blocks_image_fit" AS ENUM('contain', 'cover');
  CREATE TYPE "payload"."enum__blog_v_blocks_video_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "payload"."enum__blog_v_blocks_video_title_heading_level" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "payload"."enum__blog_v_blocks_video_title_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "payload"."enum__blog_v_blocks_video_description_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "payload"."enum__blog_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_nav_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_nav_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_footer_footer_sections_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "payload"."enum_footer_social_links_platform" AS ENUM('instagram', 'tiktok', 'youtube', 'x', 'reddit', 'threads');
  CREATE TABLE "payload"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "payload"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "payload"."enum_users_role" DEFAULT 'editor',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_hero_centered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"supertitle" varchar,
  	"supertitle_cta_label" varchar,
  	"supertitle_cta_link_type" "payload"."enum_pages_blocks_hero_centered_supertitle_cta_link_type" DEFAULT 'internal',
  	"supertitle_cta_page_id" integer,
  	"supertitle_cta_url" varchar,
  	"supertitle_cta_open_in_new_tab" boolean DEFAULT false,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum_pages_blocks_hero_centered_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum_pages_blocks_hero_centered_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_hero_angled_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"supertitle" varchar,
  	"supertitle_cta_label" varchar,
  	"supertitle_cta_link_type" "payload"."enum_pages_blocks_hero_angled_image_supertitle_cta_link_type" DEFAULT 'internal',
  	"supertitle_cta_page_id" integer,
  	"supertitle_cta_url" varchar,
  	"supertitle_cta_open_in_new_tab" boolean DEFAULT false,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum_pages_blocks_hero_angled_image_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum_pages_blocks_hero_angled_image_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."feat_large_shot_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_name" varchar
  );
  
  CREATE TABLE "payload"."feat_large_shot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"dark_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."feat_product_shot_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_name" varchar
  );
  
  CREATE TABLE "payload"."feat_product_shot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"dark_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_feature_bordered_screenshot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"dark_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_feature_offset_list_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_feature_offset_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_feature_simple_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_feature_simple" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"centered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."feat_three_cols_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"href" varchar,
  	"icon_name" varchar
  );
  
  CREATE TABLE "payload"."feat_three_cols" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_feature_two_by_two_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_feature_two_by_two_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_cta_simple_branded" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum_pages_blocks_cta_simple_branded_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum_pages_blocks_cta_simple_branded_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_cta_simple_stacked" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum_pages_blocks_cta_simple_stacked_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum_pages_blocks_cta_simple_stacked_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_cta_dark_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum_pages_blocks_cta_dark_panel_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum_pages_blocks_cta_dark_panel_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_header_centered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_header_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_timeline_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"date" varchar,
  	"is_date" boolean DEFAULT true,
  	"is_current" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"alt" varchar,
  	"show_caption" boolean DEFAULT true,
  	"alignment" "payload"."enum_pages_blocks_image_alignment" DEFAULT 'center',
  	"fit" "payload"."enum_pages_blocks_image_fit" DEFAULT 'contain',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"alignment" "payload"."enum_pages_blocks_video_alignment" DEFAULT 'center',
  	"title" varchar,
  	"title_heading_level" "payload"."enum_pages_blocks_video_title_heading_level" DEFAULT '2',
  	"title_alignment" "payload"."enum_pages_blocks_video_title_alignment" DEFAULT 'left',
  	"description" varchar,
  	"description_alignment" "payload"."enum_pages_blocks_video_description_alignment" DEFAULT 'left',
  	"auto_play" boolean DEFAULT false,
  	"mute" boolean DEFAULT false,
  	"loop" boolean DEFAULT false,
  	"show_controls" boolean DEFAULT true,
  	"show_related" boolean DEFAULT false,
  	"modest_branding" boolean DEFAULT true,
  	"show_fullscreen_button" boolean DEFAULT true,
  	"plays_inline" boolean DEFAULT true,
  	"start_seconds" numeric,
  	"end_seconds" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."content_product_shot_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_name" varchar
  );
  
  CREATE TABLE "payload"."content_product_shot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"dark_image_id" integer,
  	"pre_bullet_description" varchar,
  	"post_bullet_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_stats_simple_grid_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "payload"."pages_blocks_stats_simple_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_centered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"supertitle" varchar,
  	"supertitle_cta_label" varchar,
  	"supertitle_cta_link_type" "payload"."enum__pages_v_blocks_hero_centered_supertitle_cta_link_type" DEFAULT 'internal',
  	"supertitle_cta_page_id" integer,
  	"supertitle_cta_url" varchar,
  	"supertitle_cta_open_in_new_tab" boolean DEFAULT false,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum__pages_v_blocks_hero_centered_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum__pages_v_blocks_hero_centered_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_hero_angled_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"supertitle" varchar,
  	"supertitle_cta_label" varchar,
  	"supertitle_cta_link_type" "payload"."enum__pages_v_blocks_hero_angled_image_supertitle_cta_link_type" DEFAULT 'internal',
  	"supertitle_cta_page_id" integer,
  	"supertitle_cta_url" varchar,
  	"supertitle_cta_open_in_new_tab" boolean DEFAULT false,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum__pages_v_blocks_hero_angled_image_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum__pages_v_blocks_hero_angled_image_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_feat_large_shot_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_feat_large_shot_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"dark_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_feat_product_shot_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_feat_product_shot_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"dark_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_feature_bordered_screenshot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"dark_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_feature_offset_list_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_feature_offset_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_feature_simple_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_feature_simple" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"centered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_feat_three_cols_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"href" varchar,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_feat_three_cols_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_feature_two_by_two_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_feature_two_by_two_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_cta_simple_branded" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum__pages_v_blocks_cta_simple_branded_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum__pages_v_blocks_cta_simple_branded_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_cta_simple_stacked" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum__pages_v_blocks_cta_simple_stacked_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum__pages_v_blocks_cta_simple_stacked_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_cta_dark_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum__pages_v_blocks_cta_dark_panel_cta_link_type" DEFAULT 'internal',
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta2_label" varchar,
  	"cta2_link_type" "payload"."enum__pages_v_blocks_cta_dark_panel_cta2_link_type" DEFAULT 'internal',
  	"cta2_page_id" integer,
  	"cta2_url" varchar,
  	"cta2_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_header_centered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_header_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_timeline_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"date" varchar,
  	"is_date" boolean DEFAULT true,
  	"is_current" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"alt" varchar,
  	"show_caption" boolean DEFAULT true,
  	"alignment" "payload"."enum__pages_v_blocks_image_alignment" DEFAULT 'center',
  	"fit" "payload"."enum__pages_v_blocks_image_fit" DEFAULT 'contain',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"alignment" "payload"."enum__pages_v_blocks_video_alignment" DEFAULT 'center',
  	"title" varchar,
  	"title_heading_level" "payload"."enum__pages_v_blocks_video_title_heading_level" DEFAULT '2',
  	"title_alignment" "payload"."enum__pages_v_blocks_video_title_alignment" DEFAULT 'left',
  	"description" varchar,
  	"description_alignment" "payload"."enum__pages_v_blocks_video_description_alignment" DEFAULT 'left',
  	"auto_play" boolean DEFAULT false,
  	"mute" boolean DEFAULT false,
  	"loop" boolean DEFAULT false,
  	"show_controls" boolean DEFAULT true,
  	"show_related" boolean DEFAULT false,
  	"modest_branding" boolean DEFAULT true,
  	"show_fullscreen_button" boolean DEFAULT true,
  	"plays_inline" boolean DEFAULT true,
  	"start_seconds" numeric,
  	"end_seconds" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_content_product_shot_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_content_product_shot_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"dark_image_id" integer,
  	"pre_bullet_description" varchar,
  	"post_bullet_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_stats_simple_grid_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v_blocks_stats_simple_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_url" varchar,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."blog_blocks_blog_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."blog_blocks_blog_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"level" "payload"."enum_blog_blocks_blog_title_level" DEFAULT 'h2',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."blog_blocks_blog_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."blog_blocks_blog_bullet_points_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_name" varchar
  );
  
  CREATE TABLE "payload"."blog_blocks_blog_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."blog_blocks_blog_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"author_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."blog_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"alt" varchar,
  	"show_caption" boolean DEFAULT true,
  	"alignment" "payload"."enum_blog_blocks_image_alignment" DEFAULT 'center',
  	"fit" "payload"."enum_blog_blocks_image_fit" DEFAULT 'contain',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."blog_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"alignment" "payload"."enum_blog_blocks_video_alignment" DEFAULT 'center',
  	"title" varchar,
  	"title_heading_level" "payload"."enum_blog_blocks_video_title_heading_level" DEFAULT '2',
  	"title_alignment" "payload"."enum_blog_blocks_video_title_alignment" DEFAULT 'left',
  	"description" varchar,
  	"description_alignment" "payload"."enum_blog_blocks_video_description_alignment" DEFAULT 'left',
  	"auto_play" boolean DEFAULT false,
  	"mute" boolean DEFAULT false,
  	"loop" boolean DEFAULT false,
  	"show_controls" boolean DEFAULT true,
  	"show_related" boolean DEFAULT false,
  	"modest_branding" boolean DEFAULT true,
  	"show_fullscreen_button" boolean DEFAULT true,
  	"plays_inline" boolean DEFAULT true,
  	"start_seconds" numeric,
  	"end_seconds" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"slug" varchar,
  	"cover_image_id" integer,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_href" varchar,
  	"author_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_blog_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."_blog_v_blocks_blog_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_blog_v_blocks_blog_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"level" "payload"."enum__blog_v_blocks_blog_title_level" DEFAULT 'h2',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_blog_v_blocks_blog_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_blog_v_blocks_blog_bullet_points_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_blog_v_blocks_blog_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_blog_v_blocks_blog_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"author_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_blog_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"alt" varchar,
  	"show_caption" boolean DEFAULT true,
  	"alignment" "payload"."enum__blog_v_blocks_image_alignment" DEFAULT 'center',
  	"fit" "payload"."enum__blog_v_blocks_image_fit" DEFAULT 'contain',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_blog_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"alignment" "payload"."enum__blog_v_blocks_video_alignment" DEFAULT 'center',
  	"title" varchar,
  	"title_heading_level" "payload"."enum__blog_v_blocks_video_title_heading_level" DEFAULT '2',
  	"title_alignment" "payload"."enum__blog_v_blocks_video_title_alignment" DEFAULT 'left',
  	"description" varchar,
  	"description_alignment" "payload"."enum__blog_v_blocks_video_description_alignment" DEFAULT 'left',
  	"auto_play" boolean DEFAULT false,
  	"mute" boolean DEFAULT false,
  	"loop" boolean DEFAULT false,
  	"show_controls" boolean DEFAULT true,
  	"show_related" boolean DEFAULT false,
  	"modest_branding" boolean DEFAULT true,
  	"show_fullscreen_button" boolean DEFAULT true,
  	"plays_inline" boolean DEFAULT true,
  	"start_seconds" numeric,
  	"end_seconds" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload"."_blog_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_url" varchar,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_cover_image_id" integer,
  	"version_author_name" varchar,
  	"version_author_role" varchar,
  	"version_author_href" varchar,
  	"version_author_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__blog_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"blog_id" integer
  );
  
  CREATE TABLE "payload"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "payload"."enum_nav_items_link_type" DEFAULT 'internal' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_promo" boolean DEFAULT false,
  	"promo_text" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "payload"."enum_nav_cta_link_type" DEFAULT 'internal' NOT NULL,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."footer_footer_sections_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "payload"."enum_footer_footer_sections_links_link_type" DEFAULT 'internal' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "payload"."footer_footer_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "payload"."enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"copyright" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_centered" ADD CONSTRAINT "pages_blocks_hero_centered_supertitle_cta_page_id_pages_id_fk" FOREIGN KEY ("supertitle_cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_centered" ADD CONSTRAINT "pages_blocks_hero_centered_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_centered" ADD CONSTRAINT "pages_blocks_hero_centered_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_centered" ADD CONSTRAINT "pages_blocks_hero_centered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_angled_image" ADD CONSTRAINT "pages_blocks_hero_angled_image_supertitle_cta_page_id_pages_id_fk" FOREIGN KEY ("supertitle_cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_angled_image" ADD CONSTRAINT "pages_blocks_hero_angled_image_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_angled_image" ADD CONSTRAINT "pages_blocks_hero_angled_image_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_angled_image" ADD CONSTRAINT "pages_blocks_hero_angled_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_hero_angled_image" ADD CONSTRAINT "pages_blocks_hero_angled_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."feat_large_shot_features" ADD CONSTRAINT "feat_large_shot_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."feat_large_shot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."feat_large_shot" ADD CONSTRAINT "feat_large_shot_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."feat_large_shot" ADD CONSTRAINT "feat_large_shot_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."feat_large_shot" ADD CONSTRAINT "feat_large_shot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."feat_product_shot_features" ADD CONSTRAINT "feat_product_shot_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."feat_product_shot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."feat_product_shot" ADD CONSTRAINT "feat_product_shot_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."feat_product_shot" ADD CONSTRAINT "feat_product_shot_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."feat_product_shot" ADD CONSTRAINT "feat_product_shot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_bordered_screenshot" ADD CONSTRAINT "pages_blocks_feature_bordered_screenshot_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_bordered_screenshot" ADD CONSTRAINT "pages_blocks_feature_bordered_screenshot_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_bordered_screenshot" ADD CONSTRAINT "pages_blocks_feature_bordered_screenshot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_offset_list_features" ADD CONSTRAINT "pages_blocks_feature_offset_list_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_feature_offset_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_offset_list" ADD CONSTRAINT "pages_blocks_feature_offset_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_simple_features" ADD CONSTRAINT "pages_blocks_feature_simple_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_feature_simple"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_simple" ADD CONSTRAINT "pages_blocks_feature_simple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."feat_three_cols_features" ADD CONSTRAINT "feat_three_cols_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."feat_three_cols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."feat_three_cols" ADD CONSTRAINT "feat_three_cols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_two_by_two_grid_features" ADD CONSTRAINT "pages_blocks_feature_two_by_two_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_feature_two_by_two_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_feature_two_by_two_grid" ADD CONSTRAINT "pages_blocks_feature_two_by_two_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_simple_branded" ADD CONSTRAINT "pages_blocks_cta_simple_branded_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_simple_branded" ADD CONSTRAINT "pages_blocks_cta_simple_branded_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_simple_branded" ADD CONSTRAINT "pages_blocks_cta_simple_branded_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_simple_stacked" ADD CONSTRAINT "pages_blocks_cta_simple_stacked_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_simple_stacked" ADD CONSTRAINT "pages_blocks_cta_simple_stacked_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_simple_stacked" ADD CONSTRAINT "pages_blocks_cta_simple_stacked_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_dark_panel" ADD CONSTRAINT "pages_blocks_cta_dark_panel_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_dark_panel" ADD CONSTRAINT "pages_blocks_cta_dark_panel_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_cta_dark_panel" ADD CONSTRAINT "pages_blocks_cta_dark_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_header_centered" ADD CONSTRAINT "pages_blocks_header_centered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_header_left" ADD CONSTRAINT "pages_blocks_header_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_timeline_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_faq_faqs" ADD CONSTRAINT "pages_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."content_product_shot_bullets" ADD CONSTRAINT "content_product_shot_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."content_product_shot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."content_product_shot" ADD CONSTRAINT "content_product_shot_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."content_product_shot" ADD CONSTRAINT "content_product_shot_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."content_product_shot" ADD CONSTRAINT "content_product_shot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_stats_simple_grid_stats" ADD CONSTRAINT "pages_blocks_stats_simple_grid_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages_blocks_stats_simple_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages_blocks_stats_simple_grid" ADD CONSTRAINT "pages_blocks_stats_simple_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_centered" ADD CONSTRAINT "_pages_v_blocks_hero_centered_supertitle_cta_page_id_pages_id_fk" FOREIGN KEY ("supertitle_cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_centered" ADD CONSTRAINT "_pages_v_blocks_hero_centered_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_centered" ADD CONSTRAINT "_pages_v_blocks_hero_centered_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_centered" ADD CONSTRAINT "_pages_v_blocks_hero_centered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_angled_image" ADD CONSTRAINT "_pages_v_blocks_hero_angled_image_supertitle_cta_page_id_pages_id_fk" FOREIGN KEY ("supertitle_cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_angled_image" ADD CONSTRAINT "_pages_v_blocks_hero_angled_image_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_angled_image" ADD CONSTRAINT "_pages_v_blocks_hero_angled_image_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_angled_image" ADD CONSTRAINT "_pages_v_blocks_hero_angled_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_hero_angled_image" ADD CONSTRAINT "_pages_v_blocks_hero_angled_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_feat_large_shot_v_features" ADD CONSTRAINT "_feat_large_shot_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_feat_large_shot_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_feat_large_shot_v" ADD CONSTRAINT "_feat_large_shot_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_feat_large_shot_v" ADD CONSTRAINT "_feat_large_shot_v_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_feat_large_shot_v" ADD CONSTRAINT "_feat_large_shot_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_feat_product_shot_v_features" ADD CONSTRAINT "_feat_product_shot_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_feat_product_shot_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_feat_product_shot_v" ADD CONSTRAINT "_feat_product_shot_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_feat_product_shot_v" ADD CONSTRAINT "_feat_product_shot_v_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_feat_product_shot_v" ADD CONSTRAINT "_feat_product_shot_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_bordered_screenshot" ADD CONSTRAINT "_pages_v_blocks_feature_bordered_screenshot_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_bordered_screenshot" ADD CONSTRAINT "_pages_v_blocks_feature_bordered_screenshot_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_bordered_screenshot" ADD CONSTRAINT "_pages_v_blocks_feature_bordered_screenshot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_offset_list_features" ADD CONSTRAINT "_pages_v_blocks_feature_offset_list_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_feature_offset_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_offset_list" ADD CONSTRAINT "_pages_v_blocks_feature_offset_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_simple_features" ADD CONSTRAINT "_pages_v_blocks_feature_simple_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_feature_simple"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_simple" ADD CONSTRAINT "_pages_v_blocks_feature_simple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_feat_three_cols_v_features" ADD CONSTRAINT "_feat_three_cols_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_feat_three_cols_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_feat_three_cols_v" ADD CONSTRAINT "_feat_three_cols_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_two_by_two_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_two_by_two_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_feature_two_by_two_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_feature_two_by_two_grid" ADD CONSTRAINT "_pages_v_blocks_feature_two_by_two_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_simple_branded" ADD CONSTRAINT "_pages_v_blocks_cta_simple_branded_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_simple_branded" ADD CONSTRAINT "_pages_v_blocks_cta_simple_branded_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_simple_branded" ADD CONSTRAINT "_pages_v_blocks_cta_simple_branded_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_simple_stacked" ADD CONSTRAINT "_pages_v_blocks_cta_simple_stacked_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_simple_stacked" ADD CONSTRAINT "_pages_v_blocks_cta_simple_stacked_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_simple_stacked" ADD CONSTRAINT "_pages_v_blocks_cta_simple_stacked_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_dark_panel" ADD CONSTRAINT "_pages_v_blocks_cta_dark_panel_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_dark_panel" ADD CONSTRAINT "_pages_v_blocks_cta_dark_panel_cta2_page_id_pages_id_fk" FOREIGN KEY ("cta2_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_cta_dark_panel" ADD CONSTRAINT "_pages_v_blocks_cta_dark_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_header_centered" ADD CONSTRAINT "_pages_v_blocks_header_centered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_header_left" ADD CONSTRAINT "_pages_v_blocks_header_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_timeline_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_faq_faqs" ADD CONSTRAINT "_pages_v_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_content_product_shot_v_bullets" ADD CONSTRAINT "_content_product_shot_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_content_product_shot_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_content_product_shot_v" ADD CONSTRAINT "_content_product_shot_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_content_product_shot_v" ADD CONSTRAINT "_content_product_shot_v_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_content_product_shot_v" ADD CONSTRAINT "_content_product_shot_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_stats_simple_grid_stats" ADD CONSTRAINT "_pages_v_blocks_stats_simple_grid_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v_blocks_stats_simple_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_blocks_stats_simple_grid" ADD CONSTRAINT "_pages_v_blocks_stats_simple_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_blog_header" ADD CONSTRAINT "blog_blocks_blog_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_blog_title" ADD CONSTRAINT "blog_blocks_blog_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_blog_text" ADD CONSTRAINT "blog_blocks_blog_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_blog_bullet_points_items" ADD CONSTRAINT "blog_blocks_blog_bullet_points_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog_blocks_blog_bullet_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_blog_bullet_points" ADD CONSTRAINT "blog_blocks_blog_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_blog_quote" ADD CONSTRAINT "blog_blocks_blog_quote_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_blog_quote" ADD CONSTRAINT "blog_blocks_blog_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_image" ADD CONSTRAINT "blog_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_image" ADD CONSTRAINT "blog_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_blocks_video" ADD CONSTRAINT "blog_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog" ADD CONSTRAINT "blog_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blog" ADD CONSTRAINT "blog_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blog" ADD CONSTRAINT "blog_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_blog_header" ADD CONSTRAINT "_blog_v_blocks_blog_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_blog_title" ADD CONSTRAINT "_blog_v_blocks_blog_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_blog_text" ADD CONSTRAINT "_blog_v_blocks_blog_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_blog_bullet_points_items" ADD CONSTRAINT "_blog_v_blocks_blog_bullet_points_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_v_blocks_blog_bullet_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_blog_bullet_points" ADD CONSTRAINT "_blog_v_blocks_blog_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_blog_quote" ADD CONSTRAINT "_blog_v_blocks_blog_quote_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_blog_quote" ADD CONSTRAINT "_blog_v_blocks_blog_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_image" ADD CONSTRAINT "_blog_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_image" ADD CONSTRAINT "_blog_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v_blocks_video" ADD CONSTRAINT "_blog_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v" ADD CONSTRAINT "_blog_v_parent_id_blog_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."blog"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v" ADD CONSTRAINT "_blog_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v" ADD CONSTRAINT "_blog_v_version_author_image_id_media_id_fk" FOREIGN KEY ("version_author_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_v" ADD CONSTRAINT "_blog_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "payload"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."nav_items" ADD CONSTRAINT "nav_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."nav_items" ADD CONSTRAINT "nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."nav" ADD CONSTRAINT "nav_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."footer_footer_sections_links" ADD CONSTRAINT "footer_footer_sections_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."footer_footer_sections_links" ADD CONSTRAINT "footer_footer_sections_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer_footer_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_footer_sections" ADD CONSTRAINT "footer_footer_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "payload"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "payload"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "payload"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "payload"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "payload"."users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "payload"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "payload"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "payload"."media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "payload"."media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "payload"."media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "payload"."media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "payload"."media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "payload"."media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "payload"."media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "payload"."media" USING btree ("sizes_og_filename");
  CREATE INDEX "pages_blocks_hero_centered_order_idx" ON "payload"."pages_blocks_hero_centered" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_centered_parent_id_idx" ON "payload"."pages_blocks_hero_centered" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_centered_path_idx" ON "payload"."pages_blocks_hero_centered" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_centered_supertitle_cta_supertitle_cta_idx" ON "payload"."pages_blocks_hero_centered" USING btree ("supertitle_cta_page_id");
  CREATE INDEX "pages_blocks_hero_centered_cta_cta_page_idx" ON "payload"."pages_blocks_hero_centered" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_hero_centered_cta2_cta2_page_idx" ON "payload"."pages_blocks_hero_centered" USING btree ("cta2_page_id");
  CREATE INDEX "pages_blocks_hero_angled_image_order_idx" ON "payload"."pages_blocks_hero_angled_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_angled_image_parent_id_idx" ON "payload"."pages_blocks_hero_angled_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_angled_image_path_idx" ON "payload"."pages_blocks_hero_angled_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_angled_image_supertitle_cta_supertitle_idx" ON "payload"."pages_blocks_hero_angled_image" USING btree ("supertitle_cta_page_id");
  CREATE INDEX "pages_blocks_hero_angled_image_cta_cta_page_idx" ON "payload"."pages_blocks_hero_angled_image" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_hero_angled_image_cta2_cta2_page_idx" ON "payload"."pages_blocks_hero_angled_image" USING btree ("cta2_page_id");
  CREATE INDEX "pages_blocks_hero_angled_image_image_idx" ON "payload"."pages_blocks_hero_angled_image" USING btree ("image_id");
  CREATE INDEX "feat_large_shot_features_order_idx" ON "payload"."feat_large_shot_features" USING btree ("_order");
  CREATE INDEX "feat_large_shot_features_parent_id_idx" ON "payload"."feat_large_shot_features" USING btree ("_parent_id");
  CREATE INDEX "feat_large_shot_order_idx" ON "payload"."feat_large_shot" USING btree ("_order");
  CREATE INDEX "feat_large_shot_parent_id_idx" ON "payload"."feat_large_shot" USING btree ("_parent_id");
  CREATE INDEX "feat_large_shot_path_idx" ON "payload"."feat_large_shot" USING btree ("_path");
  CREATE INDEX "feat_large_shot_image_idx" ON "payload"."feat_large_shot" USING btree ("image_id");
  CREATE INDEX "feat_large_shot_dark_image_idx" ON "payload"."feat_large_shot" USING btree ("dark_image_id");
  CREATE INDEX "feat_product_shot_features_order_idx" ON "payload"."feat_product_shot_features" USING btree ("_order");
  CREATE INDEX "feat_product_shot_features_parent_id_idx" ON "payload"."feat_product_shot_features" USING btree ("_parent_id");
  CREATE INDEX "feat_product_shot_order_idx" ON "payload"."feat_product_shot" USING btree ("_order");
  CREATE INDEX "feat_product_shot_parent_id_idx" ON "payload"."feat_product_shot" USING btree ("_parent_id");
  CREATE INDEX "feat_product_shot_path_idx" ON "payload"."feat_product_shot" USING btree ("_path");
  CREATE INDEX "feat_product_shot_image_idx" ON "payload"."feat_product_shot" USING btree ("image_id");
  CREATE INDEX "feat_product_shot_dark_image_idx" ON "payload"."feat_product_shot" USING btree ("dark_image_id");
  CREATE INDEX "pages_blocks_feature_bordered_screenshot_order_idx" ON "payload"."pages_blocks_feature_bordered_screenshot" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_bordered_screenshot_parent_id_idx" ON "payload"."pages_blocks_feature_bordered_screenshot" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_bordered_screenshot_path_idx" ON "payload"."pages_blocks_feature_bordered_screenshot" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_bordered_screenshot_image_idx" ON "payload"."pages_blocks_feature_bordered_screenshot" USING btree ("image_id");
  CREATE INDEX "pages_blocks_feature_bordered_screenshot_dark_image_idx" ON "payload"."pages_blocks_feature_bordered_screenshot" USING btree ("dark_image_id");
  CREATE INDEX "pages_blocks_feature_offset_list_features_order_idx" ON "payload"."pages_blocks_feature_offset_list_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_offset_list_features_parent_id_idx" ON "payload"."pages_blocks_feature_offset_list_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_offset_list_order_idx" ON "payload"."pages_blocks_feature_offset_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_offset_list_parent_id_idx" ON "payload"."pages_blocks_feature_offset_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_offset_list_path_idx" ON "payload"."pages_blocks_feature_offset_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_simple_features_order_idx" ON "payload"."pages_blocks_feature_simple_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_simple_features_parent_id_idx" ON "payload"."pages_blocks_feature_simple_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_simple_order_idx" ON "payload"."pages_blocks_feature_simple" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_simple_parent_id_idx" ON "payload"."pages_blocks_feature_simple" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_simple_path_idx" ON "payload"."pages_blocks_feature_simple" USING btree ("_path");
  CREATE INDEX "feat_three_cols_features_order_idx" ON "payload"."feat_three_cols_features" USING btree ("_order");
  CREATE INDEX "feat_three_cols_features_parent_id_idx" ON "payload"."feat_three_cols_features" USING btree ("_parent_id");
  CREATE INDEX "feat_three_cols_order_idx" ON "payload"."feat_three_cols" USING btree ("_order");
  CREATE INDEX "feat_three_cols_parent_id_idx" ON "payload"."feat_three_cols" USING btree ("_parent_id");
  CREATE INDEX "feat_three_cols_path_idx" ON "payload"."feat_three_cols" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_two_by_two_grid_features_order_idx" ON "payload"."pages_blocks_feature_two_by_two_grid_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_two_by_two_grid_features_parent_id_idx" ON "payload"."pages_blocks_feature_two_by_two_grid_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_two_by_two_grid_order_idx" ON "payload"."pages_blocks_feature_two_by_two_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_two_by_two_grid_parent_id_idx" ON "payload"."pages_blocks_feature_two_by_two_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_two_by_two_grid_path_idx" ON "payload"."pages_blocks_feature_two_by_two_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_simple_branded_order_idx" ON "payload"."pages_blocks_cta_simple_branded" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_simple_branded_parent_id_idx" ON "payload"."pages_blocks_cta_simple_branded" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_simple_branded_path_idx" ON "payload"."pages_blocks_cta_simple_branded" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_simple_branded_cta_cta_page_idx" ON "payload"."pages_blocks_cta_simple_branded" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_cta_simple_branded_cta2_cta2_page_idx" ON "payload"."pages_blocks_cta_simple_branded" USING btree ("cta2_page_id");
  CREATE INDEX "pages_blocks_cta_simple_stacked_order_idx" ON "payload"."pages_blocks_cta_simple_stacked" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_simple_stacked_parent_id_idx" ON "payload"."pages_blocks_cta_simple_stacked" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_simple_stacked_path_idx" ON "payload"."pages_blocks_cta_simple_stacked" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_simple_stacked_cta_cta_page_idx" ON "payload"."pages_blocks_cta_simple_stacked" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_cta_simple_stacked_cta2_cta2_page_idx" ON "payload"."pages_blocks_cta_simple_stacked" USING btree ("cta2_page_id");
  CREATE INDEX "pages_blocks_cta_dark_panel_order_idx" ON "payload"."pages_blocks_cta_dark_panel" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_dark_panel_parent_id_idx" ON "payload"."pages_blocks_cta_dark_panel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_dark_panel_path_idx" ON "payload"."pages_blocks_cta_dark_panel" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_dark_panel_cta_cta_page_idx" ON "payload"."pages_blocks_cta_dark_panel" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_cta_dark_panel_cta2_cta2_page_idx" ON "payload"."pages_blocks_cta_dark_panel" USING btree ("cta2_page_id");
  CREATE INDEX "pages_blocks_header_centered_order_idx" ON "payload"."pages_blocks_header_centered" USING btree ("_order");
  CREATE INDEX "pages_blocks_header_centered_parent_id_idx" ON "payload"."pages_blocks_header_centered" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_header_centered_path_idx" ON "payload"."pages_blocks_header_centered" USING btree ("_path");
  CREATE INDEX "pages_blocks_header_left_order_idx" ON "payload"."pages_blocks_header_left" USING btree ("_order");
  CREATE INDEX "pages_blocks_header_left_parent_id_idx" ON "payload"."pages_blocks_header_left" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_header_left_path_idx" ON "payload"."pages_blocks_header_left" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_timeline_items_order_idx" ON "payload"."pages_blocks_timeline_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_timeline_items_parent_id_idx" ON "payload"."pages_blocks_timeline_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "payload"."pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "payload"."pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "payload"."pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_faqs_order_idx" ON "payload"."pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_faqs_parent_id_idx" ON "payload"."pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "payload"."pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "payload"."pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "payload"."pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_order_idx" ON "payload"."pages_blocks_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_parent_id_idx" ON "payload"."pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_path_idx" ON "payload"."pages_blocks_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_image_idx" ON "payload"."pages_blocks_image" USING btree ("image_id");
  CREATE INDEX "pages_blocks_video_order_idx" ON "payload"."pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "payload"."pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "payload"."pages_blocks_video" USING btree ("_path");
  CREATE INDEX "content_product_shot_bullets_order_idx" ON "payload"."content_product_shot_bullets" USING btree ("_order");
  CREATE INDEX "content_product_shot_bullets_parent_id_idx" ON "payload"."content_product_shot_bullets" USING btree ("_parent_id");
  CREATE INDEX "content_product_shot_order_idx" ON "payload"."content_product_shot" USING btree ("_order");
  CREATE INDEX "content_product_shot_parent_id_idx" ON "payload"."content_product_shot" USING btree ("_parent_id");
  CREATE INDEX "content_product_shot_path_idx" ON "payload"."content_product_shot" USING btree ("_path");
  CREATE INDEX "content_product_shot_image_idx" ON "payload"."content_product_shot" USING btree ("image_id");
  CREATE INDEX "content_product_shot_dark_image_idx" ON "payload"."content_product_shot" USING btree ("dark_image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "payload"."pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "payload"."pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "payload"."pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_simple_grid_stats_order_idx" ON "payload"."pages_blocks_stats_simple_grid_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_simple_grid_stats_parent_id_idx" ON "payload"."pages_blocks_stats_simple_grid_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_simple_grid_order_idx" ON "payload"."pages_blocks_stats_simple_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_simple_grid_parent_id_idx" ON "payload"."pages_blocks_stats_simple_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_simple_grid_path_idx" ON "payload"."pages_blocks_stats_simple_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "payload"."pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "payload"."pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "payload"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "payload"."pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "payload"."pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_centered_order_idx" ON "payload"."_pages_v_blocks_hero_centered" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_centered_parent_id_idx" ON "payload"."_pages_v_blocks_hero_centered" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_centered_path_idx" ON "payload"."_pages_v_blocks_hero_centered" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_centered_supertitle_cta_supertitle__idx" ON "payload"."_pages_v_blocks_hero_centered" USING btree ("supertitle_cta_page_id");
  CREATE INDEX "_pages_v_blocks_hero_centered_cta_cta_page_idx" ON "payload"."_pages_v_blocks_hero_centered" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_hero_centered_cta2_cta2_page_idx" ON "payload"."_pages_v_blocks_hero_centered" USING btree ("cta2_page_id");
  CREATE INDEX "_pages_v_blocks_hero_angled_image_order_idx" ON "payload"."_pages_v_blocks_hero_angled_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_angled_image_parent_id_idx" ON "payload"."_pages_v_blocks_hero_angled_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_angled_image_path_idx" ON "payload"."_pages_v_blocks_hero_angled_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_angled_image_supertitle_cta_superti_idx" ON "payload"."_pages_v_blocks_hero_angled_image" USING btree ("supertitle_cta_page_id");
  CREATE INDEX "_pages_v_blocks_hero_angled_image_cta_cta_page_idx" ON "payload"."_pages_v_blocks_hero_angled_image" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_hero_angled_image_cta2_cta2_page_idx" ON "payload"."_pages_v_blocks_hero_angled_image" USING btree ("cta2_page_id");
  CREATE INDEX "_pages_v_blocks_hero_angled_image_image_idx" ON "payload"."_pages_v_blocks_hero_angled_image" USING btree ("image_id");
  CREATE INDEX "_feat_large_shot_v_features_order_idx" ON "payload"."_feat_large_shot_v_features" USING btree ("_order");
  CREATE INDEX "_feat_large_shot_v_features_parent_id_idx" ON "payload"."_feat_large_shot_v_features" USING btree ("_parent_id");
  CREATE INDEX "_feat_large_shot_v_order_idx" ON "payload"."_feat_large_shot_v" USING btree ("_order");
  CREATE INDEX "_feat_large_shot_v_parent_id_idx" ON "payload"."_feat_large_shot_v" USING btree ("_parent_id");
  CREATE INDEX "_feat_large_shot_v_path_idx" ON "payload"."_feat_large_shot_v" USING btree ("_path");
  CREATE INDEX "_feat_large_shot_v_image_idx" ON "payload"."_feat_large_shot_v" USING btree ("image_id");
  CREATE INDEX "_feat_large_shot_v_dark_image_idx" ON "payload"."_feat_large_shot_v" USING btree ("dark_image_id");
  CREATE INDEX "_feat_product_shot_v_features_order_idx" ON "payload"."_feat_product_shot_v_features" USING btree ("_order");
  CREATE INDEX "_feat_product_shot_v_features_parent_id_idx" ON "payload"."_feat_product_shot_v_features" USING btree ("_parent_id");
  CREATE INDEX "_feat_product_shot_v_order_idx" ON "payload"."_feat_product_shot_v" USING btree ("_order");
  CREATE INDEX "_feat_product_shot_v_parent_id_idx" ON "payload"."_feat_product_shot_v" USING btree ("_parent_id");
  CREATE INDEX "_feat_product_shot_v_path_idx" ON "payload"."_feat_product_shot_v" USING btree ("_path");
  CREATE INDEX "_feat_product_shot_v_image_idx" ON "payload"."_feat_product_shot_v" USING btree ("image_id");
  CREATE INDEX "_feat_product_shot_v_dark_image_idx" ON "payload"."_feat_product_shot_v" USING btree ("dark_image_id");
  CREATE INDEX "_pages_v_blocks_feature_bordered_screenshot_order_idx" ON "payload"."_pages_v_blocks_feature_bordered_screenshot" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_bordered_screenshot_parent_id_idx" ON "payload"."_pages_v_blocks_feature_bordered_screenshot" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_bordered_screenshot_path_idx" ON "payload"."_pages_v_blocks_feature_bordered_screenshot" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_bordered_screenshot_image_idx" ON "payload"."_pages_v_blocks_feature_bordered_screenshot" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_feature_bordered_screenshot_dark_image_idx" ON "payload"."_pages_v_blocks_feature_bordered_screenshot" USING btree ("dark_image_id");
  CREATE INDEX "_pages_v_blocks_feature_offset_list_features_order_idx" ON "payload"."_pages_v_blocks_feature_offset_list_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_offset_list_features_parent_id_idx" ON "payload"."_pages_v_blocks_feature_offset_list_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_offset_list_order_idx" ON "payload"."_pages_v_blocks_feature_offset_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_offset_list_parent_id_idx" ON "payload"."_pages_v_blocks_feature_offset_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_offset_list_path_idx" ON "payload"."_pages_v_blocks_feature_offset_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_simple_features_order_idx" ON "payload"."_pages_v_blocks_feature_simple_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_simple_features_parent_id_idx" ON "payload"."_pages_v_blocks_feature_simple_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_simple_order_idx" ON "payload"."_pages_v_blocks_feature_simple" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_simple_parent_id_idx" ON "payload"."_pages_v_blocks_feature_simple" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_simple_path_idx" ON "payload"."_pages_v_blocks_feature_simple" USING btree ("_path");
  CREATE INDEX "_feat_three_cols_v_features_order_idx" ON "payload"."_feat_three_cols_v_features" USING btree ("_order");
  CREATE INDEX "_feat_three_cols_v_features_parent_id_idx" ON "payload"."_feat_three_cols_v_features" USING btree ("_parent_id");
  CREATE INDEX "_feat_three_cols_v_order_idx" ON "payload"."_feat_three_cols_v" USING btree ("_order");
  CREATE INDEX "_feat_three_cols_v_parent_id_idx" ON "payload"."_feat_three_cols_v" USING btree ("_parent_id");
  CREATE INDEX "_feat_three_cols_v_path_idx" ON "payload"."_feat_three_cols_v" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_two_by_two_grid_features_order_idx" ON "payload"."_pages_v_blocks_feature_two_by_two_grid_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_two_by_two_grid_features_parent_id_idx" ON "payload"."_pages_v_blocks_feature_two_by_two_grid_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_two_by_two_grid_order_idx" ON "payload"."_pages_v_blocks_feature_two_by_two_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_two_by_two_grid_parent_id_idx" ON "payload"."_pages_v_blocks_feature_two_by_two_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_two_by_two_grid_path_idx" ON "payload"."_pages_v_blocks_feature_two_by_two_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_simple_branded_order_idx" ON "payload"."_pages_v_blocks_cta_simple_branded" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_simple_branded_parent_id_idx" ON "payload"."_pages_v_blocks_cta_simple_branded" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_simple_branded_path_idx" ON "payload"."_pages_v_blocks_cta_simple_branded" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_simple_branded_cta_cta_page_idx" ON "payload"."_pages_v_blocks_cta_simple_branded" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_cta_simple_branded_cta2_cta2_page_idx" ON "payload"."_pages_v_blocks_cta_simple_branded" USING btree ("cta2_page_id");
  CREATE INDEX "_pages_v_blocks_cta_simple_stacked_order_idx" ON "payload"."_pages_v_blocks_cta_simple_stacked" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_simple_stacked_parent_id_idx" ON "payload"."_pages_v_blocks_cta_simple_stacked" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_simple_stacked_path_idx" ON "payload"."_pages_v_blocks_cta_simple_stacked" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_simple_stacked_cta_cta_page_idx" ON "payload"."_pages_v_blocks_cta_simple_stacked" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_cta_simple_stacked_cta2_cta2_page_idx" ON "payload"."_pages_v_blocks_cta_simple_stacked" USING btree ("cta2_page_id");
  CREATE INDEX "_pages_v_blocks_cta_dark_panel_order_idx" ON "payload"."_pages_v_blocks_cta_dark_panel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_dark_panel_parent_id_idx" ON "payload"."_pages_v_blocks_cta_dark_panel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_dark_panel_path_idx" ON "payload"."_pages_v_blocks_cta_dark_panel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_dark_panel_cta_cta_page_idx" ON "payload"."_pages_v_blocks_cta_dark_panel" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_cta_dark_panel_cta2_cta2_page_idx" ON "payload"."_pages_v_blocks_cta_dark_panel" USING btree ("cta2_page_id");
  CREATE INDEX "_pages_v_blocks_header_centered_order_idx" ON "payload"."_pages_v_blocks_header_centered" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_header_centered_parent_id_idx" ON "payload"."_pages_v_blocks_header_centered" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_header_centered_path_idx" ON "payload"."_pages_v_blocks_header_centered" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_header_left_order_idx" ON "payload"."_pages_v_blocks_header_left" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_header_left_parent_id_idx" ON "payload"."_pages_v_blocks_header_left" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_header_left_path_idx" ON "payload"."_pages_v_blocks_header_left" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_timeline_items_order_idx" ON "payload"."_pages_v_blocks_timeline_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_timeline_items_parent_id_idx" ON "payload"."_pages_v_blocks_timeline_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "payload"."_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "payload"."_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "payload"."_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_faqs_order_idx" ON "payload"."_pages_v_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_faqs_parent_id_idx" ON "payload"."_pages_v_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "payload"."_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_order_idx" ON "payload"."_pages_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_parent_id_idx" ON "payload"."_pages_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_path_idx" ON "payload"."_pages_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_image_idx" ON "payload"."_pages_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "payload"."_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "payload"."_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "payload"."_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_content_product_shot_v_bullets_order_idx" ON "payload"."_content_product_shot_v_bullets" USING btree ("_order");
  CREATE INDEX "_content_product_shot_v_bullets_parent_id_idx" ON "payload"."_content_product_shot_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "_content_product_shot_v_order_idx" ON "payload"."_content_product_shot_v" USING btree ("_order");
  CREATE INDEX "_content_product_shot_v_parent_id_idx" ON "payload"."_content_product_shot_v" USING btree ("_parent_id");
  CREATE INDEX "_content_product_shot_v_path_idx" ON "payload"."_content_product_shot_v" USING btree ("_path");
  CREATE INDEX "_content_product_shot_v_image_idx" ON "payload"."_content_product_shot_v" USING btree ("image_id");
  CREATE INDEX "_content_product_shot_v_dark_image_idx" ON "payload"."_content_product_shot_v" USING btree ("dark_image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "payload"."_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "payload"."_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "payload"."_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_simple_grid_stats_order_idx" ON "payload"."_pages_v_blocks_stats_simple_grid_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_simple_grid_stats_parent_id_idx" ON "payload"."_pages_v_blocks_stats_simple_grid_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_simple_grid_order_idx" ON "payload"."_pages_v_blocks_stats_simple_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_simple_grid_parent_id_idx" ON "payload"."_pages_v_blocks_stats_simple_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_simple_grid_path_idx" ON "payload"."_pages_v_blocks_stats_simple_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "payload"."_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "payload"."_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "payload"."_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "payload"."_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "payload"."_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "payload"."_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "payload"."_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "payload"."_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "payload"."_pages_v" USING btree ("latest");
  CREATE INDEX "blog_blocks_blog_header_order_idx" ON "payload"."blog_blocks_blog_header" USING btree ("_order");
  CREATE INDEX "blog_blocks_blog_header_parent_id_idx" ON "payload"."blog_blocks_blog_header" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_blog_header_path_idx" ON "payload"."blog_blocks_blog_header" USING btree ("_path");
  CREATE INDEX "blog_blocks_blog_title_order_idx" ON "payload"."blog_blocks_blog_title" USING btree ("_order");
  CREATE INDEX "blog_blocks_blog_title_parent_id_idx" ON "payload"."blog_blocks_blog_title" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_blog_title_path_idx" ON "payload"."blog_blocks_blog_title" USING btree ("_path");
  CREATE INDEX "blog_blocks_blog_text_order_idx" ON "payload"."blog_blocks_blog_text" USING btree ("_order");
  CREATE INDEX "blog_blocks_blog_text_parent_id_idx" ON "payload"."blog_blocks_blog_text" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_blog_text_path_idx" ON "payload"."blog_blocks_blog_text" USING btree ("_path");
  CREATE INDEX "blog_blocks_blog_bullet_points_items_order_idx" ON "payload"."blog_blocks_blog_bullet_points_items" USING btree ("_order");
  CREATE INDEX "blog_blocks_blog_bullet_points_items_parent_id_idx" ON "payload"."blog_blocks_blog_bullet_points_items" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_blog_bullet_points_order_idx" ON "payload"."blog_blocks_blog_bullet_points" USING btree ("_order");
  CREATE INDEX "blog_blocks_blog_bullet_points_parent_id_idx" ON "payload"."blog_blocks_blog_bullet_points" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_blog_bullet_points_path_idx" ON "payload"."blog_blocks_blog_bullet_points" USING btree ("_path");
  CREATE INDEX "blog_blocks_blog_quote_order_idx" ON "payload"."blog_blocks_blog_quote" USING btree ("_order");
  CREATE INDEX "blog_blocks_blog_quote_parent_id_idx" ON "payload"."blog_blocks_blog_quote" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_blog_quote_path_idx" ON "payload"."blog_blocks_blog_quote" USING btree ("_path");
  CREATE INDEX "blog_blocks_blog_quote_author_image_idx" ON "payload"."blog_blocks_blog_quote" USING btree ("author_image_id");
  CREATE INDEX "blog_blocks_image_order_idx" ON "payload"."blog_blocks_image" USING btree ("_order");
  CREATE INDEX "blog_blocks_image_parent_id_idx" ON "payload"."blog_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_image_path_idx" ON "payload"."blog_blocks_image" USING btree ("_path");
  CREATE INDEX "blog_blocks_image_image_idx" ON "payload"."blog_blocks_image" USING btree ("image_id");
  CREATE INDEX "blog_blocks_video_order_idx" ON "payload"."blog_blocks_video" USING btree ("_order");
  CREATE INDEX "blog_blocks_video_parent_id_idx" ON "payload"."blog_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_video_path_idx" ON "payload"."blog_blocks_video" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_slug_idx" ON "payload"."blog" USING btree ("slug");
  CREATE INDEX "blog_cover_image_idx" ON "payload"."blog" USING btree ("cover_image_id");
  CREATE INDEX "blog_author_image_idx" ON "payload"."blog" USING btree ("author_image_id");
  CREATE INDEX "blog_meta_meta_image_idx" ON "payload"."blog" USING btree ("meta_image_id");
  CREATE INDEX "blog_updated_at_idx" ON "payload"."blog" USING btree ("updated_at");
  CREATE INDEX "blog_created_at_idx" ON "payload"."blog" USING btree ("created_at");
  CREATE INDEX "blog__status_idx" ON "payload"."blog" USING btree ("_status");
  CREATE INDEX "_blog_v_blocks_blog_header_order_idx" ON "payload"."_blog_v_blocks_blog_header" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_blog_header_parent_id_idx" ON "payload"."_blog_v_blocks_blog_header" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_blog_header_path_idx" ON "payload"."_blog_v_blocks_blog_header" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_blog_title_order_idx" ON "payload"."_blog_v_blocks_blog_title" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_blog_title_parent_id_idx" ON "payload"."_blog_v_blocks_blog_title" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_blog_title_path_idx" ON "payload"."_blog_v_blocks_blog_title" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_blog_text_order_idx" ON "payload"."_blog_v_blocks_blog_text" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_blog_text_parent_id_idx" ON "payload"."_blog_v_blocks_blog_text" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_blog_text_path_idx" ON "payload"."_blog_v_blocks_blog_text" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_blog_bullet_points_items_order_idx" ON "payload"."_blog_v_blocks_blog_bullet_points_items" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_blog_bullet_points_items_parent_id_idx" ON "payload"."_blog_v_blocks_blog_bullet_points_items" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_blog_bullet_points_order_idx" ON "payload"."_blog_v_blocks_blog_bullet_points" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_blog_bullet_points_parent_id_idx" ON "payload"."_blog_v_blocks_blog_bullet_points" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_blog_bullet_points_path_idx" ON "payload"."_blog_v_blocks_blog_bullet_points" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_blog_quote_order_idx" ON "payload"."_blog_v_blocks_blog_quote" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_blog_quote_parent_id_idx" ON "payload"."_blog_v_blocks_blog_quote" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_blog_quote_path_idx" ON "payload"."_blog_v_blocks_blog_quote" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_blog_quote_author_image_idx" ON "payload"."_blog_v_blocks_blog_quote" USING btree ("author_image_id");
  CREATE INDEX "_blog_v_blocks_image_order_idx" ON "payload"."_blog_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_image_parent_id_idx" ON "payload"."_blog_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_image_path_idx" ON "payload"."_blog_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_image_image_idx" ON "payload"."_blog_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_blog_v_blocks_video_order_idx" ON "payload"."_blog_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_video_parent_id_idx" ON "payload"."_blog_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_video_path_idx" ON "payload"."_blog_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_blog_v_parent_idx" ON "payload"."_blog_v" USING btree ("parent_id");
  CREATE INDEX "_blog_v_version_version_slug_idx" ON "payload"."_blog_v" USING btree ("version_slug");
  CREATE INDEX "_blog_v_version_version_cover_image_idx" ON "payload"."_blog_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_blog_v_version_version_author_image_idx" ON "payload"."_blog_v" USING btree ("version_author_image_id");
  CREATE INDEX "_blog_v_version_meta_version_meta_image_idx" ON "payload"."_blog_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_blog_v_version_version_updated_at_idx" ON "payload"."_blog_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_v_version_version_created_at_idx" ON "payload"."_blog_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_v_version_version__status_idx" ON "payload"."_blog_v" USING btree ("version__status");
  CREATE INDEX "_blog_v_created_at_idx" ON "payload"."_blog_v" USING btree ("created_at");
  CREATE INDEX "_blog_v_updated_at_idx" ON "payload"."_blog_v" USING btree ("updated_at");
  CREATE INDEX "_blog_v_latest_idx" ON "payload"."_blog_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_blog_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("blog_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "nav_items_order_idx" ON "payload"."nav_items" USING btree ("_order");
  CREATE INDEX "nav_items_parent_id_idx" ON "payload"."nav_items" USING btree ("_parent_id");
  CREATE INDEX "nav_items_page_idx" ON "payload"."nav_items" USING btree ("page_id");
  CREATE INDEX "nav_cta_cta_page_idx" ON "payload"."nav" USING btree ("cta_page_id");
  CREATE INDEX "footer_footer_sections_links_order_idx" ON "payload"."footer_footer_sections_links" USING btree ("_order");
  CREATE INDEX "footer_footer_sections_links_parent_id_idx" ON "payload"."footer_footer_sections_links" USING btree ("_parent_id");
  CREATE INDEX "footer_footer_sections_links_page_idx" ON "payload"."footer_footer_sections_links" USING btree ("page_id");
  CREATE INDEX "footer_footer_sections_order_idx" ON "payload"."footer_footer_sections" USING btree ("_order");
  CREATE INDEX "footer_footer_sections_parent_id_idx" ON "payload"."footer_footer_sections" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "payload"."footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "payload"."footer_social_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."users_sessions" CASCADE;
  DROP TABLE "payload"."users" CASCADE;
  DROP TABLE "payload"."media" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero_centered" CASCADE;
  DROP TABLE "payload"."pages_blocks_hero_angled_image" CASCADE;
  DROP TABLE "payload"."feat_large_shot_features" CASCADE;
  DROP TABLE "payload"."feat_large_shot" CASCADE;
  DROP TABLE "payload"."feat_product_shot_features" CASCADE;
  DROP TABLE "payload"."feat_product_shot" CASCADE;
  DROP TABLE "payload"."pages_blocks_feature_bordered_screenshot" CASCADE;
  DROP TABLE "payload"."pages_blocks_feature_offset_list_features" CASCADE;
  DROP TABLE "payload"."pages_blocks_feature_offset_list" CASCADE;
  DROP TABLE "payload"."pages_blocks_feature_simple_features" CASCADE;
  DROP TABLE "payload"."pages_blocks_feature_simple" CASCADE;
  DROP TABLE "payload"."feat_three_cols_features" CASCADE;
  DROP TABLE "payload"."feat_three_cols" CASCADE;
  DROP TABLE "payload"."pages_blocks_feature_two_by_two_grid_features" CASCADE;
  DROP TABLE "payload"."pages_blocks_feature_two_by_two_grid" CASCADE;
  DROP TABLE "payload"."pages_blocks_cta_simple_branded" CASCADE;
  DROP TABLE "payload"."pages_blocks_cta_simple_stacked" CASCADE;
  DROP TABLE "payload"."pages_blocks_cta_dark_panel" CASCADE;
  DROP TABLE "payload"."pages_blocks_header_centered" CASCADE;
  DROP TABLE "payload"."pages_blocks_header_left" CASCADE;
  DROP TABLE "payload"."pages_blocks_timeline_timeline_items" CASCADE;
  DROP TABLE "payload"."pages_blocks_timeline" CASCADE;
  DROP TABLE "payload"."pages_blocks_faq_faqs" CASCADE;
  DROP TABLE "payload"."pages_blocks_faq" CASCADE;
  DROP TABLE "payload"."pages_blocks_image" CASCADE;
  DROP TABLE "payload"."pages_blocks_video" CASCADE;
  DROP TABLE "payload"."content_product_shot_bullets" CASCADE;
  DROP TABLE "payload"."content_product_shot" CASCADE;
  DROP TABLE "payload"."pages_blocks_rich_text" CASCADE;
  DROP TABLE "payload"."pages_blocks_stats_simple_grid_stats" CASCADE;
  DROP TABLE "payload"."pages_blocks_stats_simple_grid" CASCADE;
  DROP TABLE "payload"."pages" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_centered" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_hero_angled_image" CASCADE;
  DROP TABLE "payload"."_feat_large_shot_v_features" CASCADE;
  DROP TABLE "payload"."_feat_large_shot_v" CASCADE;
  DROP TABLE "payload"."_feat_product_shot_v_features" CASCADE;
  DROP TABLE "payload"."_feat_product_shot_v" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_feature_bordered_screenshot" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_feature_offset_list_features" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_feature_offset_list" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_feature_simple_features" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_feature_simple" CASCADE;
  DROP TABLE "payload"."_feat_three_cols_v_features" CASCADE;
  DROP TABLE "payload"."_feat_three_cols_v" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_feature_two_by_two_grid_features" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_feature_two_by_two_grid" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_cta_simple_branded" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_cta_simple_stacked" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_cta_dark_panel" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_header_centered" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_header_left" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_timeline_timeline_items" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_faq_faqs" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_faq" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_image" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_video" CASCADE;
  DROP TABLE "payload"."_content_product_shot_v_bullets" CASCADE;
  DROP TABLE "payload"."_content_product_shot_v" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_stats_simple_grid_stats" CASCADE;
  DROP TABLE "payload"."_pages_v_blocks_stats_simple_grid" CASCADE;
  DROP TABLE "payload"."_pages_v" CASCADE;
  DROP TABLE "payload"."blog_blocks_blog_header" CASCADE;
  DROP TABLE "payload"."blog_blocks_blog_title" CASCADE;
  DROP TABLE "payload"."blog_blocks_blog_text" CASCADE;
  DROP TABLE "payload"."blog_blocks_blog_bullet_points_items" CASCADE;
  DROP TABLE "payload"."blog_blocks_blog_bullet_points" CASCADE;
  DROP TABLE "payload"."blog_blocks_blog_quote" CASCADE;
  DROP TABLE "payload"."blog_blocks_image" CASCADE;
  DROP TABLE "payload"."blog_blocks_video" CASCADE;
  DROP TABLE "payload"."blog" CASCADE;
  DROP TABLE "payload"."_blog_v_blocks_blog_header" CASCADE;
  DROP TABLE "payload"."_blog_v_blocks_blog_title" CASCADE;
  DROP TABLE "payload"."_blog_v_blocks_blog_text" CASCADE;
  DROP TABLE "payload"."_blog_v_blocks_blog_bullet_points_items" CASCADE;
  DROP TABLE "payload"."_blog_v_blocks_blog_bullet_points" CASCADE;
  DROP TABLE "payload"."_blog_v_blocks_blog_quote" CASCADE;
  DROP TABLE "payload"."_blog_v_blocks_image" CASCADE;
  DROP TABLE "payload"."_blog_v_blocks_video" CASCADE;
  DROP TABLE "payload"."_blog_v" CASCADE;
  DROP TABLE "payload"."payload_kv" CASCADE;
  DROP TABLE "payload"."payload_locked_documents" CASCADE;
  DROP TABLE "payload"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload"."payload_preferences" CASCADE;
  DROP TABLE "payload"."payload_preferences_rels" CASCADE;
  DROP TABLE "payload"."payload_migrations" CASCADE;
  DROP TABLE "payload"."nav_items" CASCADE;
  DROP TABLE "payload"."nav" CASCADE;
  DROP TABLE "payload"."footer_footer_sections_links" CASCADE;
  DROP TABLE "payload"."footer_footer_sections" CASCADE;
  DROP TABLE "payload"."footer_social_links" CASCADE;
  DROP TABLE "payload"."footer" CASCADE;
  DROP TYPE "payload"."enum_users_role";
  DROP TYPE "payload"."enum_pages_blocks_hero_centered_supertitle_cta_link_type";
  DROP TYPE "payload"."enum_pages_blocks_hero_centered_cta_link_type";
  DROP TYPE "payload"."enum_pages_blocks_hero_centered_cta2_link_type";
  DROP TYPE "payload"."enum_pages_blocks_hero_angled_image_supertitle_cta_link_type";
  DROP TYPE "payload"."enum_pages_blocks_hero_angled_image_cta_link_type";
  DROP TYPE "payload"."enum_pages_blocks_hero_angled_image_cta2_link_type";
  DROP TYPE "payload"."enum_pages_blocks_cta_simple_branded_cta_link_type";
  DROP TYPE "payload"."enum_pages_blocks_cta_simple_branded_cta2_link_type";
  DROP TYPE "payload"."enum_pages_blocks_cta_simple_stacked_cta_link_type";
  DROP TYPE "payload"."enum_pages_blocks_cta_simple_stacked_cta2_link_type";
  DROP TYPE "payload"."enum_pages_blocks_cta_dark_panel_cta_link_type";
  DROP TYPE "payload"."enum_pages_blocks_cta_dark_panel_cta2_link_type";
  DROP TYPE "payload"."enum_pages_blocks_image_alignment";
  DROP TYPE "payload"."enum_pages_blocks_image_fit";
  DROP TYPE "payload"."enum_pages_blocks_video_alignment";
  DROP TYPE "payload"."enum_pages_blocks_video_title_heading_level";
  DROP TYPE "payload"."enum_pages_blocks_video_title_alignment";
  DROP TYPE "payload"."enum_pages_blocks_video_description_alignment";
  DROP TYPE "payload"."enum_pages_status";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_centered_supertitle_cta_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_centered_cta_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_centered_cta2_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_angled_image_supertitle_cta_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_angled_image_cta_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_hero_angled_image_cta2_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_cta_simple_branded_cta_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_cta_simple_branded_cta2_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_cta_simple_stacked_cta_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_cta_simple_stacked_cta2_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_cta_dark_panel_cta_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_cta_dark_panel_cta2_link_type";
  DROP TYPE "payload"."enum__pages_v_blocks_image_alignment";
  DROP TYPE "payload"."enum__pages_v_blocks_image_fit";
  DROP TYPE "payload"."enum__pages_v_blocks_video_alignment";
  DROP TYPE "payload"."enum__pages_v_blocks_video_title_heading_level";
  DROP TYPE "payload"."enum__pages_v_blocks_video_title_alignment";
  DROP TYPE "payload"."enum__pages_v_blocks_video_description_alignment";
  DROP TYPE "payload"."enum__pages_v_version_status";
  DROP TYPE "payload"."enum_blog_blocks_blog_title_level";
  DROP TYPE "payload"."enum_blog_blocks_image_alignment";
  DROP TYPE "payload"."enum_blog_blocks_image_fit";
  DROP TYPE "payload"."enum_blog_blocks_video_alignment";
  DROP TYPE "payload"."enum_blog_blocks_video_title_heading_level";
  DROP TYPE "payload"."enum_blog_blocks_video_title_alignment";
  DROP TYPE "payload"."enum_blog_blocks_video_description_alignment";
  DROP TYPE "payload"."enum_blog_status";
  DROP TYPE "payload"."enum__blog_v_blocks_blog_title_level";
  DROP TYPE "payload"."enum__blog_v_blocks_image_alignment";
  DROP TYPE "payload"."enum__blog_v_blocks_image_fit";
  DROP TYPE "payload"."enum__blog_v_blocks_video_alignment";
  DROP TYPE "payload"."enum__blog_v_blocks_video_title_heading_level";
  DROP TYPE "payload"."enum__blog_v_blocks_video_title_alignment";
  DROP TYPE "payload"."enum__blog_v_blocks_video_description_alignment";
  DROP TYPE "payload"."enum__blog_v_version_status";
  DROP TYPE "payload"."enum_nav_items_link_type";
  DROP TYPE "payload"."enum_nav_cta_link_type";
  DROP TYPE "payload"."enum_footer_footer_sections_links_link_type";
  DROP TYPE "payload"."enum_footer_social_links_platform";`)
}
