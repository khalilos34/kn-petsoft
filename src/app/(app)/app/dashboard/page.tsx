import ContentBlock from "@/components/ContentBlock";
import CurrentGuests from "@/components/CurrentGuests";
import PetButton from "@/components/PetButton";
import PetDetails from "@/components/PetDetails";
import PetList from "@/components/PetList";
import SearchForm from "@/components/SearchForm";

const DashboardPage = async () => {
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
      <div className="grid grid-rows-[45px_300px_500px] gap-4 md:h-[600px] md:grid-cols-3 md:grid-rows-[45px_1fr]">
        <div className="md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1">
          <SearchForm />
        </div>
        <div className="relative md:col-span-1 md:col-start-1  md:row-start-2">
          <ContentBlock>
            <PetList />
            <div className="absolute bottom-4 right-4">
              <PetButton actionType="add" />
            </div>
          </ContentBlock>
        </div>
        <div className="md:col-span-2 md:col-start-2 md:row-span-full md:row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
