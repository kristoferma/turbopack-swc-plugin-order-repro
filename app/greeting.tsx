'use client';

import { Trans } from '@lingui/react/macro';

export function Greeting({ name }: { name: string }) {
    return (
        <div>
            <p>
                <Trans>
                    Hello <b>{name}</b>
                </Trans>
            </p>
            <p>
                {/* Static child elements: the React Compiler hoists these into memoized temporaries. */}
                <Trans>
                    An asterisk matches any characters.
                    <br />
                    For example <em>s*n</em> matches sun and season.
                </Trans>
            </p>
        </div>
    );
}
