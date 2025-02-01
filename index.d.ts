declare module '@er-npm/scraper' {
  interface Video {
    judul: string;
    link: string;
    link_dl: string;
    value: string;
    likes: string;
    views: string;
    from: string;
  }

  /**
   *
   * @param query Video name
   */
  export function dl(query: string): Promise<Video | undefined>;
}
