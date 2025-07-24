export const initialServiceState = {
    categories: [],
    cities: [],
    providers: [],
    pagination: {},
    loading: true,
    viewMode: 'grid',
    serviceCategories: [],
    likes: [],
    dislikes: [],
    favourites: [],
    sortOptions: [
        { value: 'promoted', label: 'sort.promoted' },
        { value: 'reviews_desc', label: 'sort.reviews_desc' },
        { value: 'reviews_asc', label: 'sort.reviews_asc' },
        { value: 'views_desc', label: 'sort.views_desc' },
        { value: 'views_asc', label: 'sort.views_asc' },
        { value: 'likes_desc', label: 'sort.likes_desc' },
        { value: 'likes_asc', label: 'sort.likes_asc' }
    ],    
    filters: {
        city_alias: "",
        category_alias: "",
        service_category_alias: "",
        term: "",
        sort: ""
    },
    filtered: [],
    appliedFilters: {}
};


export function serviceReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true };

        case 'FETCH_SUCCESS':
            return {
                ...state,
                categories: action.payload.categories,
                cities: action.payload.cities,
                providers: action.payload.providers,
                pagination: action.payload.pagination,
                serviceCategories: action.payload.serviceCategories,
                filtered: action.payload.filtered,
                filters: {
                    ...action.payload.filters,
                    ...action.payload.paramsObj
                },
                viewMode: action.payload.viewMode,
                loading: false
            };

        case 'FETCH_ERROR':
            return { ...state, loading: false };

        case 'SET_USER_ACTIONS':
            return {
                ...state,
                likes: action.payload.likes || [],
                dislikes: action.payload.dislikes || [],
                favourites: action.payload.favourites || []
            };
        case 'UPDATE_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            };
        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    city_alias: "",
                    category_alias: "",
                    service_category_alias: "",
                    term: "",
                    sort: ""
                },
                appliedFilters: {}
            };
        case 'APPLY_FILTERS':
            return {
                ...state,
                appliedFilters: { ...state.filters }
            };
        case 'SET_FAVOURITES':
            return {
                ...state,
                favourites: action.payload.favourites,
            };
        case 'TOGGLE_FAVOURITE': {
            const id = action.payload.id;
            const isFav = state.favourites.includes(id);
            return {
                ...state,
                favourites: isFav
                    ? state.favourites.filter(favId => favId !== id)
                    : [...state.favourites, id],
            };
        }
        default:
            return state;
    }
}