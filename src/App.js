import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import './App.css'

//const cardImages = [
//  { "src": "/img/helmet-1.png", match: false},
//  { "src": "/img/potion-1.png", match: false},
//  { "src": "/img/ring-1.png", match: false},
//  { "src": "/img/scroll-1.png", match: false},
//  { "src": "/img/shield-1.png", match: false},
//  { "src": "/img/sword-1.png", match: false}
//];

const cardImages = [
  { "src": "/img/pinery/pinery-1.png", match: false},
  { "src": "/img/pinery/pinery-2.png", match: false},
  { "src": "/img/pinery/pinery-3.png", match: false},
  { "src": "/img/pinery/pinery-4.png", match: false},
  { "src": "/img/pinery/pinery-5.png", match: false},
  { "src": "/img/pinery/pinery-6.png", match: false}
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // cannot handle checking if choices match here, because setState not instant
  };

  // compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return { ...card, match: true};
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // start game on when page first loads
  useEffect(() => {
    shuffleCards();
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Pinery Match</h1>
      <p>Turns: {turns}</p>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            id={card.id} 
            card={card} 
            flipped={
              card === choiceOne || 
              card === choiceTwo ||
              card.match
            }
            disabled={disabled}
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App