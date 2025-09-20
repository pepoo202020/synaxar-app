import { cn } from "@/lib/utils";
import { ITab } from "./PageContent";

interface IPageTabsProps {
  tabs: ITab[];
  tabIndex: number;
  onTabClick: (tabIndex: number) => void;
}

const PageTabs = ({ tabs, tabIndex, onTabClick }: IPageTabsProps) => {
  return (
    <div className="w-full bg-blue-900/70 h-16 flex items-center rounded-4xl overflow-hidden">
      <div className="grid grid-cols-3 overflow-y-hidden overflow-x-auto w-full h-full">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "flex items-center justify-center cursor-pointer w-full h-full hover:bg-yellow-600 transition-all duration-700",
              tab.id === tabIndex + 1 && "bg-yellow-600 cursor-auto"
            )}
            onClick={() => onTabClick(tabIndex - 1)}
          >
            {tab.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageTabs;
