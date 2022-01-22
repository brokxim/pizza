// import axios from 'axios';

// export const setLoaded = (payload) => ({
//   type: 'SET_LOADED',
//   payload,
// });

// export const fetchPizzas = (sortBy, category) => (dispatch) => {
//   dispatch({
//     type: 'SET_LOADED',
//     payload: false,
//   });

//   axios
//     .get(
//       `/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${
//         sortBy.order
//       }`,
//     )
//     .then(({ data }) => {
//       dispatch(setPizzas(data));
//     });
// };

// export const setPizzas = (items) => ({
//   type: 'SET_PIZZAS',
//   payload: items,
// });
import axios from 'axios';

export const setLoaded = (payload)=>({
    type: 'SET_LOADED',
    payload,
});
export const fetchPizzas=(sortBy,category)=>(dispatch)=>{
    dispatch(setLoaded(false));
    axios.get( 
        //?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`
        'https://pizza-a1f25-default-rtdb.firebaseio.com/pizzas.json',
        ).then(({data}) =>{ 

            console.log(data);
            console.log(category);
            console.log(sortBy);

            if (category !== null) {
                data = data.filter(elem=>{
                    if (elem.category === category) {
                         return elem
                    }
                  })
            }
             

            if (sortBy.type === "popular") {
                data.sort(function(a,b){
                    if(a.rating < b.rating){
                        return 1
                    }
                    return -1
                })
            }

            if (sortBy.type === "price") {
                data.sort(function(a,b){
                    if (a.price < b.price){
                        return 1
                    }
                    return -1
                })
            }

            if (sortBy.type === "name") {
                data.sort(function(a,b){
                    if (a.name > b.name){
                        return 1
                    }
                    return -1
                })
            }


            console.log(data)
            dispatch(setPizzas(data));  
        })

}
export const setPizzas = (items)=>({
    type: 'SET_PIZZAS',
    payload: items,    
});