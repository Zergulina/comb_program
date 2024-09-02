import Status from "../../../../UI/Status/Status";

const IsFinalStatus = ({isFinal, className}) => {
    return (
        <Status className={className}>{isFinal ? "Элемент" : "Слой"}</Status>
    );
};

export default IsFinalStatus;