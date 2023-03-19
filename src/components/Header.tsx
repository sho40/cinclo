import {
  faBars,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import {
  faHeart
} from "@fortawesome/free-regular-svg-icons"
import { IconButton } from '@/utils/IconButton';

export const Header = () => {
  return (
    <div className='flex justify-between px-3 py-2 relative'>
      <div>
        <IconButton onClick={() => {console.log("clicked")}} icon={faBars}/>
      </div>
      {/* tailwindで実現できなかったため直でCSS指定 */}
      <div style={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}>
        CINCLO
      </div>
      <div className='flex'>
        <div className='pr-2'>
          <IconButton onClick={() => {console.log("clicked")}} icon={faHeart}/>
        </div>
        <div>
          <IconButton onClick={() => {console.log("clicked")}} icon={faCartShopping}/>
        </div>
      </div>
    </div>
  )
}