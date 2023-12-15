import "./charList.scss";
// import abyss from "../../resources/img/abyss.jpg";
import { useState, useEffect, useRef } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

const CharList = ({ onCharSelected }) => {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset).then(showAllChars).catch(error);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const addChars = () => {
    marvelService.getAllCharacters().then(showAllChars);
  };

  const showAllChars = (newCharList) => {
    let ended = false;

    if (newCharList.length < 9) {
      ended = true;
    }

    setChars([...chars, ...newCharList]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  // const setCharRef = (elem) => {
  //   oneRef = elem;
  //   console.log("elem", elem);
  // };

  const onCharHandleClick = (id) => {
    console.log("id", id);
    onCharSelected(id);
  };
  const loadingSpinner = loading ? <Spinner /> : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        {loadingSpinner}
        {chars.map((item) => {
          return (
            <li
              key={item.id}
              className="char__item"
              onClick={() => onCharHandleClick(item.id)}
            >
              <img src={item.thumbnail} alt="abyss" />
              <div className="char__name">{item.name}</div>
            </li>
          );
        })}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;

// import "./charList.scss";
// // import abyss from "../../resources/img/abyss.jpg";
// import { Component, createRef } from "react";
// import MarvelService from "../../services/MarvelService";
// import Spinner from "../spinner/Spinner";

// class CharList extends Component {
//   state = {
//     chars: [],
//     loading: true,
//     error: false,
//     newItemLoading: false,
//     offset: 210,
//     charEnded: false,
//   };

//   marvelService = new MarvelService();

//   componentDidMount = () => {
//     this.onRequest();
//     // this.addChars();
//   };

//   onRequest = (offset) => {
//     this.onCharListLoading();
//     this.marvelService
//       .getAllCharacters(offset)
//       .then(this.showAllChars)
//       .catch(this.onError);
//   };

//   onCharListLoading = () => {
//     this.setState({
//       newItemLoading: true,
//     });
//   };

//   addChars = () => {
//     this.marvelService.getAllCharacters().then(this.showAllChars);
//   };

//   showAllChars = (newCharList) => {
//     let ended = false;

//     if (newCharList.length < 9) {
//       ended = true;
//     }
//     this.setState(({ chars, offset }) => ({
//       chars: [...chars, ...newCharList],
//       loading: false,
//       newItemLoading: false,
//       offset: offset + 9,
//       charEnded: ended,
//     }));
//   };

//   setCharRef = (elem) => {
//     this.oneRef = elem;

//     // elem.current.classList.remove("char__item_selected");
//     console.log("elem", elem);
//   };

//   onCharHandleClick = (id) => {
//     console.log("id", id);
//     this.props.onCharSelected(id);
//   };

//   render() {
//     const { chars, loading, newItemLoading, offset, charEnded } = this.state;

//     const loadingSpinner = loading ? <Spinner /> : null;

//     return (
//       <div className="char__list">
//         <ul className="char__grid">
//           {loadingSpinner}
//           {chars.map((item) => {
//             return (
//               <li
//                 key={item.id}
//                 className="char__item"
//                 ref={this.setCharRef}
//                 onClick={() => this.onCharHandleClick(item.id)}
//               >
//                 <img src={item.thumbnail} alt="abyss" />
//                 <div className="char__name">{item.name}</div>
//               </li>
//             );
//           })}
//         </ul>
//         <button
//           className="button button__main button__long"
//           disabled={newItemLoading}
//           onClick={() => this.onRequest(offset)}
//           style={{ display: charEnded ? "none" : "block" }}
//         >
//           <div className="inner">load more</div>
//         </button>
//       </div>
//     );
//   }
// }

// export default CharList;
