import { cn } from "@/lib/utils";
type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

const ContentBlock = ({ children, className }: ContentBlockProps) => {
  return (
    <div
      className={cn(
        "size-full overflow-hidden rounded-md bg-[#f7f8fa] shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContentBlock;
