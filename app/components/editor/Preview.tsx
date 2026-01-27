import ButtonOne from "../ui/ButtonOne";

interface PreviewProps {
    label: string;
    color: string;
    href: string;
    textColor: string;
}

export default function Preview(props: PreviewProps) {
    return (
        <div className="flex items-center justify-center h-full">
            <ButtonOne {...props} />
        </div>
    );
}
