import { HeroSimpleCenteredBlock } from './hero/HeroSimpleCenteredBlock'
import { HeroWithAngledImageOnRightBlock } from './hero/HeroWithAngledImageOnRight'
import { FeatureWithLargeScreenshotBlock } from './feature/FeatureWithLargeScreenshotBlock'
import { FeatureWithProductScreenshotBlock } from './feature/FeatureWithProductScreenshot'
import { FeatureWithLargeBorderedScreenshotBlock } from './feature/FeatureWithLargeBorderedScreenshot'
import { FeatureWithOffsetListBlock } from './feature/FeatureWithOffsetList'
import { FeatureSimpleBlock } from './feature/FeatureSimple'
import { FeatureThreeColumnsIconsBlock } from './feature/FeatureThreeColumnsIcons'
import { FeatureTwoByTwoGridBlock } from './feature/FeatureTwoByTwoGrid'
import { CtaSimpleCenteredBrandedBlock } from './cta/CtaSimpleCenteredBranded'
import { CtaSimpleStackedBlock } from './cta/CtaSimpleStacked'
import { CtaCenteredDarkPanelBlock } from './cta/CtaCenteredDarkPanel'
import { HeaderCenteredBlock } from './header/HeaderCentered'
import { HeaderLeftBlock } from './header/HeaderLeft'
import { TimelineBlock } from './stats/Timeline'
import { FaqBlock } from './faq/Faq'
import { BlogHeaderBlock } from './blog/BlogHeader'
import { BlogTitleBlock } from './blog/BlogTitle'
import { BlogTextBlock } from './blog/BlogText'
import { BlogBulletPointsBlock } from './blog/BlogBulletPoints'
import { BlogQuoteBlock } from './blog/BlogQuote'
import { ImageBlock } from './media/Image'
import { VideoBlock } from './media/Video'
import { ContentWithProductScreenshotBlock } from './content/ContentWithProductScreenshot'
import { RichTextBlock } from './content/RichText'
import { StatsSimpleGridBlock } from './stats/StatsSimpleGrid'

export const PAGE_BLOCKS = [
  HeroSimpleCenteredBlock,
  HeroWithAngledImageOnRightBlock,
  FeatureWithLargeScreenshotBlock,
  FeatureWithProductScreenshotBlock,
  FeatureWithLargeBorderedScreenshotBlock,
  FeatureWithOffsetListBlock,
  FeatureSimpleBlock,
  FeatureThreeColumnsIconsBlock,
  FeatureTwoByTwoGridBlock,
  CtaSimpleCenteredBrandedBlock,
  CtaSimpleStackedBlock,
  CtaCenteredDarkPanelBlock,
  HeaderCenteredBlock,
  HeaderLeftBlock,
  TimelineBlock,
  FaqBlock,
  ImageBlock,
  VideoBlock,
  ContentWithProductScreenshotBlock,
  RichTextBlock,
  StatsSimpleGridBlock,
]

export const BLOG_BLOCKS = [
  BlogHeaderBlock,
  BlogTitleBlock,
  BlogTextBlock,
  BlogBulletPointsBlock,
  BlogQuoteBlock,
  ImageBlock,
  VideoBlock,
]

export const BLOCKS = [...PAGE_BLOCKS, ...BLOG_BLOCKS]
