// Esse reducer será responsável por tratar o todas as informações relacionadas ranking
const initialState = {
  currentPlayerAvatar:'',
  currentPlayerName:'',    
  currentPlayerScore:'',
  currentPlayerRanking:'',
  ranking:[], 
  
};
function ranking (state = initialState, action) {
  switch(action.type){
      case 'SET_CURRENT_AVATAR_PLAYER':
          return{...state, currentPlayerAvatar:action.payload.currentPlayerAvatar};
      case 'SET_CURRENT_NAME_PLAYER':           
         return{...state, currentPlayerName:action.payload.currentPlayerName};     
      case 'SET_CURRENT_PLAYER_SCORE':
         return{...state, currentPlayerScore:action.payload.currentPlayerScore};
      case 'SET_CURRENT_PLAYER_RANKING':
          /*
          A idéia é o componente que verifica os acertos e erro das respostas dispare
          uma ação SET_CURRENT_RANKING. Essa ação e cria um objeto com os dados da pessoa jogadora
          atualiza o estado do currentPlayerRanking.
          */
          const objCurrentPlayer = {
              name:state.currentPlayerName,
              avatar: state.currentPlayerAvatar,
              score: state.currentPlayerScore,
          }
         return{...state, currentPlayerRanking:objCurrentPlayer};
      case 'SET_RANKING':
          /*
          A idéia é o no componente que verifica os erros das respostas e a pessoa jogadora clicar no botão
          ver ranking disparar a ação SET_RANKING. Cria a variável allPlayers que pega os dados do ranking e adiciona
          os dados atuais da pessoa jogadora. Depois atualiza o estado do ranking com as informações atualizadas de todos
          os jogadores
          */
          const allPlayers = [...state.ranking, state.currentPlayerRanking ];           
      return{...state,  ranking:allPlayers};
           default:             
      return state; 
  }
}
export default ranking;