import CurrentGuests from "@/components/CurrentGuests";
import PetDetails from "@/components/PetDetails";
import PetList from "@/components/PetList";
import SearchForm from "@/components/SearchForm";
import ContentBlock from "@/components/contentBlock";

const DashboardPage = () => {
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <section>
          <h1 className="text-2xl font-medium leading-6">
            pet<span className="font-semibold">soft</span>
          </h1>
          <p className="text-lg opacity-80">mange your pet daycare with ease</p>
        </section>
        <CurrentGuests />
      </div>
      <div className="grid h-[600px] grid-cols-3 grid-rows-[45px_1fr] gap-4">
        <div className="col-span-1 col-start-1 row-span-1 row-start-1">
          <SearchForm />
        </div>
        <div className="col-span-1 col-start-1 row-start-2">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>
        <div className="col-span-2 col-start-2 row-span-full row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
