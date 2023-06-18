import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type IconButtonProps = {
  onClick: () => void;
  icon: IconDefinition;
}

export const IconButton = (props: IconButtonProps) => {
  return (
    <>
      <button onClick={props.onClick} className="w-6">
        <FontAwesomeIcon icon={props.icon} />
      </button>
    </>
  )
}

type IconLinkProps = {
  link: string;
  icon: IconDefinition;
}

export const IconLink = (props: IconLinkProps) => {
  return (
    <>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={props.icon} />
      </a>
    </>
  )
}
