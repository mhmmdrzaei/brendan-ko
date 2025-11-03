import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity";

const builder = imageUrlBuilder(client);
export const urlFor = (source) =>
  builder.image(source).auto("format").fit("max").quality(70);