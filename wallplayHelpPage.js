import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import { getHelp } from "../../Actions/HelpActionCreator";
import { SubHeader } from "../StyledComponents";
import "./help.css";

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleOpen: false,
      currentArticle: ""
    };
  }

  componentDidMount() {
    this.props.actions.getHelp();
    this.checkLocation();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.helpData !== prevProps.helpData ||
      this.props.history.location.pathname !== prevProps.location.pathname
    ) {
      this.checkLocation();
    }
  }

  checkLocation = () => {
    let pathname = this.props.history.location.pathname;
    if (this.props.helpData && pathname !== "/help") {
      let articles = Object.keys(this.props.helpData);
      for (var i = 0; i < articles.length; i++) {
        if ("/help/" + articles[i] === pathname) {
          let h = this.props.helpData[articles[i]];
          this.setState({ currentArticle: h, articleOpen: true });
        }
      }
    } else if (this.props.helpData && pathname === "/help") {
      this.setState({ articleOpen: false, currentArticle: "" });
    }
  };

  goToArticle(article) {
    this.props.history.push(`/help/${article.url}`);
    this.setState({ articleOpen: true, currentArticle: article });
  }

  renderQuestions(sectionName) {
    let quest = Object.values(this.props.helpData);
    const filteredquestions = quest.filter(q => {
      return q.tag === sectionName && q.body;
    });

    return filteredquestions.map(question => (
      <p
        key={question.title}
        onClick={() => {
          this.goToArticle(question);
        }}
        className="question"
      >
        {question.title}
      </p>
    ));
  }
  renderSections = () => {
    let sectionsArry = [];
    let articles = Object.values(this.props.helpData);
    for (var i = 0; i < articles.length; i++) {
      if (!sectionsArry.includes(articles[i].tag)) {
        sectionsArry.push(articles[i].tag);
      }
    }

    return sectionsArry.map(section => {
      return (
        <div className="help-category" key={section}>
          <h2 className="help-category-title">{section ? section : "Other"}</h2>
          {this.props.helpData && this.renderQuestions(section)}
        </div>
      );
    });
  };

  renderTopQuestions = () => {
    let quest = Object.values(this.props.helpData);
    let questF = quest.filter(q => {
      return q.isFeatured === true && q.body;
    });
    questF = questF.slice(0, 4);
    return questF.map(q => {
      return (
        <div
          onClick={() => {
            this.goToArticle(q);
          }}
          className="top-question top"
          key={q.url}
        >
          <h1>{q.title}</h1>
        </div>
      );
    });
  };

  renderArticle() {
    return this.state.currentArticle.body.map(section => {
      if (section.body.includes("<br>")) {
        let bod = section.body.split("<br>");
        let len = bod.length;
        for (var i = len; i > 0; i--) {
          bod.splice(i, 0, <br />);
        }
        return (
          <div className="article-section">
            <h2 className="article-subtitle">{section.subtitle}</h2>
            <p className="article-body">{bod}</p>
          </div>
        );
      } else {
        return (
          <div className="article-section">
            <h2 className="article-subtitle">{section.subtitle}</h2>
            <p className="article-body">{section.body}</p>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <MainLayout>
        {this.state.articleOpen ? (
          <div>
            <div className="banner">
              <h1>{this.state.currentArticle.title}</h1>
            </div>
            <div className="article-block">
              <div className="related-articles">
                <h1>Related Questions</h1>
                <hr />
                {this.renderQuestions(this.state.currentArticle.tag)}
              </div>
              <div className="article-padding">{this.renderArticle()}</div>
            </div>
          </div>
        ) : (
          <div>
            <SubHeader>help center</SubHeader>

            <div className="top-questions-grid">
              {this.props.helpData && this.renderTopQuestions()}
            </div>

            <SubHeader>all categories</SubHeader>

            <div className="help-categories-grid">
              {this.props.helpData && this.renderSections()}
            </div>
          </div>
        )}
      </MainLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    helpData: state.help.helpData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getHelp: function() {
        dispatch(getHelp());
      }
    }
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Help)
);
