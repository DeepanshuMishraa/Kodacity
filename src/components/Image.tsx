import Image from "next/image";
import { BorderBeam } from "./ui/border-beam";

const ImageLayer = () => {
  return (
    <div className="motion-preset-float mt-10">
      <div className="relative rounded-xl">
        <Image
          alt="Hero image"
          objectFit={"fit"}
          src="https://utfs.io/f/a1wYTWuoYzdPbihlOsURNCelygfESPxv5hnjDAQbqUJp78w2"
          width={900}
          className="rounded-xl"
          height={900}
        />
        <BorderBeam borderWidth={3} size={350} />
      </div>
    </div>
  );
};

export default ImageLayer;
