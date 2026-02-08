/**
 * Banner Type
 *
 * Represents the type of banner to display.
 */
export type BannerType = 'INFO' | 'WARNING' | 'DANGER'

/**
 * Banner Domain Model
 *
 * Represents a site-wide banner alert.
 */
export interface Banner {
  /** Timestamp when the banner was created */
  created_at: string
  /** Duration in seconds. 0 means permanent (until manually deleted). */
  duration: number
  /** Subtitle or description of the banner */
  subtitle: string
  /** Title of the banner */
  title: string
  /** Type of the banner (determines color/icon) */
  type: BannerType
}
