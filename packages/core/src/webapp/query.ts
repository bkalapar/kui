/*
 * Copyright 2018 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { inBrowser } from '../core/capabilities'

import Debug from 'debug'

const debug = Debug('webapp/query')
debug('loading')

export const init = async () => {
  debug('init')

  if (inBrowser()) {
    const windowQuery = window.location.search
    if (windowQuery) {
      // parse and extract the question mark in window.location.search
      // e.g. query = { exec: 'action list', namespace: 123@ibm.com_cloudshella }
      const query = require('querystring').parse(windowQuery.substring(1))

      if (query.command) {
        // execute ?command=<command>
        const { pexec } = await import('../repl/exec')
        const queryExec = () => pexec(query.command)

        queryExec()
      }
    }
  }

  debug('init done')
}
