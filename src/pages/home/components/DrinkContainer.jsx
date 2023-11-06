import DrinkGroup from './DrinkGroup';
import css from '../Home.module.css';
import ResizeHook from './ResizeHook';
import { useEffect, useState } from 'react';
import globalcss from '../../../css/global.module.css';
import { useGetMainPageCocktailsQuery } from '../../../redux/api/popularDrinksAPI';
import { useSelector } from 'react-redux';
import { getThemeColor } from 'redux/theme/selectors';
import { Link } from 'react-router-dom';

export const DrinkContainer = () => {
  const theme = useSelector(getThemeColor);
  const themeClass = theme === 'dark' ? 'main' : 'main light';

  const [amount, setAmount] = useState(1);
  let width = ResizeHook();
  const { data, isLoading } = useGetMainPageCocktailsQuery();

  useEffect(() => {
    if (width >= 1440) {
      setAmount(3);
    } else if (width >= 768) {
      setAmount(2);
    } else {
      setAmount(1);
    }
  }, [width]);

  return (
    <>
      <div className={`${css['drinkGroup']} ${themeClass}`}>
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          Object.entries(data).map(([group, cocktails]) => (
            <DrinkGroup
              group={group}
              cocktails={cocktails.slice(0, amount)}
              key={group}
            />
          ))
        )}
      </div>
      <div className={css.btnContainer}>
        <div className={css.other}>
          <Link className={`${globalcss['custom-button']} ${css['button']}`} to="/drinks">
            Other Drinks
          </Link>
        </div>
      </div>
    </>
  );
};
