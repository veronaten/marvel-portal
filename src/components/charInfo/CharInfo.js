import thor from "../../resources/img/thor.jpeg";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  componentDidMount = () => {
    this.updateChar();
  };

  componentDidUpdate = (prevProps) => {
    //проверка, чтобы не вызвать бесконечный цикл
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  };

  marvelService = new MarvelService();

  updateChar = () => {
    const { charId } = this.props;

    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || error || loading ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingSpinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {loadingSpinner}
        {content}
      </div>
    );
  }
}

export default CharInfo;

const View = ({ char }) => {
  const { name, descripption, thumbnail, home, wiki, comics } = char;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} className={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={home} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{descripption}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no commics for this character"}
        {comics?.map((item, i) => {
          if (i > 9) return;

          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
