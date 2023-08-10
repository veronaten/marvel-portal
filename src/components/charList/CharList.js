import "./charList.scss";
// import abyss from "../../resources/img/abyss.jpg";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount = (chars) => {
    this.addChars();
  };

  addChars = () => {
    this.marvelService.getAllCharacters().then(this.showAllChars);
  };

  showAllChars = (chars) => {
    this.setState({ chars, loading: false });
  };

  render() {
    const { chars, loading } = this.state;

    const loadingSpinner = loading ? <Spinner /> : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {loadingSpinner}
          {chars.map((item) => {
            return (
              <li key={item.id} className="char__item">
                <img src={item.thumbnail} alt="abyss" />
                <div className="char__name">{item.name}</div>
              </li>
            );
          })}

          {/* <li className="char__item char__item_selected">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
          </li>
          <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
          </li>
          <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
          </li>
          <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
          </li>
          <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
          </li>
          <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
          </li>
          <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
          </li>
          <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
          </li> */}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

// const CharList = () => {
//     return (
//         <div className="char__list">
//             <ul className="char__grid">
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item char__item_selected">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

export default CharList;
