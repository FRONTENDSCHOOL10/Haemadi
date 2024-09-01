import styles from './Button.module.css';
import PropTypes from 'prop-types';


const Button = ({ children, variant = 'buttonWhite', ...props }) => {
    const classNames = `${styles.button} ${styles[variant]}`;

    return (
        <button className={classNames} {...props}>
            {children}
        </button>
    );
};

Button.propTypes = {
  children: PropTypes.node.isRequired, 
  variant: PropTypes.oneOf(['buttonWhite', 'buttonGray', 'buttonBlue']), 
};

// 기본 props 정의
Button.defaultProps = {
  variant: 'buttonWhite', 
};


export default Button;