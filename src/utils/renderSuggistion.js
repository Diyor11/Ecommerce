
import {Container, Row, Col} from 'reactstrap';

import { Link } from "react-router-dom";
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

export default function renderSuggestion(suggestion, { query, isHighlighted }) {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.name, query);
      const parts = AutosuggestHighlightParse(suggestion.name, matches);

      return (
        <div>
          {parts.map((part, index) => {
            const className = part.highlight
              ? 'react-autosuggest__suggestion-match'
              : null;
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <Link to={`/product/${suggestion._id}`}>
        <div className='d-flex'>
          <img
            alt='product'
            className='item-image'
            src={`${process.env.REACT_APP_API + suggestion.imageUrl}`}
          />
          <div>
            <Container>
              <Row>
                <Col>
                  <span className='name'>{BoldName(suggestion, query)}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className='price'>${suggestion.price}</span>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Link>
    );
  }