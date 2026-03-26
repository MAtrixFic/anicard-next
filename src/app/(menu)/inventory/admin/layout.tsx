import CardsChoise from "@/components/additionals/cardsList/CardsChoise";

export default function Layout({ children, }:
    Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <CardsChoise>
            {children}
        </CardsChoise>
    );
}
