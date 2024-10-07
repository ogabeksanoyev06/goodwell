import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../../store/actions";
import get from "lodash/get";
import { Seo, Spinner } from "../../components";
import outsideClick from "../../hooks/OutsideClick";
import { useTranslation } from "react-i18next";

const Index = ({ history }) => {
  const { t } = useTranslation("main");
  const [activeItem, setActiveItem] = useState(null);
  const [contacts, setContacts] = useState([]);
  const currentLangCode = useSelector((state) => state.system.currentLangCode);

  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const { ref, isVisible, setIsVisible } = outsideClick();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      Actions.system.GetContacts({
        successCb: (data) => {
          setContacts(data);
          setActiveItem(data[0]);
        },
      })
    );
  }, []);

  const ids = contacts.reduce(
    (prev, curr) => [...prev, String(curr.region_id)],
    []
  );

  const handleMouseEnter = (event, val) => {
    const id = Number(val);
    const hoveredRegion = contacts.find((c) => c.region_id === id);
    const address = get(hoveredRegion, "address_ru", "");

    const { clientX, clientY } = event;
    setTooltipPosition({ x: clientX, y: clientY });
    setTooltipText(address);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipPosition({ x: 0, y: 0 });
  };
  return (
    <div className="site-wrapper">
      <Seo alias={"contacts"} />
      <section className="back-section">
        <div className="container">
          <button
            className="back-section__btn"
            onClick={() => history.goBack()}
          >
            <img src={require("../../assets/icon/arrowBack.svg")} alt="" />
            <span>{t("Назад")}</span>
          </button>
        </div>
      </section>
      {activeItem ? (
        <section className="contact-section">
          <div className="container">
            <div className="contact-row">
              <div className="contact-row__col">
                <div className="contact-section__title">{t("Контакты")}</div>

                <div
                  className={`d-none custom-dropdown ${
                    isVisible ? "--open" : ""
                  }`}
                  ref={ref}
                >
                  <div
                    className="custom-dropdown__value"
                    onClick={() => setIsVisible((prev) => !prev)}
                  >
                    <span>
                      {get(activeItem, `region.name_${currentLangCode}`)}
                    </span>
                    <div className="custom-dropdown__icon" />
                  </div>
                  <div className="custom-dropdown__list">
                    {contacts.map((contact, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setActiveItem(contact);
                            setIsVisible(false);
                          }}
                        >
                          {get(contact, `region.name_${currentLangCode}`)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="contact-section__box">
                  <div className="contact-section__subtitle">{t("Адрес")}:</div>
                  <div className="contact-section__link">
                    {get(activeItem, `address_${currentLangCode}`)}
                  </div>
                </div>
                <div className="contact-section__box">
                  <div className="contact-section__subtitle">
                    {t("Телефон для справок")}:
                  </div>
                  {get(activeItem, "phone1") && (
                    <a
                      href={`tel:+${activeItem.phone1}`}
                      className="contact-section__link"
                    >
                      {activeItem.phone1}
                    </a>
                  )}
                  {get(activeItem, "phone2") && (
                    <a
                      href={`tel:+${activeItem.phone2}`}
                      className="contact-section__link"
                    >
                      {activeItem.phone2}
                    </a>
                  )}
                </div>
              </div>
              <div className="contact-row__col">
                <div className="contact-section__map">
                  <div
                    className={`custom-tooltip ${
                      showTooltip ? "--active" : ""
                    }`}
                    style={{
                      left: tooltipPosition.x,
                      top: tooltipPosition.y - 10,
                    }}
                  >
                    {tooltipText}
                  </div>
                  <svg
                    viewBox="0 0 966 632"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M842.699 259.333L844.523 257.981L847.731 256.607L853.025 259.252L857.657 262.583L858.781 264.117L858.559 265.894L847.511 272.374L840.652 275.402L837.624 275.948L836.803 276.795L834.637 284.164L830.386 285.476L824.931 287.717L821.121 291.109L815.046 299.103L799.605 310.711L799.385 313.073L800.729 314.991L805.742 316.323L812.359 319.876L815.948 322.662L825.754 319.069L828.181 319.856L830.747 323.571L833.455 333.947L837.846 336.773L843.601 338.933L847.169 339.64L851.922 342.184L858.259 343.133L862.51 342.204L867.824 344.385L868.686 343.435L869.388 327.971L873.839 330.555L876.406 330.515L878.652 328.618L879.814 326.054L880.577 320.946L879.594 315.839L881.579 313.497L883.124 312.972L884.267 313.598L884.949 314.91L885.149 319.533L888.357 321.491L890.323 322.622L892.187 326.538L894.012 330.273L895.176 339.014L899.687 339.62L904.98 341.295L908.53 339.66L911.277 340.629L912.22 344.768L912.2 348.624L912.6 351.693L914.024 352.561L918.636 350.643L922.506 350.38L926.075 352.217L930.507 355.003L936.943 362.311L939.069 363.361L948.775 363.926L950.8 365.42H954.128L957.739 364.108L965.739 366.47L966 367.802L964.656 369.639L945.587 379.733L944.183 382.842L940.293 386.778L936.041 389.02L933.977 389.1L924.652 385.103L923.569 386.072L922.807 387.687L922.847 389.444L924.893 393.642L923.951 396.287L922.165 398.205L916.331 396.529L915.247 395.46L915.128 394.289H912.882L909.412 395.46L902.734 402.707L900.409 406.502L899.546 408.783L896.578 410.076L893.351 410.56L889.18 413.972L884.648 416.616L883.203 414.678L882.321 412.518L881.118 411.831L878.331 412.337L874.962 412.417L871.412 409.975L866.822 407.512L862.811 406.643L850.979 407.794L845.124 409.006L843.28 410.196L839.991 410.52L826.134 413.003L823.307 412.034L821.222 408.117L819.397 403.878L815.808 402.344L811.777 401.152L810.274 399.457L810.174 397.397L810.595 395.379L810.915 394.329L820.26 386.214L828.681 378.906L829.463 378.32L830.226 376.927L831.649 374.404V373.092L825.352 370.184L825.112 368.852L826.376 367.479V365.642L821.924 360.272L814.223 351.894L811.998 351.026L810.354 351.571L807.346 359.666L805.842 361.725L797.06 367.035L789.72 370.689L776.646 377.169L773.236 379.208L770.871 378.845L768.505 377.573L761.165 371.012L756.434 368.771L753.245 370.992L750.558 374.222L750.818 380.863L747.79 384.356L744.763 385.931L750.277 403.676L749.735 405.957L745.525 406.583L748.613 413.245L746.006 414.012L739.369 412.457L730.445 411.428L713.601 414.375L712.359 415.526L711.897 417L712.88 418.332L721.041 418.473L729.022 417.807L731.227 419.039L731.568 421.219L730.646 422.592L727.979 422.834L722.144 424.146L721.482 425.539L721.281 426.872L723.266 430.727L725.473 433.19L725.753 434.644L724.83 435.875L723.708 436.36L721.742 434.543L720.62 434.906L720.078 436.562L719.537 438.5L718.253 439.913L715.526 439.166L712.819 439.711L711.216 446.736L709.852 454.691L705.4 459.98L702.933 461.898L699.305 462.463L693.91 461.817L690.642 461.029L681.176 459.859L671.692 457.698L661.025 455.68L651.098 460.343L648.231 463.189L646.407 465.855L644.541 467.086L640.23 483.398L640.671 485.255L643.057 486.708L655.23 490.08L657.014 491.473L658.076 493.068L658.598 500.376L659.6 501.385L663.771 502.293L669.807 502.233L674.539 501.506L679.291 502.172L682.62 503.747L684.245 506.23L685.148 508.915L679.492 524.924L679.954 530.738L681.698 539.055L684.907 545.576L690.942 551.935L695.534 556.013L696.497 557.931L696.737 560.898L695.995 564.694L693.349 570.71L690.1 575.959L686.591 578.18L681.718 584.841L677.407 593.017L669.126 603.717L666.338 609.673L665.416 626.852L663.23 632L662.889 630.042L659.901 628.084L654.687 628.427L651.259 627.498L649.614 625.298L645.364 625.924L638.505 629.335L631.507 627.519L624.389 620.453L610.813 617.869L593.629 619.484L592.987 611.651L593.026 601.658L593.808 588.354L599.665 577.897L599.484 575.898L598.341 573.98L596.556 572.265L586.149 569.378L583.101 567.863L579.07 564.552L573.978 561.08L569.546 558.678L562.587 555.508L556.171 553.753L552.4 555.084L548.932 556.781L545.684 556.821L542.435 555.892L530.403 547.958L512.236 534.231L497.839 524.621L488.795 520.018L486.649 518.545L481.576 514.225L469.103 502.556L460.822 504.272L448.991 496.681L438.364 489.252L435.958 487.233L423.866 473.465L411.794 464.522L398.64 454.751L390.138 448.614L375.72 438.197L368.662 431.899L366.275 429.577L363.95 425.115L360.179 403.252L355.848 393.199L349.672 387.727L344.419 377.169L340.047 361.483L336.438 351.268L333.57 346.544L327.795 341.316L319.032 335.583L310.73 332.857L307.742 332.958L306.259 333.665L304.575 334.634L301.286 338.913L296.434 339.357L292.864 339.257L289.536 337.722L279.027 336.37L275.298 334.876L268.982 335.098L255.406 337.319L252.098 336.915L237.76 327.345L231.524 323.55L230.281 321.451L230.341 317.776L232.446 312.568L234.251 308.874L233.45 305.038L230.721 300.839V296.358L232.587 293.854L236.397 294.641L237.76 293.067L237.279 290.685L235.213 288.989L232.467 285.173L224.345 281.62L223.182 280.167L223.603 278.512L225.007 276.735L225.287 272.98L225.428 268.135L226.511 265.611L226.811 263.633L225.629 262.038L222.881 260.181L218.49 255.679L213.096 255.195L195.55 255.356L190.116 253.539L185.745 251.016L181.373 241.406L179.167 239.125L177.101 238.176L172.189 237.853L166.274 236.925L163.246 235.289L154.984 226.487L147.044 218.614L143.855 226.044L140.768 227.517L133.769 226.831L128.515 225.579L125.528 227.255L122.44 230.182L123.021 232.12L125.387 234.159L130.139 237.934L137.419 247.16L140.727 252.247L141.208 254.024L140.586 255.356L139.604 255.921L138.161 255.901L136.216 255.881L135.092 254.367L134.712 251.742L132.285 247.765L129.778 245.464L127.032 244.031L123.181 242.961L118.108 241.063L115.481 240.982L112.935 243.183L110.809 246.15L109.546 252.631L105.756 260.585L103.43 263.714L96.2104 265.611L79.0857 266.257L73.9735 268.741L70.4841 271.729L64.0073 281.398L59.4948 284.608L55.5844 289.029L56.7679 303.201L58.6527 319.694L61.9414 324.257L64.0269 325.63L64.3071 327.245L62.9645 328.678L61.2401 330.475L58.6332 333.766L55.7056 333.644L49.8101 332.817L44.8974 331.929L28.3736 330.98L14.9793 330.212L0.100359 329.364L0.0807771 312.084V294.742V277.34L0.0599709 259.878V242.335V224.731L0.0403886 207.067V189.342V171.556V153.69L0.0195823 135.763V117.756V99.6675L0 81.5183V63.3094V45.0191L7.01782 42.758L15.8813 39.8711L24.3837 37.1258L34.5102 33.8347L45.9193 30.1203L55.6652 26.9512L67.2959 23.1758L76.1581 20.2889L84.4806 17.5836L95.1285 14.3535L111.691 9.34722L120.936 6.54096L130.28 3.71498L139.183 1.00976L145.138 0L151.535 3.85607L159.316 9.14514L167.096 14.4342L174.876 19.7239L182.657 25.013L190.437 30.2817L198.217 35.5511L205.998 40.8198L213.778 46.0689L221.558 51.3179L229.338 56.5663L237.119 61.795L244.899 67.0237L252.679 72.2524L260.46 77.4608L268.24 82.6692L276.02 87.8775L283.239 92.723L286.487 96.316L288.271 104.23L291.861 110.508L298.098 117.291L304.475 124.236L312.415 133.381L317.909 139.72L323.504 146.18L332.767 156.819L338.543 163.441L343.135 163.663L352.46 162.088L364.931 159.989L374.778 158.313L386.689 156.294L398.038 154.376L406.982 152.842L420.376 153.993L433.591 155.143L443.076 155.971L452.36 156.779L463.368 157.728L469.524 158.253L476.584 158.858L479.55 157.263L485.627 153.993L491.362 150.924L497.318 147.715L502.591 146.099L508.086 151.207L512.678 157.102L517.51 163.3L523.104 169.255L528.538 172.788L535.818 177.573L540.008 185.728L545.603 196.609L549.293 203.756L553.082 211.084L558.597 208.197L564.473 205.108L569.807 202.302L569.164 211.367L568.604 219.583L567.7 231.999L566.979 242.133L565.054 254.205L564.914 263.39L564.794 271.446L564.713 277.825L575.04 278.107L582.68 278.31L592.244 278.572L593.167 286.566L594.451 297.791L596.396 307.925L598.039 316.424L600.486 327.386L601.81 333.241L604.095 340.125L606.362 341.78L609.991 342.87L622.624 342.042L633.092 341.356L641.353 340.831L650.136 340.266L661.786 339.499L665.737 341.255L669.145 340.024L673.075 338.792L676.204 343.779L677.788 346.302L680.014 348.926L683.022 351.369L681.759 356.477L679.894 363.926L679.372 367.741L683.001 371.86L685.708 374.262L693.108 379.148L700.066 381.873L704.598 382.68L708.929 381.631L710.513 378.865L710.113 375.049L708.027 371.032L708.188 366.247L709.571 362.755L714.002 356.396L718.193 350.38L724.61 344.243L732.251 338.166L735.418 333.725L736.642 325.993L741.634 321.612L747.029 318.988L753.726 316.707L755.571 312.831L764.815 306.25L770.349 302.999L777.347 301.102L787.013 296.822L794.653 291.775L801.972 282.266L807.787 276.028L812.68 272.192L816.79 272.051L819.678 275.16L822.164 275.423L823.788 274.009L826.555 270.012L829.523 265.349L832.311 263.411L837.705 262.421L842.699 259.333ZM826.134 358.375L825.935 356.558L824.19 353.509L821.583 351.793L820.339 352.54L821.403 355.023L824.431 358.556L826.134 358.375ZM857.296 435.755L854.469 436.421L849.295 436.32L846.347 435.553L848.152 429.577L848.212 428.386L847.992 428.224L846.509 427.417L844.263 424.974L843.481 421.36L844.362 418.009L846.007 416.616L847.05 416.859L850.218 421.966L853.045 423.46L858.559 424.308L855.772 429.355L857.838 434.745L857.296 435.755ZM889.56 431.515L888.056 434.684L885.41 433.917L883.325 431.818L884.006 430.162L887.114 429.254L888.738 428.346L890.101 428.184L889.56 431.515Z"
                      fill="#DD0802"
                    />
                    {ids.includes("12") && (
                      <path
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={(e) => handleMouseEnter(e, "12")}
                        id={"12"}
                        d="M778.999 314.835C777.452 314.835 775.969 314.22 774.875 313.126C773.781 312.032 773.166 310.548 773.166 309.001C773.166 307.454 773.781 305.97 774.875 304.877C775.969 303.783 777.452 303.168 778.999 303.168C780.546 303.168 782.03 303.783 783.124 304.877C784.218 305.97 784.833 307.454 784.833 309.001C784.833 309.767 784.682 310.526 784.389 311.234C784.095 311.941 783.666 312.584 783.124 313.126C782.582 313.668 781.939 314.097 781.232 314.391C780.524 314.684 779.765 314.835 778.999 314.835ZM778.999 292.668C774.667 292.668 770.513 294.389 767.45 297.452C764.387 300.515 762.666 304.669 762.666 309.001C762.666 321.251 778.999 339.335 778.999 339.335C778.999 339.335 795.333 321.251 795.333 309.001C795.333 304.669 793.612 300.515 790.549 297.452C787.486 294.389 783.331 292.668 778.999 292.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("7") && (
                      <path
                        id={"7"}
                        d="M464.999 248.835C463.452 248.835 461.969 248.22 460.875 247.126C459.781 246.032 459.166 244.548 459.166 243.001C459.166 241.454 459.781 239.97 460.875 238.877C461.969 237.783 463.452 237.168 464.999 237.168C466.546 237.168 468.03 237.783 469.124 238.877C470.218 239.97 470.833 241.454 470.833 243.001C470.833 243.767 470.682 244.526 470.389 245.234C470.095 245.941 469.666 246.584 469.124 247.126C468.582 247.668 467.939 248.097 467.232 248.391C466.524 248.684 465.765 248.835 464.999 248.835ZM464.999 226.668C460.667 226.668 456.513 228.389 453.45 231.452C450.387 234.515 448.666 238.669 448.666 243.001C448.666 255.251 464.999 273.335 464.999 273.335C464.999 273.335 481.333 255.251 481.333 243.001C481.333 238.669 479.612 234.515 476.549 231.452C473.486 228.389 469.331 226.668 464.999 226.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("14") && (
                      <path
                        className="path-14"
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={(e) => handleMouseEnter(e, "14")}
                        id={"14"}
                        d="M285.999 302.835C284.452 302.835 282.969 302.22 281.875 301.126C280.781 300.032 280.166 298.548 280.166 297.001C280.166 295.454 280.781 293.97 281.875 292.877C282.969 291.783 284.452 291.168 285.999 291.168C287.546 291.168 289.03 291.783 290.124 292.877C291.218 293.97 291.833 295.454 291.833 297.001C291.833 297.767 291.682 298.526 291.389 299.234C291.095 299.941 290.666 300.584 290.124 301.126C289.582 301.668 288.939 302.097 288.232 302.391C287.524 302.684 286.765 302.835 285.999 302.835ZM285.999 280.668C281.667 280.668 277.513 282.389 274.45 285.452C271.387 288.515 269.666 292.669 269.666 297.001C269.666 309.251 285.999 327.335 285.999 327.335C285.999 327.335 302.333 309.251 302.333 297.001C302.333 292.669 300.612 288.515 297.549 285.452C294.486 282.389 290.331 280.668 285.999 280.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("qoraqalpoq") && (
                      <path
                        id={"qoraqalpoq"}
                        d="M176.999 143.835C175.452 143.835 173.969 143.22 172.875 142.126C171.781 141.032 171.166 139.548 171.166 138.001C171.166 136.454 171.781 134.97 172.875 133.877C173.969 132.783 175.452 132.168 176.999 132.168C178.546 132.168 180.03 132.783 181.124 133.877C182.218 134.97 182.833 136.454 182.833 138.001C182.833 138.767 182.682 139.526 182.389 140.234C182.095 140.941 181.666 141.584 181.124 142.126C180.582 142.668 179.939 143.097 179.232 143.391C178.524 143.684 177.765 143.835 176.999 143.835ZM176.999 121.668C172.667 121.668 168.513 123.389 165.45 126.452C162.387 129.515 160.666 133.669 160.666 138.001C160.666 150.251 176.999 168.335 176.999 168.335C176.999 168.335 193.333 150.251 193.333 138.001C193.333 133.669 191.612 129.515 188.549 126.452C185.486 123.389 181.331 121.668 176.999 121.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("2") && (
                      <path
                        id={"2"}
                        d="M421.999 371.835C420.452 371.835 418.969 371.22 417.875 370.126C416.781 369.032 416.166 367.548 416.166 366.001C416.166 364.454 416.781 362.97 417.875 361.877C418.969 360.783 420.452 360.168 421.999 360.168C423.546 360.168 425.03 360.783 426.124 361.877C427.218 362.97 427.833 364.454 427.833 366.001C427.833 366.767 427.682 367.526 427.389 368.234C427.095 368.941 426.666 369.584 426.124 370.126C425.582 370.668 424.939 371.097 424.232 371.391C423.524 371.684 422.765 371.835 421.999 371.835ZM421.999 349.668C417.667 349.668 413.513 351.389 410.45 354.452C407.387 357.515 405.666 361.669 405.666 366.001C405.666 378.251 421.999 396.335 421.999 396.335C421.999 396.335 438.333 378.251 438.333 366.001C438.333 361.669 436.612 357.515 433.549 354.452C430.486 351.389 426.331 349.668 421.999 349.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("3") && (
                      <path
                        id={"3"}
                        d="M877.999 379.835C876.452 379.835 874.969 379.22 873.875 378.126C872.781 377.032 872.166 375.548 872.166 374.001C872.166 372.454 872.781 370.97 873.875 369.877C874.969 368.783 876.452 368.168 877.999 368.168C879.546 368.168 881.03 368.783 882.124 369.877C883.218 370.97 883.833 372.454 883.833 374.001C883.833 374.767 883.682 375.526 883.389 376.234C883.095 376.941 882.666 377.584 882.124 378.126C881.582 378.668 880.939 379.097 880.232 379.391C879.524 379.684 878.765 379.835 877.999 379.835ZM877.999 357.668C873.667 357.668 869.513 359.389 866.45 362.452C863.387 365.515 861.666 369.669 861.666 374.001C861.666 386.251 877.999 404.335 877.999 404.335C877.999 404.335 894.333 386.251 894.333 374.001C894.333 369.669 892.612 365.515 889.549 362.452C886.486 359.389 882.331 357.668 877.999 357.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("6") && (
                      <path
                        id={"6"}
                        d="M885.999 323.835C884.452 323.835 882.969 323.22 881.875 322.126C880.781 321.032 880.166 319.548 880.166 318.001C880.166 316.454 880.781 314.97 881.875 313.877C882.969 312.783 884.452 312.168 885.999 312.168C887.546 312.168 889.03 312.783 890.124 313.877C891.218 314.97 891.833 316.454 891.833 318.001C891.833 318.767 891.682 319.526 891.389 320.234C891.095 320.941 890.666 321.584 890.124 322.126C889.582 322.668 888.939 323.097 888.232 323.391C887.524 323.684 886.765 323.835 885.999 323.835ZM885.999 301.668C881.667 301.668 877.513 303.389 874.45 306.452C871.387 309.515 869.666 313.669 869.666 318.001C869.666 330.251 885.999 348.335 885.999 348.335C885.999 348.335 902.333 330.251 902.333 318.001C902.333 313.669 900.612 309.515 897.549 306.452C894.486 303.389 890.331 301.668 885.999 301.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("1") && (
                      <path
                        id={"1"}
                        d="M937.999 346.835C936.452 346.835 934.969 346.22 933.875 345.126C932.781 344.032 932.166 342.548 932.166 341.001C932.166 339.454 932.781 337.97 933.875 336.877C934.969 335.783 936.452 335.168 937.999 335.168C939.546 335.168 941.03 335.783 942.124 336.877C943.218 337.97 943.833 339.454 943.833 341.001C943.833 341.767 943.682 342.526 943.389 343.234C943.095 343.941 942.666 344.584 942.124 345.126C941.582 345.668 940.939 346.097 940.232 346.391C939.524 346.684 938.765 346.835 937.999 346.835ZM937.999 324.668C933.667 324.668 929.513 326.389 926.45 329.452C923.387 332.515 921.666 336.669 921.666 341.001C921.666 353.251 937.999 371.335 937.999 371.335C937.999 371.335 954.333 353.251 954.333 341.001C954.333 336.669 952.612 332.515 949.549 329.452C946.486 326.389 942.331 324.668 937.999 324.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("4") && (
                      <path
                        id={"4"}
                        d="M653.999 386.835C652.452 386.835 650.969 386.22 649.875 385.126C648.781 384.032 648.166 382.548 648.166 381.001C648.166 379.454 648.781 377.97 649.875 376.877C650.969 375.783 652.452 375.168 653.999 375.168C655.546 375.168 657.03 375.783 658.124 376.877C659.218 377.97 659.833 379.454 659.833 381.001C659.833 381.767 659.682 382.526 659.389 383.234C659.095 383.941 658.666 384.584 658.124 385.126C657.582 385.668 656.939 386.097 656.232 386.391C655.524 386.684 654.765 386.835 653.999 386.835ZM653.999 364.668C649.667 364.668 645.513 366.389 642.45 369.452C639.387 372.515 637.666 376.669 637.666 381.001C637.666 393.251 653.999 411.335 653.999 411.335C653.999 411.335 670.333 393.251 670.333 381.001C670.333 376.669 668.612 372.515 665.549 369.452C662.486 366.389 658.331 364.668 653.999 364.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("10") && (
                      <path
                        id={"10"}
                        d="M734.999 365.835C733.452 365.835 731.969 365.22 730.875 364.126C729.781 363.032 729.166 361.548 729.166 360.001C729.166 358.454 729.781 356.97 730.875 355.877C731.969 354.783 733.452 354.168 734.999 354.168C736.546 354.168 738.03 354.783 739.124 355.877C740.218 356.97 740.833 358.454 740.833 360.001C740.833 360.767 740.682 361.526 740.389 362.234C740.095 362.941 739.666 363.584 739.124 364.126C738.582 364.668 737.939 365.097 737.232 365.391C736.524 365.684 735.765 365.835 734.999 365.835ZM734.999 343.668C730.667 343.668 726.513 345.389 723.45 348.452C720.387 351.515 718.666 355.669 718.666 360.001C718.666 372.251 734.999 390.335 734.999 390.335C734.999 390.335 751.333 372.251 751.333 360.001C751.333 355.669 749.612 351.515 746.549 348.452C743.486 345.389 739.331 343.668 734.999 343.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("9") && (
                      <path
                        id={"9"}
                        d="M572.999 430.835C571.452 430.835 569.969 430.22 568.875 429.126C567.781 428.032 567.166 426.548 567.166 425.001C567.166 423.454 567.781 421.97 568.875 420.877C569.969 419.783 571.452 419.168 572.999 419.168C574.546 419.168 576.03 419.783 577.124 420.877C578.218 421.97 578.833 423.454 578.833 425.001C578.833 425.767 578.682 426.526 578.389 427.234C578.095 427.941 577.666 428.584 577.124 429.126C576.582 429.668 575.939 430.097 575.232 430.391C574.524 430.684 573.765 430.835 572.999 430.835ZM572.999 408.668C568.667 408.668 564.513 410.389 561.45 413.452C558.387 416.515 556.666 420.669 556.666 425.001C556.666 437.251 572.999 455.335 572.999 455.335C572.999 455.335 589.333 437.251 589.333 425.001C589.333 420.669 587.612 416.515 584.549 413.452C581.486 410.389 577.331 408.668 572.999 408.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("8") && (
                      <path
                        id={"8"}
                        d="M556.999 508.835C555.452 508.835 553.969 508.22 552.875 507.126C551.781 506.032 551.166 504.548 551.166 503.001C551.166 501.454 551.781 499.97 552.875 498.877C553.969 497.783 555.452 497.168 556.999 497.168C558.546 497.168 560.03 497.783 561.124 498.877C562.218 499.97 562.833 501.454 562.833 503.001C562.833 503.767 562.682 504.526 562.389 505.234C562.095 505.941 561.666 506.584 561.124 507.126C560.582 507.668 559.939 508.097 559.232 508.391C558.524 508.684 557.765 508.835 556.999 508.835ZM556.999 486.668C552.667 486.668 548.513 488.389 545.45 491.452C542.387 494.515 540.666 498.669 540.666 503.001C540.666 515.251 556.999 533.335 556.999 533.335C556.999 533.335 573.333 515.251 573.333 503.001C573.333 498.669 571.612 494.515 568.549 491.452C565.486 488.389 561.331 486.668 556.999 486.668Z"
                        fill="white"
                      />
                    )}
                    {ids.includes("11") && (
                      <path
                        id={"11"}
                        d="M641.999 545.835C640.452 545.835 638.969 545.22 637.875 544.126C636.781 543.032 636.166 541.548 636.166 540.001C636.166 538.454 636.781 536.97 637.875 535.877C638.969 534.783 640.452 534.168 641.999 534.168C643.546 534.168 645.03 534.783 646.124 535.877C647.218 536.97 647.833 538.454 647.833 540.001C647.833 540.767 647.682 541.526 647.389 542.234C647.095 542.941 646.666 543.584 646.124 544.126C645.582 544.668 644.939 545.097 644.232 545.391C643.524 545.684 642.765 545.835 641.999 545.835ZM641.999 523.668C637.667 523.668 633.513 525.389 630.45 528.452C627.387 531.515 625.666 535.669 625.666 540.001C625.666 552.251 641.999 570.335 641.999 570.335C641.999 570.335 658.333 552.251 658.333 540.001C658.333 535.669 656.612 531.515 653.549 528.452C650.486 525.389 646.331 523.668 641.999 523.668Z"
                        fill="white"
                      />
                    )}
                  </svg>
                </div>
              </div>
              <div className="contact-row__col">
                <ul className="contact-section__city">
                  <li className="contact-section__subtitle">{t("Города")}:</li>
                  {contacts.map((contact, a) => {
                    return (
                      <li onClick={() => setActiveItem(contact)} key={a}>
                        <div
                          className={`contact-section__link ${
                            activeItem.id === contact.id ? "--active" : ""
                          }`}
                        >
                          {get(contact, `region.name_${currentLangCode}`)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Spinner md position={"center"} />
      )}
    </div>
  );
};

export default Index;