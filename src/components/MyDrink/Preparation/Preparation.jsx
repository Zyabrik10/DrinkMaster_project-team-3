import globalCss from '../../../css/global.module.css';
import css from './Preparation.module.css';
import recipes from '../../../pages/my-drinks/recipes.json';

export const Preparation = () => {
  let recipe = recipes[4];

  console.log('recipes', recipe);

  return (
    <div className={`${css['preparation-section']}`}>
      <h2
        className={`${globalCss['global-title']} ${css['preparation-title']}`}
      >
        Recipe Preparation
      </h2>
      <div className={`${css['preparation-body']}`}>
        <div className={`${css['description-section']}`}>
          <p
            className={`${globalCss['global-p']} ${css['preparation-description']}`}
          >
            {recipe.instructions}
          </p>
          <p
            className={`${globalCss['global-p']} ${css['preparation-description']}`}
          >
            {recipe.instructionsDE}
          </p>
          <p
            className={`${globalCss['global-p']} ${css['preparation-description']}`}
          >
            {recipe.instructionsES}
          </p>
        </div>
        <div className={`img-preparation-section`}>
          <img
            className={`${css['img-preparation']} `}
            src={recipe.drinkThumb}
            alt="drink"
          />
        </div>
      </div>
    </div>
  );
};
