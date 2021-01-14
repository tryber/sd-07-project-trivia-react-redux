// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// class Questions extends React.Component {
//   constructor() {
//     super();
//     this.incrementIndex = this.incrementIndex.bind(this);
//     this.renderNextButton = this.renderNextButton.bind(this); /* bindei uma func para quando clicar em alguma resposta */
//     this.state = {
//       questionNumber: 0,
//       visibleClick: false, /* adicionei visibleClick */
//     };
//   }

//   incrementIndex() {
//     // const { questionNumber } = this.state;
//     // this.setState({ questionNumber: questionNumber + 1 });
//     this.setState((anterior) => ({
//       questionNumber: anterior.questionNumber + 1,
//       visibleClick: false, /* Quando clicar no botão próximo some novamente */
//     }));
//   }

//   renderNextButton() {
//     this.setState({ visibleClick: true });
//   }

//   render() {
//     const { questionNumber, visibleClick } = this.state; /* adicionei visibleClick */
//     const { questions } = this.props;
//     const { questionsList } = questions;
//     const five = 5;
//     if (questionsList < five) {
//       console.log(questionsList);
//       return <div>Efetue o login novamente</div>;
//     }
//     return (
//       <div>
//         {`Questão número ${questionNumber + 1}`}
//         <div>
//           <h2 data-testid="question-category">
//             {questionsList[questionNumber].category}
//           </h2>
//           <p data-testid="question-text">
//             {questionsList[questionNumber].question}
//           </p>
//         </div>
//         <div>
//           <button
//             type="button"
//             data-testid="correct-answer"
//             onClick={ () => this.renderNextButton() } /* Quando clicar chama função para trocar state de false para true */
//           >
//             {questionsList[questionNumber].correct_answer}
//           </button>
//           {questionsList[questionNumber].incorrect_answers.map((q, index) => (
//             <button
//               key={ q }
//               data-testid={ `wrong-answer-${index}` }
//               className="wrong-answer"
//               type="button"
//               onClick={ () => this.renderNextButton() } /* Quando clicar chama função para trocar state de false para true */
//             >
//               {q}
//             </button>
//           ))}
//         </div>
//          {/* Inicio condicional para renderizar */}
//         {
//           visibleClick
//           ? <button
//               data-testid="btn-next"
//               type="button"
//               onClick={ () => this.incrementIndex() }
//             >
//               Próxima
//             </button>
//           : null
//         }
//         {/* Fim da condicional para renderizar */}
        
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   questions: state.questions.questions,
// });

// Questions.propTypes = {
//   questions: PropTypes.shape({
//     questionsList: PropTypes.arrayOf(PropTypes.string, PropTypes.array)
//       .isRequired,
//   }).isRequired,
// };
// export default connect(mapStateToProps, null)(Questions);
