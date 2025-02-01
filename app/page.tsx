import Hero from "./components/hero"
import Experiments from "./components/experiments"
import Team from "./components/team"
import NewsPreview from "./components/news-preview"
import SciencePostsPreview from "./components/science-posts-preview"

export default function Home() {
  return (
    <>
      <Hero />
      <NewsPreview />
      <Experiments />
      <SciencePostsPreview />
      <Team />
    </>
  )
}

