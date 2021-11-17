import "./Dialog.css";
const Dialog = ({ title, description, confirm, cancel, iswarning }) => {
  return (
    <div v-show="show" class="overlay">
      <div class="dialog">
        <div class="dialog__content">
          <h2 class="dialog__title" v-text="title">
            {title}
          </h2>
          <p class="dialog__description" v-text="description">
            {description}
          </p>
        </div>
        <hr />
        <div class="dialog__footer">
          {iswarning && <button class="dialog__cancel">{cancel}</button>}
          <button class="dialog__confirm">{confirm}</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
