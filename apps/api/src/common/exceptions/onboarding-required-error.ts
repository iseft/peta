export class OnboardingRequiredError extends Error {
  constructor() {
    super('Complete onboarding first');
    this.name = 'OnboardingRequiredError';
  }
}
