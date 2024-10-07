import React from 'react';

import VisibilitySensor from "react-visibility-sensor";
import {withTranslation} from "react-i18next";
import { Spinner } from "../index";
const LoadMoreVisible = ({ setPage = () => {}, t }) => {
  return (
    <VisibilitySensor
      offset={{ bottom: -250 }}
      partialVisibility
      onChange={(isVisible) => {
        if(isVisible){
          setPage();
        }
      }}
    >
      {() => (
          <div className='mt-30 d-flex justify-content-center'>
              <div onClick={setPage}>
                  <Spinner position={'center'} md/>
              </div>
          </div>
      )}
    </VisibilitySensor>
  );
};

export default withTranslation('main')(LoadMoreVisible);
