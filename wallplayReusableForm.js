import React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { StyledButton } from "./ButtonStyles";
import { ref, storageRef } from "../../Firebase/FBConfig";
import formCloseBtn from "../../assets/form-close.svg";
import uuidv4 from "uuid/v4";
const StyledInlineFormBtn = styled(StyledButton)`
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  @media (min-width: 768px) {
    max-height: 52px;
    padding: 0;
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  height: 35px;
  width: 35px;
  top: 15px;
  right: 15px;
  z-index: 100;
  cursor: pointer;
`;

const FormValidation = styled.h3`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 99;
  color: #fff;
  background: rgba(237, 169, 136, 1);
  display: ${props => (props.formSubmitted ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-weight: 700;
  text-align: center;
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const StyledInlineForm = styled.form`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateY(0px);
  display: ${props => (props.display ? props.display : "flex")};
  grid-gap: 15px;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  background-color: ${props => (props.color ? props.color : "#a3d8ce")};
  flex-direction: column;
  padding-right: 8%;
  flex-wrap: nowrap;
  height: 100vh;
  padding-top: ${props => (props.formHeader ? "70px;" : "30px")};
  padding-left: 8%;
  width: 100%;
  margin-top: ${props => (props.projectForm ? "100px" : "")};
  z-index: 501;
  h1 {
    font-size: 35px;
    font-family: theinhardt_medium;
  }
  .spacer {
    height: 40px;
  }
  @media (min-width: 768px) {
    grid-gap: 30px;
    grid-template-columns: 1fr 1fr;
    height: 600;
    height: ${props => (props.size ? props.size : "550px")};
    z-index: 1;
    flex-wrap: wrap;
    padding-bottom: ${props => (props.display ? "5vh" : "0")};
    grid-template-areas: ${props => (props.gridArea ? props.gridArea : "none")};
    width: 100%;
    position: absolute;
    height: ${props => (props.sizeTablet ? props.sizeTablet : "550px")};
  }
  @media (min-width: 992px) {
    height: ${props => (props.sizeDesktopSM ? props.sizeDesktopSM : "550px")};
  }
  @media (min-width: 1040px) {
    height: ${props => (props.sizeDesktopMD ? props.sizeDesktopMD : "550px")};
  }
  @media (min-width: 992px) {
    height: ${props => (props.sizeDesktopSM ? props.sizeDesktopSM : "550px")};
  }
  @media (min-width: 1040px) {
    height: ${props => (props.sizeDesktopMD ? props.sizeDesktopMD : "550px")};
  }
  &.slide-enter {
    animation: formslipins 0.4s ease-in;
  }
  &.slide-exit {
    animation: formslipouts 0.5s ease-out;
  }
  .input-group {
    display: flex;
    justify-content: ${props => (props.display ? "flex-end" : "flex-start")};
    margin-bottom: ${props => (props.display ? "0" : "40px")};
    margin-right: ${props => (props.display ? "0" : "3vw")};
    width: ${props => (props.inputWidth ? props.inputWidth : "80%")};
    flex-direction: column;
    &:last-of-type {
      margin-bottom: 0;
      button {
        margin-bottom: 0;
      }
    }
    @media (min-width: 768px) {
      width: ${props => (props.gridArea ? "100%" : "40%")};
    }
    label {
      font-family: theinhardt_regular;
      font-size: 15px;
      @media (min-width: 768px) {
        font-size: 18px;
      }
    }
    .orange {
      color: orange;
    }
    input {
      background: none;
      height: 4vh;
    }
    textarea {
      margin-top: 2vh;
      background: none;
      resize: none;
      @media (max-width: 767px) {
        border: none;
        border-bottom: 1px solid #000;
        height: 35px;
        font-size: 15px;
      }
      @media (min-width: 768px) {
        max-height: ${props =>
          props.maxHeightTablet ? props.maxHeightTablet : "100%"};
      }
      @media (min-width: 1040px) {
        max-height: ${props =>
          props.maxHeightDesktop ? props.maxHeightDesktop : "100%"};
      }
    }
  }
  .input-group.name {
    @media (min-width: 768px) {
      grid-area: ${props => (props.gridArea ? "name" : "auto")};
    }
  }
  .input-group.email {
    @media (min-width: 768px) {
      grid-area: ${props => (props.gridArea ? "email" : "auto")};
    }
  }
  .input-group.info {
    @media (min-width: 768px) {
      grid-area: ${props => (props.gridArea ? "info" : "auto")};
    }
  }
  .input-group.styledformbtn {
    @media (min-width: 768px) {
      grid-area: ${props => (props.gridArea ? "btn" : "auto")};
      display: inline-block;
    }
    button {
      width: auto;
    }
  }
  p {
    font-size: 1.5vw;
  }
  button {
    color: black;
    font-size: 18px;
    @media (min-width: 768px) {
      font-size: 20px;
      padding: 8px 20px;
    }
    @media (min-width: 992px) {
      font-size: 23px;
      padding: 10px 22px;
    }
    @media (min-width: 1200px) {
      padding: 12px 24px;
      font-size: 25px;
    }
  }
  @keyframes formslipins {
    from {
      transform: ${props =>
        props.projectForm ? "translate(0, -700px)" : "translate(0, 500px)"};
    }
    to {
      transform: translate(0, 0px);
    }
  }
  @keyframes formslipouts {
    from {
      transform: translateY(0, 0px);
    }
    to {
      transform: ${props =>
        props.projectForm ? "translate(0, -700px)" : "translate(0, 500px)"};
    }
  }
  @keyframes formslidesUp {
    from {
      transform: ${props =>
        props.projectForm ? "translateY(-700px)" : "translateY(500px)"};
    }
    to {
      transform: translateY(0px);
    }
  }
  @keyframes formslidesDown {
    from {
      transform: translateY(0px);
    }
    to {
      transform: ${props =>
        props.projectForm ? "translateY(-700px)" : "translateY(500px)"};
    }
  }
`;

export class InlinePublicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let newState = {};
    for (let i = 0; i < this.props.form.fields.length; i++) {
      newState[this.props.form.fields[i].value] = "";
    }
    newState["message"] = "please fill out the required fields";
    newState["showMessage"] = false;
    if (newState) {
      this.setState(newState);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.form.fields !== prevProps.form.fields) {
      let newState = {};
      for (let i = 0; i < this.props.form.fields.length; i++) {
        newState[this.props.form.fields[i].value] = "";
      }
      newState["message"] = "please fill out the required fields";
      newState["showMessage"] = false;
      if (newState) {
        this.setState(newState);
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    let form = this.state;
    form["timestamp"] = Date.now();
    form["submitted"] = Date.now();
    if (!this.props.projectForm) {
      form["spaceName"] = this.props.currentSpace;
      form["spaceUrl"] = this.props.currentUrl;
    }
    if (!this.checkRequiredFields()) {
      let newItemRef = ref
        .child(
          this.props.firebasePath ? this.props.firebasePath : "requests/spaces"
        )
        .push();
      form.key = newItemRef.key;
      form.message = this.props.removeMessage ? "" : form.message;

      try {
        newItemRef
          .update(form)
          .then(() => {
            this.props.deactivateForm();
            this.props.activateResponse();
            this.clearState();
          })
          .catch(e => {
            console.log("Error uploading object to requests " + e);
            window.alert(e);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  handleCustomSubmit = e => {
    e.preventDefault();
    if (this.props.submitArgs) {
      let args = [...this.props.submitArgs, this.state];
      this.props.customFormSubmission.apply(null, args);
    } else {
      this.props.customFormSubmission(e);
    }
    this.props.deactivateForm();
  };
  clearState = () => {
    const keys = Object.keys(this.state);
    for (let key in keys) {
      this.setState({ [keys[key]]: "" });
    }
    this.setState({ showMessage: false });
  };
  checkRequiredFields = () => {
    let fields = this.props.form.fields;
    let isNotComplete = false;
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].label.charAt(0) === "*" && !this.state[fields[i].value]) {
        isNotComplete = true;
      }
    }
    this.setState({ showMessage: isNotComplete });
    return isNotComplete;
  };
  handleChange = event => {
    // event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [`${name}`]: value });
  };
  handleFile = event => {
    // console.log("activeInput " + activeInput);
    let storeKey = uuidv4();
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const filename = event.target.files[0].name;
    const profileTypeStorageRef = storageRef.child(
      "requests/projectSubmissionStorage"
    );

    const heroImgStorageRef = profileTypeStorageRef.child(storeKey);
    const fileURL = heroImgStorageRef.child(filename);
    fileURL.put(file).then(() => {
      heroImgStorageRef
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ file: url }))
        .catch(function(error) {
          window.alert("Error uploading the image " + error);
        });
    });
  };

  renderInputs = values => {
    return values.map(value => (
      <div
        data-test="InlinePublicForm-inputs"
        className={`input-group ${value.value}`}
        key={value.label}
      >
        <label
          className={
            this.state.showMessage &&
            !this.state[value.value] &&
            value.label.charAt(0) === "*"
              ? "orange"
              : ""
          }
        >
          {value.label}
        </label>
        {this.determineInputType(value)}
      </div>
    ));
  };
  determineInputType = value => {
    switch (value.type) {
      case "textarea":
        return (
          <textarea
            data-test="InlinePublicForm-inputfield-textarea"
            name={value.value}
            label={value.label}
            value={this.state[value.value]}
            rows="6"
            onChange={e => this.handleChange(e)}
          />
        );

      case "email":
        return (
          <input
            data-test="InlinePublicForm-inputfield-email"
            name={value.value}
            label={value.label}
            type={"email"}
            value={this.state[value.value]}
            onChange={e => this.handleChange(e)}
          />
        );
      case "file":
        return (
          <input
            data-test="InlinePublicForm-inputfield-file"
            name={value.value}
            label={value.label}
            type="file"
            onChange={e => this.handleFile(e)}
          />
        );

      default:
        return (
          <input
            data-test="InlinePublicForm-inputfield-default"
            name={value.value}
            label={value.label}
            value={this.state[value.value]}
            onChange={e => this.handleChange(e)}
          />
        );
    }
  };
  render() {
    return (
      <CSSTransition
        in={this.props.formActive}
        classNames={
          this.props.animationClass ? this.props.animationClass : "slide"
        }
        timeout={450}
        mountOnEnter
        unmountOnExit
      >
        <React.Fragment>
          <StyledInlineForm
            data-test="component-InlinePublicForm"
            gridArea={this.props.gridArea}
            sizeTablet={this.props.sizeTablet}
            sizeDesktopMD={this.props.sizeDesktopMD}
            sizeDesktopSM={this.props.sizeDesktopSM}
            display={this.props.display}
            projectForm={this.props.projectForm ? true : false}
            inputWidth={this.props.inputWidth}
            maxHeightDesktop={this.props.maxHeightDesktop}
            maxHeightTablet={this.props.maxHeightTablet}
            color={this.props.color}
          >
            {this.props.formHeader ? <div className="spacer" /> : null}
            {this.renderInputs(this.props.form.fields)}

            <div
              data-test="InlinePublicForm-button-submit"
              className="input-group  styledformbtn"
            >
              {this.props.display ? (
                <StyledInlineFormBtn
                  onClick={e =>
                    this.props.customFormSubmission
                      ? this.props.customFormSubmission(e)
                      : this.handleSubmit(e)
                  }
                  type="submit"
                >
                  submit
                </StyledInlineFormBtn>
              ) : (
                <StyledButton
                  onClick={e =>
                    this.props.customFormSubmission
                      ? this.handleCustomSubmit(e)
                      : this.handleSubmit(e)
                  }
                  type="submit"
                >
                  submit
                </StyledButton>
              )}
            </div>
            <CloseIcon
              src={formCloseBtn}
              onClick={e => this.props.deactivateForm(e)}
            />
            <FormValidation formSubmitted={this.props.formSubmitted}>
              {" "}
              your request was received! <br /> we’ll be in touch soon :){" "}
            </FormValidation>
            <p>{this.state.showMessage ? this.state.message : ""}</p>
          </StyledInlineForm>
        </React.Fragment>
      </CSSTransition>
    );
  }
}
