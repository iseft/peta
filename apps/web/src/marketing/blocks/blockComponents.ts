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
import HeroSimpleCenteredComponent from '../components/hero/HeroSimpleCenteredComponent'

import HeroWithAngledImageOnRightComponent from '../components/hero/HeroWithAngledImageOnRightComponent'
import FeatureWithLargeScreenshotComponent from '../components/feature/FeatureWithLargeScreenshotComponent'
import FeatureWithProductScreenshotComponent from '../components/feature/FeatureWithProductScreenshotComponent'
import FeatureWithLargeBorderedScreenshotComponent from '../components/feature/FeatureWithLargeBorderedScreenshot'
import FeatureWithOffsetListComponent from '../components/feature/FeatureWithOffsetList'
import FeatureSimpleComponent from '../components/feature/FeatureSimple'
import FeatureThreeColumnsIconsComponent from '../components/feature/FeatureThreeColumnsIcons'
import FeatureTwoByTwoGridComponent from '../components/feature/FeatureTwoByTwoGrid'
import CtaSimpleCenteredBrandedComponent from '../components/cta/CtaSimpleCenteredBranded'
import CtaSimpleStackedComponent from '../components/cta/CtaSimpleStackedComponent'
import CtaCenteredDarkPanelComponent from '../components/cta/CtaCenteredDarkPanelComponent'
import HeaderCenteredComponent from '../components/header/HeaderCentered'
import HeaderLeftComponent from '../components/header/HeaderLeft'
import TimelineComponent from '../components/stats/TimelineComponent'
import FaqComponent from '../components/faq/FaqComponent'
import BlogHeaderComponent from '../components/blog/BlogHeaderComponent'
import BlogTitleComponent from '../components/blog/BlogTitleComponent'
import BlogTextComponent from '../components/blog/BlogTextComponent'
import BlogBulletPointsComponent from '../components/blog/BlogBulletPointsComponent'
import BlogQuoteComponent from '../components/blog/BlogQuoteComponent'
import ImageComponent from '../components/media/ImageComponent'
import VideoComponent from '../components/media/VideoComponent'
import ContentWithProductScreenshotComponent from '../components/content/ContentWithProductScreenshotComponent'
import RichTextComponent from '../components/content/RichTextComponent'
import { StatsSimpleGridBlock } from './stats/StatsSimpleGrid'
import StatsSimpleGridComponent from '../components/stats/StatsSimpleGridComponent'

export const blockComponents = {
  [HeroSimpleCenteredBlock.slug]: HeroSimpleCenteredComponent,
  [HeroWithAngledImageOnRightBlock.slug]: HeroWithAngledImageOnRightComponent,
  [FeatureWithLargeScreenshotBlock.slug]: FeatureWithLargeScreenshotComponent,
  [FeatureWithProductScreenshotBlock.slug]: FeatureWithProductScreenshotComponent,
  [FeatureWithLargeBorderedScreenshotBlock.slug]: FeatureWithLargeBorderedScreenshotComponent,
  [FeatureWithOffsetListBlock.slug]: FeatureWithOffsetListComponent,
  [FeatureSimpleBlock.slug]: FeatureSimpleComponent,
  [FeatureThreeColumnsIconsBlock.slug]: FeatureThreeColumnsIconsComponent,
  [FeatureTwoByTwoGridBlock.slug]: FeatureTwoByTwoGridComponent,
  [CtaSimpleCenteredBrandedBlock.slug]: CtaSimpleCenteredBrandedComponent,
  [CtaSimpleStackedBlock.slug]: CtaSimpleStackedComponent,
  [CtaCenteredDarkPanelBlock.slug]: CtaCenteredDarkPanelComponent,
  [HeaderCenteredBlock.slug]: HeaderCenteredComponent,
  [HeaderLeftBlock.slug]: HeaderLeftComponent,
  [TimelineBlock.slug]: TimelineComponent,
  [FaqBlock.slug]: FaqComponent,
  [BlogHeaderBlock.slug]: BlogHeaderComponent,
  [BlogTitleBlock.slug]: BlogTitleComponent,
  [BlogTextBlock.slug]: BlogTextComponent,
  [BlogBulletPointsBlock.slug]: BlogBulletPointsComponent,
  [BlogQuoteBlock.slug]: BlogQuoteComponent,
  [ImageBlock.slug]: ImageComponent,
  [VideoBlock.slug]: VideoComponent,
  [ContentWithProductScreenshotBlock.slug]: ContentWithProductScreenshotComponent,
  [RichTextBlock.slug]: RichTextComponent,
  [StatsSimpleGridBlock.slug]: StatsSimpleGridComponent,
}
