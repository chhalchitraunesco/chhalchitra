import ComickLoader from "@/components/comicLoader";
import Subtitles from "@/components/subtitles";

export default function Story() {
  return (
    <div className=" bg-white overflow-y-hidden">
      {/* Start Page for Starting the Game */}
      <ComickLoader />
      <Subtitles subtitle="In the quiet of the night, the town begins to stir"/>
    </div>
  );
}
