import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { categoryList } from "@/constants/categoryList"

export const Category=()=>{
  return (
    <>
    <h3 className="text-xl text-center font-bold">Catalog</h3>
    <ScrollArea className="w-lg rounded-md border mx-auto mt-5 whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {categoryList.map((item) => (
          <figure key={item.category} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={item.image}
                alt={item.category}
                className="aspect-[3/4] h-25 w-35 object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="text-muted-foreground pt-2 text-xs text-center">
              <span className="text-foreground font-semibold">
                {item.category}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    </>
  )
}
