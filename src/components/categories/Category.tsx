import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categoryList } from "@/constants/categoryList";
import {
  headingStyle,
  scrollAreaStyle,
  wrapperStyle,
  figureStyle,
  imageContainerStyle,
  imageStyle,
  captionStyle,
  categoryTextStyle,
} from "@/styles/categoryStyles";

export const Category = () => {
  return (
    <>
      <h3 className={headingStyle}>Catalog</h3>
      <ScrollArea className={scrollAreaStyle}>
        <div className={wrapperStyle}>
          {categoryList.map((item) => (
            <figure key={item.category} className={figureStyle}>
              <div className={imageContainerStyle}>
                <img
                  src={item.image}
                  alt={item.category}
                  className={imageStyle}
                  width={300}
                  height={400}
                />
              </div>
              <figcaption className={captionStyle}>
                <span className={categoryTextStyle}>{item.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};
