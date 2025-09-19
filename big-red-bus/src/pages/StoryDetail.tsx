import { useParams } from "react-router-dom";
import { stories } from "@/lib/data/stories";

export default function StoryDetail() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === Number(id));

  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <img src={story.imageUrl} alt="" className="w-full h-96 object-cover rounded-lg mb-8" />
      <h1 className="text-4xl font-heading font-bold mb-4">{story.name}'s Story</h1>
      <p className="text-xl italic text-warm-gray mb-8">"{story.quote}"</p>
      <div className="prose lg:prose-xl">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>
    </div>
  );
}
