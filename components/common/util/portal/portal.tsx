import React, { ReactNode, ReactPortal, useEffect, useState } from 'react';
import { isBrowser } from '../../../../libs/environment';
import { addRootElement } from '../../../../libs/element';
import { createPortal } from 'react-dom';

interface Props {
  id: string;
  children: ReactNode;
}

function Portal({ id, children }: Props): ReactPortal | null {
  const [isInit, setIsInit] = useState(false);
  const portalContainerElement = isBrowser() && document.getElementById(id);

  useEffect(() => {
    addRootElement(id);
    setIsInit(true);
  }, [id]);

  return portalContainerElement && isInit ? createPortal(children, portalContainerElement) : null;
}

export default Portal;
