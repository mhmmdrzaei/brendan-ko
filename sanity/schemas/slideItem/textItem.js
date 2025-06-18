import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "textItem",
  type: "object",
  title: "Text",
  icon: TextQuote,
  fields: [
    defineField({
        title: 'Space between item and next item',
        name: 'spaceBetwen',
        type: 'string',
        options: {
            list: [
                { title: 'Small', value: 'small' },
                { title: 'Medium', value: 'medium' },
                { title: 'Large', value: 'large' },
            ],
        },
        initialValue: 'medium' 
    }),
      defineField({
        name: "slideText",
        title: "Accompanying text",
        type: 'array', 
        of: [{type: 'block'}]
      }),
  ],
    preview: {
  prepare({ }) {
    return {
      title: 'Text',
    };
  },
}
});
