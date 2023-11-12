export interface IModal {
    show: boolean;
    onClose: () => void;
    onAction: () => void;
}
