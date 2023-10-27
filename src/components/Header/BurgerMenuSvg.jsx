import css from './Header.module.css';


export const BurgerMenuSvg = () => {
    return (
        <svg className={css.burgerSvg} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="align-justify">
                <path id="Vector" d="M28 13.3335H4" stroke="#161F37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_2" d="M28 8H4" stroke="#161F37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_3" d="M28 18.6665H4" stroke="#161F37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_4" d="M28 24H4" stroke="#161F37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        </svg>
    );
  }
  export default BurgerMenuSvg;