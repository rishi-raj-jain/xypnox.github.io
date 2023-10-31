import { getCollection } from "astro:content";

const blogEntriesAll = await getCollection("blog");

/** Filtered Blog entries that are root, and are not hidden */
const blogEntriesFiltered = blogEntriesAll
  .filter(b => b.data.hidden !== true);
  // .filter((b) => b.slug.split("/").length === 1);

/** Blog entries which are filtered by hidden and sorted by time (latest first) */
const blogEntries = blogEntriesFiltered
  .sort((a, b) => {
    const [aDateNum, bDateNum] = [a.data.date.getTime(), b.data.date.getTime()];
    return bDateNum - aDateNum;
  })

/** All the tags used in the blog posts */
const allTags: string[] = [...(new Set(blogEntriesAll
  .map((blogPostEntry) => blogPostEntry.data.tags)
  .flat()
  .filter((tag) => tag !== undefined) as string[]))];

/** The latest blog entry */
const latestBlog = blogEntries.length > 3 ? blogEntries.slice(0, 3) : [];

const tagCounts: Record<string, number> = allTags.reduce((p, t) => {
  const tagCount = blogEntriesAll.reduce((c, e) => {
    if (e.data.tags) return e.data.tags.includes(t) ? c + 1 : c
    else return c
  }, 0)
  return {
    ...p,
    [t]: tagCount
  }
}, {})

const sortedTags = allTags.sort((a, b) => tagCounts[b] - tagCounts[a])

const topFiveTags = sortedTags.slice(0, 5)

console.log(
  {
    blogEntriesAll,
    blogEntriesFiltered,
    blogEntries,
    allTags,
    latestBlog,
    tagCounts,
    topFiveTags,
    sortedTags
  }
)

const staticPaths = blogEntries
  .reduce((acc, blogPostEntry) => {
    const tags = blogPostEntry.data.tags || [];
    tags.forEach((tag: string) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, [] as string[])
  .map((tag: string) => ({
    params: { slug: tag },
    props: { tag },
  }));

const filteredByTag = (tag: string) => blogEntriesFiltered.filter(e => e.data.tags && e.data.tags.includes(tag))

export {
  blogEntriesAll,
  blogEntriesFiltered,
  blogEntries,
  allTags,
  latestBlog,
  tagCounts,
  topFiveTags,
  sortedTags,
  staticPaths,
  filteredByTag
}
