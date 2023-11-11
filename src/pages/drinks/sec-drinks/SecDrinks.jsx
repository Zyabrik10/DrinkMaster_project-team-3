import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import DrinkList from 'components/DrinksList/DrinksList';
import { Title } from 'components/Title/Title';
import Filter from 'components/DrinksList/Filter';
import filtersSelectStyles from 'components/DrinksList/styles/filtersSelectStyles';

import css from './secDrinks.module.css';
import SelectInput from 'components/SelectInput';
import filtersAPI from 'redux/api/filtersAPI';
import { useGetDrinksPageQuery } from 'redux/api/drinksPageAPI';
import makeIngrSelectOptions from './utils/makeIngrSelectOptions';
import makeSelectOptions from './utils/makeSelectOptions';
import DrinksPagination from 'components/DrinksPagination';
import { useMediaQuery } from 'hooks';
import { NotFoundMyDrinks } from 'components/MyDrinksComponent/NotFoundMyDrinks';
import Loader from 'components/Loader';

export default function SecDrinks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cocktails, setCocktails] = useState([]);
  const [pagesCount, setPagesCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const {
    searchQuery = '',
    page = 1,
    limit = 1,
    category = 'All categories',
    ingredient = 'All ingredients',
  } = params;

  const [ingredientsOptions, setIngredientsOptions] = useState(ingredient);
  const [categoryOptions, setCategoryOptions] = useState(category);

  const {
    data: drinks,
    isLoading,
    isFetching,
  } = useGetDrinksPageQuery({
    limit,
    page,
    ingredient,
    category,
    searchQuery,
  });

  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const isTablet = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (!drinks) {
      return;
    }
    setIngredientsOptions(ingredient);

    let limit = 10;
    const { data, total } = drinks;
    if (isDesktop) {
      limit = 9;
    } else if (isTablet) {
      limit = 8;
    }

    setPagesCount(Math.ceil(total / limit));

    setSearchParams({
      ...params,
      page: currentPage,
      limit,
    });

    setCocktails(data);
  }, [
    drinks,
    setSearchParams,
    currentPage,
    isDesktop,
    isTablet,
    ingredient,
    params,
  ]);

  const updateQueryString = drink => {
    let nextParams;
    if (drink === '') {
      nextParams = { ...params };
      delete nextParams.searchQuery;
    } else {
      nextParams = { ...params, searchQuery: drink };
      setCurrentPage(1);
    }

    setSearchParams(nextParams);
  };

  const handleSelectChange = selectData => {
    const { name, value } = selectData;
    switch (name) {
      case 'ingredients': {
        setIngredientsOptions(value);
        setSearchParams({ ...params, ingredient: value });
        setCurrentPage(1);
        return;
      }
      case 'category': {
        setCategoryOptions(value);
        setSearchParams({ ...params, category: value });
        setCurrentPage(1);
        return;
      }
      default:
        return;
    }
  };

  const handlePagination = page => {
    setCurrentPage(page);
    setSearchParams({ ...params, page });
  };

  return (
    <section className={css.section}>
      <Title children={'Drinks'} />
      <div className={css.filter}>
        <Filter value={searchQuery} onChange={updateQueryString} />

        <SelectInput
          inputName={'ingredients'}
          fetchSelectOpt={filtersAPI.useGetIngredientsQuery}
          handleSelectChange={handleSelectChange}
          makeOptArr={makeIngrSelectOptions}
          defaultValue={ingredientsOptions}
          styles={filtersSelectStyles}
        />
        <SelectInput
          inputName={'category'}
          fetchSelectOpt={filtersAPI.useGetCategoriesQuery}
          handleSelectChange={handleSelectChange}
          makeOptArr={makeSelectOptions}
          defaultValue={categoryOptions}
          styles={filtersSelectStyles}
        />
      </div>

      <div className={css['content-wrapp']}>
        {isLoading || isFetching ? (
          <Loader
            size={15}
            margin={10}
            position={{
              marginTop: '100px',
              marginLeft: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          />
        ) : cocktails.length && !isLoading ? (
          <DrinkList cocktails={cocktails} />
        ) : (
          <NotFoundMyDrinks children={`There are no results`} />
        )}
      </div>

      {cocktails.length !== 0 && !isLoading && (
        <DrinksPagination
          className={css['pagination']}
          currentPage={currentPage}
          pagesCount={pagesCount}
          refreshOnClick={handlePagination}
        />
      )}
    </section>
  );
}
