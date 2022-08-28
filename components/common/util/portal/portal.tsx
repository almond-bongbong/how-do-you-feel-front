import { ReactNode, ReactPortal, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { isBrowser } from '@src/libs/environment';
import { addRootElementOrCreate } from '@src/libs/element';

interface Props {
  id: string;
  children: ReactNode;
}

function Portal({ id, children }: Props): ReactPortal | null {
  const [isInit, setIsInit] = useState(false);
  const portalContainerElement = isBrowser() && document.getElementById(id);

  useEffect(() => {
    addRootElementOrCreate(id);
    setIsInit(true);
  }, [id]);

  return portalContainerElement && isInit ? createPortal(children, portalContainerElement) : null;
}

export default Portal;
