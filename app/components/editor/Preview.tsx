import ButtonOne, { ButtonProps } from "../ui/ButtonOne";

// interface PreviewProps {
//     label: string;
//     color: string;
//     href: string;
//     textColor: string;
// }

type PreviewProps = ButtonProps; // langsung gunakan ButtonProps dari ButtonOne


export default function Preview(props: PreviewProps) {
    return (
        <div className="flex items-center justify-center h-full">
            <ButtonOne {...props} />
        </div>
    );
}
