import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  onClick: () => void;
  icon: IconDefinition;
}

export const IconButton = (props: Props) => {
  return (
    <>
      <button onClick={props.onClick} className="w-6">
        <FontAwesomeIcon icon={props.icon} />
      </button>
    </>
  )
}