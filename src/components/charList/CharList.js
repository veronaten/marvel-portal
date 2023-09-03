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
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.onRequest();
    // this.addChars();
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.showAllChars)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  addChars = () => {
    this.marvelService.getAllCharacters().then(this.showAllChars);
  };

  showAllChars = (newCharList) => {
    let ended = false;

    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ chars, offset, charEnded }) => ({
      chars: [...chars, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  render() {
    const { chars, loading, newItemLoading, offset, charEnded } = this.state;

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
                onClick={() => this.props.onCharSelected(item.id)}
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
          onClick={() => this.onRequest(offset)}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
