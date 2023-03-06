(function (root) {
  var exports = undefined,
      module = undefined,
      require = undefined;
  var define = undefined;
  var self = root,
      window = root,
      global = root,
      globalThis = root;
  (function () {
    (function (t) {
      function e(t) {
        m.debug && console.log("Graph created"), this.list_of_graphcanvas = null, this.clear(), t && this.configure(t);
      }

      function i(t, e, i, s, o, n) {
        this.id = t, this.type = e, this.origin_id = i, this.origin_slot = s, this.target_id = o, this.target_slot = n, this._data = null, this._pos = new Float32Array(2);
      }

      function s(t) {
        this._ctor(t);
      }

      function o(t) {
        this._ctor(t);
      }

      function n(t, e) {
        this.offset = new Float32Array([0, 0]), this.scale = 1, this.max_scale = 10, this.min_scale = .1, this.onredraw = null, this.enabled = !0, this.last_mouse = [0, 0], this.element = null, this.visible_area = new Float32Array(4), t && (this.element = t, e || this.bindEvents(t));
      }

      function r(t, e, i) {
        this.options = i = i || {}, this.background_image = r.DEFAULT_BACKGROUND_IMAGE, t && t.constructor === String && (t = document.querySelector(t)), this.ds = new n(), this.zoom_modify_alpha = !0, this.title_text_font = m.NODE_TEXT_SIZE + "px Arial", this.inner_text_font = "normal " + m.NODE_SUBTEXT_SIZE + "px Arial", this.node_title_color = m.NODE_TITLE_COLOR, this.default_link_color = m.LINK_COLOR, this.default_connection_color = {
          input_off: "#778",
          input_on: "#7F7",
          output_off: "#778",
          output_on: "#7F7"
        }, this.default_connection_color_byType = {}, this.default_connection_color_byTypeOff = {}, this.highquality_render = !0, this.use_gradients = !1, this.editor_alpha = 1, this.pause_rendering = !1, this.clear_background = !0, this.read_only = !1, this.render_only_selected = !0, this.live_mode = !1, this.show_info = !0, this.allow_dragcanvas = !0, this.allow_dragnodes = !0, this.allow_interaction = !0, this.allow_searchbox = !0, this.allow_reconnect_links = !0, this.align_to_grid = !1, this.drag_mode = !1, this.dragging_rectangle = null, this.filter = null, this.set_canvas_dirty_on_mouse_event = !0, this.always_render_background = !1, this.render_shadows = !0, this.render_canvas_border = !0, this.render_connections_shadows = !1, this.render_connections_border = !0, this.render_curved_connections = !1, this.render_connection_arrows = !1, this.render_collapsed_slots = !0, this.render_execution_order = !1, this.render_title_colored = !0, this.render_link_tooltip = !0, this.links_render_mode = m.SPLINE_LINK, this.mouse = [0, 0], this.graph_mouse = [0, 0], this.canvas_mouse = this.graph_mouse, this.onSearchBox = null, this.onSearchBoxSelection = null, this.onMouse = null, this.onDrawBackground = null, this.onDrawForeground = null, this.onDrawOverlay = null, this.onDrawLinkTooltip = null, this.onNodeMoved = null, this.onSelectionChange = null, this.onConnectingChange = null, this.onBeforeChange = null, this.onAfterChange = null, this.connections_width = 3, this.round_radius = 8, this.current_node = null, this.node_widget = null, this.over_link_center = null, this.last_mouse_position = [0, 0], this.visible_area = this.ds.visible_area, this.visible_links = [], this.viewport = i.viewport || null, e && e.attachCanvas(this), this.setCanvas(t, i.skip_events), this.clear(), i.skip_render || this.startRendering(), this.autoresize = i.autoresize;
      }

      function a(t, e) {
        for (var i in t) if (t[i] != e[i]) return !1;

        return !0;
      }

      function u(t, e) {
        return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
      }

      function h(t) {
        return "rgba(" + Math.round(255 * t[0]).toFixed() + "," + Math.round(255 * t[1]).toFixed() + "," + Math.round(255 * t[2]).toFixed() + "," + (4 == t.length ? t[3].toFixed(2) : "1.0") + ")";
      }

      function p(t, e, i, s, o, n) {
        return i < t && i + o > t && s < e && s + n > e;
      }

      function l(t, e, i) {
        e < t[0] ? t[0] = e : e > t[2] && (t[2] = e), i < t[1] ? t[1] = i : i > t[3] && (t[3] = i);
      }

      function d(t, e) {
        return !(t[0] < e[0][0] || t[1] < e[0][1] || t[0] > e[1][0] || t[1] > e[1][1]);
      }

      function c(t, e) {
        var i = t[0] + t[2],
            s = t[1] + t[3],
            o = e[0] + e[2],
            n = e[1] + e[3];
        return !(t[0] > o || t[1] > n || i < e[0] || s < e[1]);
      }

      function _(t) {
        "#" == t.charAt(0) && (t = t.slice(1)), t = t.toUpperCase();

        for (var e, i, s = "0123456789ABCDEF", o = new Array(3), n = 0, r = 0; r < 6; r += 2) e = s.indexOf(t.charAt(r)), i = s.indexOf(t.charAt(r + 1)), o[n] = 16 * e + i, n++;

        return o;
      }

      function g(t) {
        for (var e, i, s = "0123456789ABCDEF", o = "#", n = 0; n < 3; n++) e = t[n] / 16, i = t[n] % 16, o += s.charAt(e) + s.charAt(i);

        return o;
      }

      function f(t, e) {
        function i(t) {
          var i = parseInt(n.style.top);
          return n.style.top = (i + t.deltaY * e.scroll_speed).toFixed() + "px", t.preventDefault(), !0;
        }

        e = e || {}, this.options = e;
        var s = this;
        e.parentMenu && (e.parentMenu.constructor !== this.constructor ? (console.error("parentMenu must be of class ContextMenu, ignoring it"), e.parentMenu = null) : (this.parentMenu = e.parentMenu, this.parentMenu.lock = !0, this.parentMenu.current_submenu = this));
        var o = null;
        e.event && (o = e.event.constructor.name), "MouseEvent" !== o && "CustomEvent" !== o && "PointerEvent" !== o && (console.error("Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it. (" + o + ")"), e.event = null);
        var n = document.createElement("div");

        if (n.className = "litegraph litecontextmenu litemenubar-panel", e.className && (n.className += " " + e.className), n.style.minWidth = 100, n.style.minHeight = 100, n.style.pointerEvents = "none", setTimeout(function () {
          n.style.pointerEvents = "auto";
        }, 100), m.pointerListenerAdd(n, "up", function (t) {
          return t.preventDefault(), !0;
        }, !0), n.addEventListener("contextmenu", function (t) {
          return 2 == t.button && (t.preventDefault(), !1);
        }, !0), m.pointerListenerAdd(n, "down", function (t) {
          if (2 == t.button) return s.close(), t.preventDefault(), !0;
        }, !0), e.scroll_speed || (e.scroll_speed = .1), n.addEventListener("wheel", i, !0), n.addEventListener("mousewheel", i, !0), this.root = n, e.title) {
          var r = document.createElement("div");
          r.className = "litemenu-title", r.innerHTML = e.title, n.appendChild(r);
        }

        for (var a = 0; a < t.length; a++) {
          var u = t.constructor == Array ? t[a] : a;
          null != u && u.constructor !== String && (u = void 0 === u.content ? String(u) : u.content);
          var h = t[a];
          this.addItem(u, h, e), 0;
        }

        m.pointerListenerAdd(n, "enter", function (t) {
          n.closing_timer && clearTimeout(n.closing_timer);
        });
        var p = document;
        e.event && (p = e.event.target.ownerDocument), p || (p = document), p.fullscreenElement ? p.fullscreenElement.appendChild(n) : p.body.appendChild(n);
        var l = e.left || 0,
            d = e.top || 0;

        if (e.event) {
          if (l = e.event.clientX - 10, d = e.event.clientY - 10, e.title && (d -= 20), e.parentMenu) {
            var c = e.parentMenu.root.getBoundingClientRect();
            l = c.left + c.width;
          }

          var _ = document.body.getBoundingClientRect(),
              g = n.getBoundingClientRect();

          0 == _.height && console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }"), _.width && l > _.width - g.width - 10 && (l = _.width - g.width - 10), _.height && d > _.height - g.height - 10 && (d = _.height - g.height - 10);
        }

        n.style.left = l + "px", n.style.top = d + "px", e.scale && (n.style.transform = "scale(" + e.scale + ")");
      }

      function v(t) {
        this.points = t, this.selected = -1, this.nearest = -1, this.size = null, this.must_update = !0, this.margin = 5;
      }

      var m = t.LiteGraph = {
        VERSION: .4,
        CANVAS_GRID_SIZE: 10,
        NODE_TITLE_HEIGHT: 30,
        NODE_TITLE_TEXT_Y: 20,
        NODE_SLOT_HEIGHT: 20,
        NODE_WIDGET_HEIGHT: 20,
        NODE_WIDTH: 140,
        NODE_MIN_WIDTH: 50,
        NODE_COLLAPSED_RADIUS: 10,
        NODE_COLLAPSED_WIDTH: 80,
        NODE_TITLE_COLOR: "#999",
        NODE_SELECTED_TITLE_COLOR: "#FFF",
        NODE_TEXT_SIZE: 14,
        NODE_TEXT_COLOR: "#AAA",
        NODE_SUBTEXT_SIZE: 12,
        NODE_DEFAULT_COLOR: "#333",
        NODE_DEFAULT_BGCOLOR: "#353535",
        NODE_DEFAULT_BOXCOLOR: "#666",
        NODE_DEFAULT_SHAPE: "box",
        NODE_BOX_OUTLINE_COLOR: "#FFF",
        DEFAULT_SHADOW_COLOR: "rgba(0,0,0,0.5)",
        DEFAULT_GROUP_FONT: 24,
        WIDGET_BGCOLOR: "#222",
        WIDGET_OUTLINE_COLOR: "#666",
        WIDGET_TEXT_COLOR: "#DDD",
        WIDGET_SECONDARY_TEXT_COLOR: "#999",
        LINK_COLOR: "#9A9",
        EVENT_LINK_COLOR: "#A86",
        CONNECTING_LINK_COLOR: "#AFA",
        MAX_NUMBER_OF_NODES: 1e3,
        DEFAULT_POSITION: [100, 100],
        VALID_SHAPES: ["default", "box", "round", "card"],
        BOX_SHAPE: 1,
        ROUND_SHAPE: 2,
        CIRCLE_SHAPE: 3,
        CARD_SHAPE: 4,
        ARROW_SHAPE: 5,
        GRID_SHAPE: 6,
        INPUT: 1,
        OUTPUT: 2,
        EVENT: -1,
        ACTION: -1,
        NODE_MODES: ["Always", "On Event", "Never", "On Trigger"],
        NODE_MODES_COLORS: ["#666", "#422", "#333", "#224", "#626"],
        ALWAYS: 0,
        ON_EVENT: 1,
        NEVER: 2,
        ON_TRIGGER: 3,
        UP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4,
        CENTER: 5,
        LINK_RENDER_MODES: ["Straight", "Linear", "Spline"],
        STRAIGHT_LINK: 0,
        LINEAR_LINK: 1,
        SPLINE_LINK: 2,
        NORMAL_TITLE: 0,
        NO_TITLE: 1,
        TRANSPARENT_TITLE: 2,
        AUTOHIDE_TITLE: 3,
        VERTICAL_LAYOUT: "vertical",
        proxy: null,
        node_images_path: "",
        debug: !1,
        catch_exceptions: !0,
        throw_errors: !0,
        allow_scripts: !1,
        registered_node_types: {},
        node_types_by_file_extension: {},
        Nodes: {},
        Globals: {},
        searchbox_extras: {},
        auto_sort_node_types: !1,
        node_box_coloured_when_on: !1,
        node_box_coloured_by_mode: !1,
        dialog_close_on_mouse_leave: !0,
        dialog_close_on_mouse_leave_delay: 500,
        shift_click_do_break_link_from: !1,
        click_do_break_link_to: !1,
        search_hide_on_mouse_leave: !0,
        search_filter_enabled: !1,
        search_show_all_on_open: !0,
        auto_load_slot_types: !1,
        registered_slot_in_types: {},
        registered_slot_out_types: {},
        slot_types_in: [],
        slot_types_out: [],
        slot_types_default_in: [],
        slot_types_default_out: [],
        alt_drag_do_clone_nodes: !1,
        do_add_triggers_slots: !1,
        allow_multi_output_for_events: !0,
        middle_click_slot_add_default_node: !1,
        release_link_on_empty_shows_menu: !1,
        pointerevents_method: "mouse",
        registerNodeType: function (t, e) {
          if (!e.prototype) throw "Cannot register a simple object, it must be a class with a prototype";
          e.type = t, m.debug && console.log("Node registered: " + t);
          t.split("/");
          var i = e.name,
              o = t.lastIndexOf("/");
          if (e.category = t.substr(0, o), e.title || (e.title = i), e.prototype) for (var n in s.prototype) e.prototype[n] || (e.prototype[n] = s.prototype[n]);
          var r = this.registered_node_types[t];
          if (r) console.log("replacing node type: " + t);else if (Object.hasOwnProperty(e.prototype, "shape") || Object.defineProperty(e.prototype, "shape", {
            set: function (t) {
              switch (t) {
                case "default":
                  delete this._shape;
                  break;

                case "box":
                  this._shape = m.BOX_SHAPE;
                  break;

                case "round":
                  this._shape = m.ROUND_SHAPE;
                  break;

                case "circle":
                  this._shape = m.CIRCLE_SHAPE;
                  break;

                case "card":
                  this._shape = m.CARD_SHAPE;
                  break;

                default:
                  this._shape = t;
              }
            },
            get: function (t) {
              return this._shape;
            },
            enumerable: !0,
            configurable: !0
          }), e.prototype.onPropertyChange && console.warn("LiteGraph node class " + t + " has onPropertyChange method, it must be called onPropertyChanged with d at the end"), e.supported_extensions) for (var n in e.supported_extensions) {
            var a = e.supported_extensions[n];
            a && a.constructor === String && (this.node_types_by_file_extension[a.toLowerCase()] = e);
          }
          if (this.registered_node_types[t] = e, e.constructor.name && (this.Nodes[i] = e), m.onNodeTypeRegistered && m.onNodeTypeRegistered(t, e), r && m.onNodeTypeReplaced && m.onNodeTypeReplaced(t, e, r), e.prototype.onPropertyChange && console.warn("LiteGraph node class " + t + " has onPropertyChange method, it must be called onPropertyChanged with d at the end"), e.supported_extensions) for (n = 0; n < e.supported_extensions.length; n++) {
            a = e.supported_extensions[n];
            a && a.constructor === String && (this.node_types_by_file_extension[a.toLowerCase()] = e);
          }
          this.auto_load_slot_types && (nodeTmp = new e(e.title || "tmpnode"));
        },
        unregisterNodeType: function (t) {
          var e = t.constructor === String ? this.registered_node_types[t] : t;
          if (!e) throw "node type not found: " + t;
          delete this.registered_node_types[e.type], e.constructor.name && delete this.Nodes[e.constructor.name];
        },
        registerNodeAndSlotType: function (t, e, i) {
          i = i || !1;
          var s = t.constructor === String && "anonymous" !== this.registered_node_types[t] ? this.registered_node_types[t] : t,
              o = s.constructor.type;
          if ("string" == typeof e) var n = e.split(",");else if (e == this.EVENT || e == this.ACTION) n = ["_event_"];else n = ["*"];

          for (var r = 0; r < n.length; ++r) {
            var a = n[r];
            "" === a && (a = "*");
            var u = i ? "registered_slot_out_types" : "registered_slot_in_types";
            void 0 === this[u][a] && (this[u][a] = {
              nodes: []
            }), this[u][a].nodes.push(o), i ? this.slot_types_out.includes(a.toLowerCase()) || (this.slot_types_out.push(a.toLowerCase()), this.slot_types_out.sort()) : this.slot_types_in.includes(a.toLowerCase()) || (this.slot_types_in.push(a.toLowerCase()), this.slot_types_in.sort());
          }
        },
        wrapFunctionAsNode: function (t, e, i, s, o) {
          for (var n = Array(e.length), r = "", a = m.getParameterNames(e), u = 0; u < a.length; ++u) r += "this.addInput('" + a[u] + "'," + (i && i[u] ? "'" + i[u] + "'" : "0") + ");\n";

          r += "this.addOutput('out'," + (s ? "'" + s + "'" : 0) + ");\n", o && (r += "this.properties = " + JSON.stringify(o) + ";\n");
          var h = Function(r);
          h.title = t.split("/").pop(), h.desc = "Generated from " + e.name, h.prototype.onExecute = function () {
            for (var t = 0; t < n.length; ++t) n[t] = this.getInputData(t);

            var i = e.apply(this, n);
            this.setOutputData(0, i);
          }, this.registerNodeType(t, h);
        },
        clearRegisteredTypes: function () {
          this.registered_node_types = {}, this.node_types_by_file_extension = {}, this.Nodes = {}, this.searchbox_extras = {};
        },
        addNodeMethod: function (t, e) {
          for (var i in s.prototype[t] = e, this.registered_node_types) {
            var o = this.registered_node_types[i];
            o.prototype[t] && (o.prototype["_" + t] = o.prototype[t]), o.prototype[t] = e;
          }
        },
        createNode: function (t, e, i) {
          var s = this.registered_node_types[t];
          if (!s) return m.debug && console.log('GraphNode type "' + t + '" not registered.'), null;
          s.prototype;
          e = e || s.title || t;
          var o = null;
          if (m.catch_exceptions) try {
            o = new s(e);
          } catch (t) {
            return console.error(t), null;
          } else o = new s(e);
          if (o.type = t, !o.title && e && (o.title = e), o.properties || (o.properties = {}), o.properties_info || (o.properties_info = []), o.flags || (o.flags = {}), o.size || (o.size = o.computeSize()), o.pos || (o.pos = m.DEFAULT_POSITION.concat()), o.mode || (o.mode = m.ALWAYS), i) for (var n in i) o[n] = i[n];
          return o.onNodeCreated && o.onNodeCreated(), o;
        },
        getNodeType: function (t) {
          return this.registered_node_types[t];
        },
        getNodeTypesInCategory: function (t, e) {
          var i = [];

          for (var s in this.registered_node_types) {
            var o = this.registered_node_types[s];
            o.filter == e && ("" == t ? null == o.category && i.push(o) : o.category == t && i.push(o));
          }

          return this.auto_sort_node_types && i.sort(function (t, e) {
            return t.title.localeCompare(e.title);
          }), i;
        },
        getNodeTypesCategories: function (t) {
          var e = {
            "": 1
          };

          for (var i in this.registered_node_types) {
            var s = this.registered_node_types[i];

            if (s.category && !s.skip_list) {
              if (s.filter != t) continue;
              e[s.category] = 1;
            }
          }

          var o = [];

          for (var i in e) o.push(i);

          return this.auto_sort_node_types ? o.sort() : o;
        },
        reloadNodes: function (t) {
          for (var e = document.getElementsByTagName("script"), i = [], s = 0; s < e.length; s++) i.push(e[s]);

          var o = document.getElementsByTagName("head")[0];
          t = document.location.href + t;

          for (s = 0; s < i.length; s++) {
            var n = i[s].src;
            if (n && n.substr(0, t.length) == t) try {
              m.debug && console.log("Reloading: " + n);
              var r = document.createElement("script");
              r.type = "text/javascript", r.src = n, o.appendChild(r), o.removeChild(i[s]);
            } catch (t) {
              if (m.throw_errors) throw t;
              m.debug && console.log("Error while reloading " + n);
            }
          }

          m.debug && console.log("Nodes reloaded");
        },
        cloneObject: function (t, e) {
          if (null == t) return null;
          var i = JSON.parse(JSON.stringify(t));
          if (!e) return i;

          for (var s in i) e[s] = i[s];

          return e;
        },
        isValidConnection: function (t, e) {
          if ("" != t && "*" !== t || (t = 0), "" != e && "*" !== e || (e = 0), !t || !e || t == e || t == m.EVENT && e == m.ACTION) return !0;
          if (t = String(t), e = String(e), t = t.toLowerCase(), e = e.toLowerCase(), -1 == t.indexOf(",") && -1 == e.indexOf(",")) return t == e;

          for (var i = t.split(","), s = e.split(","), o = 0; o < i.length; ++o) for (var n = 0; n < s.length; ++n) if (this.isValidConnection(i[o], s[n])) return !0;

          return !1;
        },
        registerSearchboxExtra: function (t, e, i) {
          this.searchbox_extras[e.toLowerCase()] = {
            type: t,
            desc: e,
            data: i
          };
        },
        fetchFile: function (t, e, i, s) {
          if (!t) return null;
          if (e = e || "text", t.constructor === String) return "http" == t.substr(0, 4) && m.proxy && (t = m.proxy + t.substr(t.indexOf(":") + 3)), fetch(t).then(function (t) {
            if (!t.ok) throw new Error("File not found");
            return "arraybuffer" == e ? t.arrayBuffer() : "text" == e || "string" == e ? t.text() : "json" == e ? t.json() : "blob" == e ? t.blob() : void 0;
          }).then(function (t) {
            i && i(t);
          }).catch(function (e) {
            console.error("error fetching file:", t), s && s(e);
          });

          if (t.constructor === File || t.constructor === Blob) {
            var o = new FileReader();
            if (o.onload = function (t) {
              var s = t.target.result;
              "json" == e && (s = JSON.parse(s)), i && i(s);
            }, "arraybuffer" == e) return o.readAsArrayBuffer(t);
            if ("text" == e || "json" == e) return o.readAsText(t);
            if ("blob" == e) return o.readAsBinaryString(t);
          }

          return null;
        }
      };
      "undefined" != typeof performance ? m.getTime = performance.now.bind(performance) : "undefined" != typeof Date && Date.now ? m.getTime = Date.now.bind(Date) : "undefined" != typeof process ? m.getTime = function () {
        var t = process.hrtime();
        return .001 * t[0] + 1e-6 * t[1];
      } : m.getTime = function () {
        return new Date().getTime();
      }, t.LGraph = m.LGraph = e, e.supported_types = ["number", "string", "boolean"], e.prototype.getSupportedTypes = function () {
        return this.supported_types || e.supported_types;
      }, e.STATUS_STOPPED = 1, e.STATUS_RUNNING = 2, e.prototype.clear = function () {
        if (this.stop(), this.status = e.STATUS_STOPPED, this.last_node_id = 0, this.last_link_id = 0, this._version = -1, this._nodes) for (var t = 0; t < this._nodes.length; ++t) {
          var i = this._nodes[t];
          i.onRemoved && i.onRemoved();
        }
        this._nodes = [], this._nodes_by_id = {}, this._nodes_in_order = [], this._nodes_executable = null, this._groups = [], this.links = {}, this.iteration = 0, this.config = {}, this.vars = {}, this.extra = {}, this.globaltime = 0, this.runningtime = 0, this.fixedtime = 0, this.fixedtime_lapse = .01, this.elapsed_time = .01, this.last_update_time = 0, this.starttime = 0, this.catch_errors = !0, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.inputs = {}, this.outputs = {}, this.change(), this.sendActionToCanvas("clear");
      }, e.prototype.attachCanvas = function (t) {
        if (t.constructor != r) throw "attachCanvas expects a LGraphCanvas instance";
        t.graph && t.graph != this && t.graph.detachCanvas(t), t.graph = this, this.list_of_graphcanvas || (this.list_of_graphcanvas = []), this.list_of_graphcanvas.push(t);
      }, e.prototype.detachCanvas = function (t) {
        if (this.list_of_graphcanvas) {
          var e = this.list_of_graphcanvas.indexOf(t);
          -1 != e && (t.graph = null, this.list_of_graphcanvas.splice(e, 1));
        }
      }, e.prototype.start = function (t) {
        if (this.status != e.STATUS_RUNNING) {
          this.status = e.STATUS_RUNNING, this.onPlayEvent && this.onPlayEvent(), this.sendEventToAllNodes("onStart"), this.starttime = m.getTime(), this.last_update_time = this.starttime, t = t || 0;
          var i = this;

          if (0 == t && "undefined" != typeof window && window.requestAnimationFrame) {
            function s() {
              -1 == i.execution_timer_id && (window.requestAnimationFrame(s), i.onBeforeStep && i.onBeforeStep(), i.runStep(1, !i.catch_errors), i.onAfterStep && i.onAfterStep());
            }

            this.execution_timer_id = -1, s();
          } else this.execution_timer_id = setInterval(function () {
            i.onBeforeStep && i.onBeforeStep(), i.runStep(1, !i.catch_errors), i.onAfterStep && i.onAfterStep();
          }, t);
        }
      }, e.prototype.stop = function () {
        this.status != e.STATUS_STOPPED && (this.status = e.STATUS_STOPPED, this.onStopEvent && this.onStopEvent(), null != this.execution_timer_id && (-1 != this.execution_timer_id && clearInterval(this.execution_timer_id), this.execution_timer_id = null), this.sendEventToAllNodes("onStop"));
      }, e.prototype.runStep = function (t, e, i) {
        t = t || 1;
        var s = m.getTime();
        this.globaltime = .001 * (s - this.starttime);
        var o = this._nodes_executable ? this._nodes_executable : this._nodes;

        if (o) {
          if (i = i || o.length, e) {
            for (var n = 0; n < t; n++) {
              for (var r = 0; r < i; ++r) {
                var a = o[r];
                a.mode == m.ALWAYS && a.onExecute && a.doExecute();
              }

              this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
            }

            this.onAfterExecute && this.onAfterExecute();
          } else try {
            for (n = 0; n < t; n++) {
              for (r = 0; r < i; ++r) {
                a = o[r];
                a.mode == m.ALWAYS && a.onExecute && a.onExecute();
              }

              this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
            }

            this.onAfterExecute && this.onAfterExecute(), this.errors_in_execution = !1;
          } catch (t) {
            if (this.errors_in_execution = !0, m.throw_errors) throw t;
            m.debug && console.log("Error during execution: " + t), this.stop();
          }

          var u = m.getTime(),
              h = u - s;
          0 == h && (h = 1), this.execution_time = .001 * h, this.globaltime += .001 * h, this.iteration += 1, this.elapsed_time = .001 * (u - this.last_update_time), this.last_update_time = u, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [];
        }
      }, e.prototype.updateExecutionOrder = function () {
        this._nodes_in_order = this.computeExecutionOrder(!1), this._nodes_executable = [];

        for (var t = 0; t < this._nodes_in_order.length; ++t) this._nodes_in_order[t].onExecute && this._nodes_executable.push(this._nodes_in_order[t]);
      }, e.prototype.computeExecutionOrder = function (t, e) {
        for (var i = [], s = [], o = {}, n = {}, r = {}, a = 0, u = this._nodes.length; a < u; ++a) {
          var h = this._nodes[a];

          if (!t || h.onExecute) {
            o[h.id] = h;
            var p = 0;
            if (h.inputs) for (var l = 0, d = h.inputs.length; l < d; l++) h.inputs[l] && null != h.inputs[l].link && (p += 1);
            0 == p ? (s.push(h), e && (h._level = 1)) : (e && (h._level = 0), r[h.id] = p);
          }
        }

        for (; 0 != s.length;) {
          h = s.shift();
          if (i.push(h), delete o[h.id], h.outputs) for (a = 0; a < h.outputs.length; a++) {
            var c = h.outputs[a];
            if (null != c && null != c.links && 0 != c.links.length) for (l = 0; l < c.links.length; l++) {
              var _ = c.links[l],
                  g = this.links[_];

              if (g && !n[g.id]) {
                var f = this.getNodeById(g.target_id);
                null != f ? (e && (!f._level || f._level <= h._level) && (f._level = h._level + 1), n[g.id] = !0, r[f.id] -= 1, 0 == r[f.id] && s.push(f)) : n[g.id] = !0;
              }
            }
          }
        }

        for (var a in o) i.push(o[a]);

        i.length != this._nodes.length && m.debug && console.warn("something went wrong, nodes missing");

        for (u = i.length, a = 0; a < u; ++a) i[a].order = a;

        i = i.sort(function (t, e) {
          var i = t.constructor.priority || t.priority || 0,
              s = e.constructor.priority || e.priority || 0;
          return i == s ? t.order - e.order : i - s;
        });

        for (a = 0; a < u; ++a) i[a].order = a;

        return i;
      }, e.prototype.getAncestors = function (t) {
        for (var e = [], i = [t], s = {}; i.length;) {
          var o = i.shift();

          if (o.inputs) {
            s[o.id] || o == t || (s[o.id] = !0, e.push(o));

            for (var n = 0; n < o.inputs.length; ++n) {
              var r = o.getInputNode(n);
              r && -1 == e.indexOf(r) && i.push(r);
            }
          }
        }

        return e.sort(function (t, e) {
          return t.order - e.order;
        }), e;
      }, e.prototype.arrange = function (t, e) {
        t = t || 100;

        for (var i = this.computeExecutionOrder(!1, !0), s = [], o = 0; o < i.length; ++o) {
          var n = i[o],
              r = n._level || 1;
          s[r] || (s[r] = []), s[r].push(n);
        }

        var a = t;

        for (o = 0; o < s.length; ++o) {
          var u = s[o];

          if (u) {
            for (var h = 100, p = t + m.NODE_TITLE_HEIGHT, l = 0; l < u.length; ++l) {
              n = u[l];
              n.pos[0] = e == m.VERTICAL_LAYOUT ? p : a, n.pos[1] = e == m.VERTICAL_LAYOUT ? a : p, max_size_index = e == m.VERTICAL_LAYOUT ? 1 : 0, n.size[max_size_index] > h && (h = n.size[max_size_index]), node_size_index = e == m.VERTICAL_LAYOUT ? 0 : 1, p += n.size[node_size_index] + t + m.NODE_TITLE_HEIGHT;
            }

            a += h + t;
          }
        }

        this.setDirtyCanvas(!0, !0);
      }, e.prototype.getTime = function () {
        return this.globaltime;
      }, e.prototype.getFixedTime = function () {
        return this.fixedtime;
      }, e.prototype.getElapsedTime = function () {
        return this.elapsed_time;
      }, e.prototype.sendEventToAllNodes = function (t, e, i) {
        i = i || m.ALWAYS;
        var s = this._nodes_in_order ? this._nodes_in_order : this._nodes;
        if (s) for (var o = 0, n = s.length; o < n; ++o) {
          var r = s[o];
          r.constructor !== m.Subgraph || "onExecute" == t ? r[t] && r.mode == i && (void 0 === e ? r[t]() : e && e.constructor === Array ? r[t].apply(r, e) : r[t](e)) : r.mode == i && r.sendEventToAllNodes(t, e, i);
        }
      }, e.prototype.sendActionToCanvas = function (t, e) {
        if (this.list_of_graphcanvas) for (var i = 0; i < this.list_of_graphcanvas.length; ++i) {
          var s = this.list_of_graphcanvas[i];
          s[t] && s[t].apply(s, e);
        }
      }, e.prototype.add = function (t, e) {
        if (t) {
          if (t.constructor === o) return this._groups.push(t), this.setDirtyCanvas(!0), this.change(), t.graph = this, void this._version++;
          if (-1 != t.id && null != this._nodes_by_id[t.id] && (console.warn("LiteGraph: there is already a node with this ID, changing it"), t.id = ++this.last_node_id), this._nodes.length >= m.MAX_NUMBER_OF_NODES) throw "LiteGraph: max number of nodes in a graph reached";
          return null == t.id || -1 == t.id ? t.id = ++this.last_node_id : this.last_node_id < t.id && (this.last_node_id = t.id), t.graph = this, this._version++, this._nodes.push(t), this._nodes_by_id[t.id] = t, t.onAdded && t.onAdded(this), this.config.align_to_grid && t.alignToGrid(), e || this.updateExecutionOrder(), this.onNodeAdded && this.onNodeAdded(t), this.setDirtyCanvas(!0), this.change(), t;
        }
      }, e.prototype.remove = function (t) {
        if (t.constructor === m.LGraphGroup) {
          var e = this._groups.indexOf(t);

          return -1 != e && this._groups.splice(e, 1), t.graph = null, this._version++, this.setDirtyCanvas(!0, !0), void this.change();
        }

        if (null != this._nodes_by_id[t.id] && !t.ignore_remove) {
          if (this.beforeChange(), t.inputs) for (var i = 0; i < t.inputs.length; i++) {
            var s = t.inputs[i];
            null != s.link && t.disconnectInput(i);
          }
          if (t.outputs) for (i = 0; i < t.outputs.length; i++) {
            s = t.outputs[i];
            null != s.links && s.links.length && t.disconnectOutput(i);
          }
          if (t.onRemoved && t.onRemoved(), t.graph = null, this._version++, this.list_of_graphcanvas) for (i = 0; i < this.list_of_graphcanvas.length; ++i) {
            var o = this.list_of_graphcanvas[i];
            o.selected_nodes[t.id] && delete o.selected_nodes[t.id], o.node_dragged == t && (o.node_dragged = null);
          }

          var n = this._nodes.indexOf(t);

          -1 != n && this._nodes.splice(n, 1), delete this._nodes_by_id[t.id], this.onNodeRemoved && this.onNodeRemoved(t), this.sendActionToCanvas("checkPanels"), this.setDirtyCanvas(!0, !0), this.afterChange(), this.change(), this.updateExecutionOrder();
        }
      }, e.prototype.getNodeById = function (t) {
        return null == t ? null : this._nodes_by_id[t];
      }, e.prototype.findNodesByClass = function (t, e) {
        e = e || [], e.length = 0;

        for (var i = 0, s = this._nodes.length; i < s; ++i) this._nodes[i].constructor === t && e.push(this._nodes[i]);

        return e;
      }, e.prototype.findNodesByType = function (t, e) {
        t = t.toLowerCase();
        e = e || [], e.length = 0;

        for (var i = 0, s = this._nodes.length; i < s; ++i) this._nodes[i].type.toLowerCase() == t && e.push(this._nodes[i]);

        return e;
      }, e.prototype.findNodeByTitle = function (t) {
        for (var e = 0, i = this._nodes.length; e < i; ++e) if (this._nodes[e].title == t) return this._nodes[e];

        return null;
      }, e.prototype.findNodesByTitle = function (t) {
        for (var e = [], i = 0, s = this._nodes.length; i < s; ++i) this._nodes[i].title == t && e.push(this._nodes[i]);

        return e;
      }, e.prototype.getNodeOnPos = function (t, e, i, s) {
        i = i || this._nodes;

        for (var o = null, n = i.length - 1; n >= 0; n--) {
          var r = i[n];
          if (r.isPointInside(t, e, s)) return r;
        }

        return o;
      }, e.prototype.getGroupOnPos = function (t, e) {
        for (var i = this._groups.length - 1; i >= 0; i--) {
          var s = this._groups[i];
          if (s.isPointInside(t, e, 2, !0)) return s;
        }

        return null;
      }, e.prototype.checkNodeTypes = function () {
        for (var t = 0; t < this._nodes.length; t++) {
          var e = this._nodes[t],
              i = m.registered_node_types[e.type];

          if (e.constructor != i) {
            console.log("node being replaced by newer version: " + e.type);
            var s = m.createNode(e.type);
            !0, this._nodes[t] = s, s.configure(e.serialize()), s.graph = this, this._nodes_by_id[s.id] = s, e.inputs && (s.inputs = e.inputs.concat()), e.outputs && (s.outputs = e.outputs.concat());
          }
        }

        this.updateExecutionOrder();
      }, e.prototype.onAction = function (t, e, i) {
        this._input_nodes = this.findNodesByClass(m.GraphInput, this._input_nodes);

        for (var s = 0; s < this._input_nodes.length; ++s) {
          var o = this._input_nodes[s];

          if (o.properties.name == t) {
            o.actionDo(t, e, i);
            break;
          }
        }
      }, e.prototype.trigger = function (t, e) {
        this.onTrigger && this.onTrigger(t, e);
      }, e.prototype.addInput = function (t, e, i) {
        var s = this.inputs[t];
        s || (this.beforeChange(), this.inputs[t] = {
          name: t,
          type: e,
          value: i
        }, this._version++, this.afterChange(), this.onInputAdded && this.onInputAdded(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange());
      }, e.prototype.setInputData = function (t, e) {
        var i = this.inputs[t];
        i && (i.value = e);
      }, e.prototype.getInputData = function (t) {
        var e = this.inputs[t];
        return e ? e.value : null;
      }, e.prototype.renameInput = function (t, e) {
        if (e != t) {
          if (!this.inputs[t]) return !1;
          if (this.inputs[e]) return console.error("there is already one input with that name"), !1;
          this.inputs[e] = this.inputs[t], delete this.inputs[t], this._version++, this.onInputRenamed && this.onInputRenamed(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange();
        }
      }, e.prototype.changeInputType = function (t, e) {
        if (!this.inputs[t]) return !1;
        this.inputs[t].type && String(this.inputs[t].type).toLowerCase() == String(e).toLowerCase() || (this.inputs[t].type = e, this._version++, this.onInputTypeChanged && this.onInputTypeChanged(t, e));
      }, e.prototype.removeInput = function (t) {
        return !!this.inputs[t] && (delete this.inputs[t], this._version++, this.onInputRemoved && this.onInputRemoved(t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0);
      }, e.prototype.addOutput = function (t, e, i) {
        this.outputs[t] = {
          name: t,
          type: e,
          value: i
        }, this._version++, this.onOutputAdded && this.onOutputAdded(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange();
      }, e.prototype.setOutputData = function (t, e) {
        var i = this.outputs[t];
        i && (i.value = e);
      }, e.prototype.getOutputData = function (t) {
        var e = this.outputs[t];
        return e ? e.value : null;
      }, e.prototype.renameOutput = function (t, e) {
        return !!this.outputs[t] && (this.outputs[e] ? (console.error("there is already one output with that name"), !1) : (this.outputs[e] = this.outputs[t], delete this.outputs[t], this._version++, this.onOutputRenamed && this.onOutputRenamed(t, e), void (this.onInputsOutputsChange && this.onInputsOutputsChange())));
      }, e.prototype.changeOutputType = function (t, e) {
        if (!this.outputs[t]) return !1;
        this.outputs[t].type && String(this.outputs[t].type).toLowerCase() == String(e).toLowerCase() || (this.outputs[t].type = e, this._version++, this.onOutputTypeChanged && this.onOutputTypeChanged(t, e));
      }, e.prototype.removeOutput = function (t) {
        return !!this.outputs[t] && (delete this.outputs[t], this._version++, this.onOutputRemoved && this.onOutputRemoved(t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0);
      }, e.prototype.triggerInput = function (t, e) {
        for (var i = this.findNodesByTitle(t), s = 0; s < i.length; ++s) i[s].onTrigger(e);
      }, e.prototype.setCallback = function (t, e) {
        for (var i = this.findNodesByTitle(t), s = 0; s < i.length; ++s) i[s].setTrigger(e);
      }, e.prototype.beforeChange = function (t) {
        this.onBeforeChange && this.onBeforeChange(this, t), this.sendActionToCanvas("onBeforeChange", this);
      }, e.prototype.afterChange = function (t) {
        this.onAfterChange && this.onAfterChange(this, t), this.sendActionToCanvas("onAfterChange", this);
      }, e.prototype.connectionChange = function (t, e) {
        this.updateExecutionOrder(), this.onConnectionChange && this.onConnectionChange(t), this._version++, this.sendActionToCanvas("onConnectionChange");
      }, e.prototype.isLive = function () {
        if (!this.list_of_graphcanvas) return !1;

        for (var t = 0; t < this.list_of_graphcanvas.length; ++t) {
          var e = this.list_of_graphcanvas[t];
          if (e.live_mode) return !0;
        }

        return !1;
      }, e.prototype.clearTriggeredSlots = function () {
        for (var t in this.links) {
          var e = this.links[t];
          e && e._last_time && (e._last_time = 0);
        }
      }, e.prototype.change = function () {
        m.debug && console.log("Graph changed"), this.sendActionToCanvas("setDirty", [!0, !0]), this.on_change && this.on_change(this);
      }, e.prototype.setDirtyCanvas = function (t, e) {
        this.sendActionToCanvas("setDirty", [t, e]);
      }, e.prototype.removeLink = function (t) {
        var e = this.links[t];

        if (e) {
          var i = this.getNodeById(e.target_id);
          i && i.disconnectInput(e.target_slot);
        }
      }, e.prototype.serialize = function () {
        for (var t = [], e = 0, s = this._nodes.length; e < s; ++e) t.push(this._nodes[e].serialize());

        var o = [];

        for (var e in this.links) {
          var n = this.links[e];

          if (!n.serialize) {
            console.warn("weird LLink bug, link info is not a LLink but a regular object");
            var r = new i();

            for (var a in n) r[a] = n[a];

            this.links[e] = r, n = r;
          }

          o.push(n.serialize());
        }

        var u = [];

        for (e = 0; e < this._groups.length; ++e) u.push(this._groups[e].serialize());

        var h = {
          last_node_id: this.last_node_id,
          last_link_id: this.last_link_id,
          nodes: t,
          links: o,
          groups: u,
          config: this.config,
          extra: this.extra,
          version: m.VERSION
        };
        return this.onSerialize && this.onSerialize(h), h;
      }, e.prototype.configure = function (t, e) {
        if (t) {
          e || this.clear();
          var o = t.nodes;

          if (t.links && t.links.constructor === Array) {
            for (var n = [], r = 0; r < t.links.length; ++r) {
              var a = t.links[r];

              if (a) {
                var u = new i();
                u.configure(a), n[u.id] = u;
              } else console.warn("serialized graph link data contains errors, skipping.");
            }

            t.links = n;
          }

          for (var r in t) "nodes" != r && "groups" != r && (this[r] = t[r]);

          var h = !1;

          if (this._nodes = [], o) {
            r = 0;

            for (var p = o.length; r < p; ++r) {
              var l = o[r],
                  d = m.createNode(l.type, l.title);
              d || (m.debug && console.log("Node not found or has errors: " + l.type), d = new s(), d.last_serialization = l, d.has_errors = !0, h = !0), d.id = l.id, this.add(d, !0);
            }

            for (r = 0, p = o.length; r < p; ++r) {
              l = o[r], d = this.getNodeById(l.id);
              d && d.configure(l);
            }
          }

          if (this._groups.length = 0, t.groups) for (r = 0; r < t.groups.length; ++r) {
            var c = new m.LGraphGroup();
            c.configure(t.groups[r]), this.add(c);
          }
          return this.updateExecutionOrder(), this.extra = t.extra || {}, this.onConfigure && this.onConfigure(t), this._version++, this.setDirtyCanvas(!0, !0), h;
        }
      }, e.prototype.load = function (t, e) {
        var i = this;

        if (t.constructor === File || t.constructor === Blob) {
          var s = new FileReader();
          return s.addEventListener("load", function (t) {
            var s = JSON.parse(t.target.result);
            i.configure(s), e && e();
          }), void s.readAsText(t);
        }

        var o = new XMLHttpRequest();
        o.open("GET", t, !0), o.send(null), o.onload = function (t) {
          if (200 === o.status) {
            var s = JSON.parse(o.response);
            i.configure(s), e && e();
          } else console.error("Error loading graph:", o.status, o.response);
        }, o.onerror = function (t) {
          console.error("Error loading graph:", t);
        };
      }, e.prototype.onNodeTrace = function (t, e, i) {}, i.prototype.configure = function (t) {
        t.constructor === Array ? (this.id = t[0], this.origin_id = t[1], this.origin_slot = t[2], this.target_id = t[3], this.target_slot = t[4], this.type = t[5]) : (this.id = t.id, this.type = t.type, this.origin_id = t.origin_id, this.origin_slot = t.origin_slot, this.target_id = t.target_id, this.target_slot = t.target_slot);
      }, i.prototype.serialize = function () {
        return [this.id, this.origin_id, this.origin_slot, this.target_id, this.target_slot, this.type];
      }, m.LLink = i, t.LGraphNode = m.LGraphNode = s, s.prototype._ctor = function (t) {
        this.title = t || "Unnamed", this.size = [m.NODE_WIDTH, 60], this.graph = null, this._pos = new Float32Array(10, 10), Object.defineProperty(this, "pos", {
          set: function (t) {
            !t || t.length < 2 || (this._pos[0] = t[0], this._pos[1] = t[1]);
          },
          get: function () {
            return this._pos;
          },
          enumerable: !0
        }), this.id = -1, this.type = null, this.inputs = [], this.outputs = [], this.connections = [], this.properties = {}, this.properties_info = [], this.flags = {};
      }, s.prototype.configure = function (t) {
        for (var e in this.graph && this.graph._version++, t) if ("properties" != e) null != t[e] && ("object" == typeof t[e] ? this[e] && this[e].configure ? this[e].configure(t[e]) : this[e] = m.cloneObject(t[e], this[e]) : this[e] = t[e]);else for (var i in t.properties) this.properties[i] = t.properties[i], this.onPropertyChanged && this.onPropertyChanged(i, t.properties[i]);

        if (t.title || (this.title = this.constructor.title), this.inputs) for (var s = 0; s < this.inputs.length; ++s) {
          var o = this.inputs[s],
              n = this.graph ? this.graph.links[o.link] : null;
          this.onConnectionsChange && this.onConnectionsChange(m.INPUT, s, !0, n, o), this.onInputAdded && this.onInputAdded(o);
        }
        if (this.outputs) for (s = 0; s < this.outputs.length; ++s) {
          var r = this.outputs[s];

          if (r.links) {
            for (e = 0; e < r.links.length; ++e) {
              n = this.graph ? this.graph.links[r.links[e]] : null;
              this.onConnectionsChange && this.onConnectionsChange(m.OUTPUT, s, !0, n, r);
            }

            this.onOutputAdded && this.onOutputAdded(r);
          }
        }

        if (this.widgets) {
          for (s = 0; s < this.widgets.length; ++s) {
            var a = this.widgets[s];
            a && a.options && a.options.property && this.properties[a.options.property] && (a.value = JSON.parse(JSON.stringify(this.properties[a.options.property])));
          }

          if (t.widgets_values) for (s = 0; s < t.widgets_values.length; ++s) this.widgets[s] && (this.widgets[s].value = t.widgets_values[s]);
        }

        this.onConfigure && this.onConfigure(t);
      }, s.prototype.serialize = function () {
        var t = {
          id: this.id,
          type: this.type,
          pos: this.pos,
          size: this.size,
          flags: m.cloneObject(this.flags),
          order: this.order,
          mode: this.mode
        };
        if (this.constructor === s && this.last_serialization) return this.last_serialization;

        if (this.inputs && (t.inputs = this.inputs), this.outputs) {
          for (var e = 0; e < this.outputs.length; e++) delete this.outputs[e]._data;

          t.outputs = this.outputs;
        }

        if (this.title && this.title != this.constructor.title && (t.title = this.title), this.properties && (t.properties = m.cloneObject(this.properties)), this.widgets && this.serialize_widgets) {
          t.widgets_values = [];

          for (e = 0; e < this.widgets.length; ++e) this.widgets[e] ? t.widgets_values[e] = this.widgets[e].value : t.widgets_values[e] = null;
        }

        return t.type || (t.type = this.constructor.type), this.color && (t.color = this.color), this.bgcolor && (t.bgcolor = this.bgcolor), this.boxcolor && (t.boxcolor = this.boxcolor), this.shape && (t.shape = this.shape), this.onSerialize && this.onSerialize(t) && console.warn("node onSerialize shouldnt return anything, data should be stored in the object pass in the first parameter"), t;
      }, s.prototype.clone = function () {
        var t = m.createNode(this.type);
        if (!t) return null;
        var e = m.cloneObject(this.serialize());
        if (e.inputs) for (var i = 0; i < e.inputs.length; ++i) e.inputs[i].link = null;
        if (e.outputs) for (i = 0; i < e.outputs.length; ++i) e.outputs[i].links && (e.outputs[i].links.length = 0);
        return delete e.id, t.configure(e), t;
      }, s.prototype.toString = function () {
        return JSON.stringify(this.serialize());
      }, s.prototype.getTitle = function () {
        return this.title || this.constructor.title;
      }, s.prototype.setProperty = function (t, e) {
        if (this.properties || (this.properties = {}), e !== this.properties[t]) {
          var i = this.properties[t];
          if (this.properties[t] = e, this.onPropertyChanged && !1 === this.onPropertyChanged(t, e, i) && (this.properties[t] = i), this.widgets) for (var s = 0; s < this.widgets.length; ++s) {
            var o = this.widgets[s];

            if (o && o.options.property == t) {
              o.value = e;
              break;
            }
          }
        }
      }, s.prototype.setOutputData = function (t, e) {
        if (this.outputs && !(-1 == t || t >= this.outputs.length)) {
          var i = this.outputs[t];
          if (i && (i._data = e, this.outputs[t].links)) for (var s = 0; s < this.outputs[t].links.length; s++) {
            var o = this.outputs[t].links[s],
                n = this.graph.links[o];
            n && (n.data = e);
          }
        }
      }, s.prototype.setOutputDataType = function (t, e) {
        if (this.outputs && !(-1 == t || t >= this.outputs.length)) {
          var i = this.outputs[t];
          if (i && (i.type = e, this.outputs[t].links)) for (var s = 0; s < this.outputs[t].links.length; s++) {
            var o = this.outputs[t].links[s];
            this.graph.links[o].type = e;
          }
        }
      }, s.prototype.getInputData = function (t, e) {
        if (this.inputs && !(t >= this.inputs.length || null == this.inputs[t].link)) {
          var i = this.inputs[t].link,
              s = this.graph.links[i];
          if (!s) return null;
          if (!e) return s.data;
          var o = this.graph.getNodeById(s.origin_id);
          return o ? (o.updateOutputData ? o.updateOutputData(s.origin_slot) : o.onExecute && o.onExecute(), s.data) : s.data;
        }
      }, s.prototype.getInputDataType = function (t) {
        if (!this.inputs) return null;
        if (t >= this.inputs.length || null == this.inputs[t].link) return null;
        var e = this.inputs[t].link,
            i = this.graph.links[e];
        if (!i) return null;
        var s = this.graph.getNodeById(i.origin_id);
        if (!s) return i.type;
        var o = s.outputs[i.origin_slot];
        return o ? o.type : null;
      }, s.prototype.getInputDataByName = function (t, e) {
        var i = this.findInputSlot(t);
        return -1 == i ? null : this.getInputData(i, e);
      }, s.prototype.isInputConnected = function (t) {
        return !!this.inputs && t < this.inputs.length && null != this.inputs[t].link;
      }, s.prototype.getInputInfo = function (t) {
        return this.inputs && t < this.inputs.length ? this.inputs[t] : null;
      }, s.prototype.getInputLink = function (t) {
        if (!this.inputs) return null;

        if (t < this.inputs.length) {
          var e = this.inputs[t];
          return this.graph.links[e.link];
        }

        return null;
      }, s.prototype.getInputNode = function (t) {
        if (!this.inputs) return null;
        if (t >= this.inputs.length) return null;
        var e = this.inputs[t];
        if (!e || null === e.link) return null;
        var i = this.graph.links[e.link];
        return i ? this.graph.getNodeById(i.origin_id) : null;
      }, s.prototype.getInputOrProperty = function (t) {
        if (!this.inputs || !this.inputs.length) return this.properties ? this.properties[t] : null;

        for (var e = 0, i = this.inputs.length; e < i; ++e) {
          var s = this.inputs[e];

          if (t == s.name && null != s.link) {
            var o = this.graph.links[s.link];
            if (o) return o.data;
          }
        }

        return this.properties[t];
      }, s.prototype.getOutputData = function (t) {
        if (!this.outputs) return null;
        if (t >= this.outputs.length) return null;
        var e = this.outputs[t];
        return e._data;
      }, s.prototype.getOutputInfo = function (t) {
        return this.outputs && t < this.outputs.length ? this.outputs[t] : null;
      }, s.prototype.isOutputConnected = function (t) {
        return !!this.outputs && t < this.outputs.length && this.outputs[t].links && this.outputs[t].links.length;
      }, s.prototype.isAnyOutputConnected = function () {
        if (!this.outputs) return !1;

        for (var t = 0; t < this.outputs.length; ++t) if (this.outputs[t].links && this.outputs[t].links.length) return !0;

        return !1;
      }, s.prototype.getOutputNodes = function (t) {
        if (!this.outputs || 0 == this.outputs.length) return null;
        if (t >= this.outputs.length) return null;
        var e = this.outputs[t];
        if (!e.links || 0 == e.links.length) return null;

        for (var i = [], s = 0; s < e.links.length; s++) {
          var o = e.links[s],
              n = this.graph.links[o];

          if (n) {
            var r = this.graph.getNodeById(n.target_id);
            r && i.push(r);
          }
        }

        return i;
      }, s.prototype.addOnTriggerInput = function () {
        var t = this.findInputSlot("onTrigger");

        if (-1 == t) {
          this.addInput("onTrigger", m.EVENT, {
            optional: !0,
            nameLocked: !0
          });
          return this.findInputSlot("onTrigger");
        }

        return t;
      }, s.prototype.addOnExecutedOutput = function () {
        var t = this.findOutputSlot("onExecuted");

        if (-1 == t) {
          this.addOutput("onExecuted", m.ACTION, {
            optional: !0,
            nameLocked: !0
          });
          return this.findOutputSlot("onExecuted");
        }

        return t;
      }, s.prototype.onAfterExecuteNode = function (t, e) {
        var i = this.findOutputSlot("onExecuted");
        -1 != i && this.triggerSlot(i, t, null, e);
      }, s.prototype.changeMode = function (t) {
        switch (t) {
          case m.ON_EVENT:
            break;

          case m.ON_TRIGGER:
            this.addOnTriggerInput(), this.addOnExecutedOutput();
            break;

          case m.NEVER:
          case m.ALWAYS:
          case m.ON_REQUEST:
            break;

          default:
            return !1;
        }

        return this.mode = t, !0;
      }, s.prototype.doExecute = function (t, e) {
        e = e || {}, this.onExecute && (e.action_call || (e.action_call = this.id + "_exec_" + Math.floor(9999 * Math.random())), this.graph.nodes_executing[this.id] = !0, this.onExecute(t, e), this.graph.nodes_executing[this.id] = !1, this.exec_version = this.graph.iteration, e && e.action_call && (this.action_call = e.action_call, this.graph.nodes_executedAction[this.id] = e.action_call)), this.execute_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(t, e);
      }, s.prototype.actionDo = function (t, e, i) {
        i = i || {}, this.onAction && (i.action_call || (i.action_call = this.id + "_" + (t || "action") + "_" + Math.floor(9999 * Math.random())), this.graph.nodes_actioning[this.id] = t || "actioning", this.onAction(t, e, i), this.graph.nodes_actioning[this.id] = !1, i && i.action_call && (this.action_call = i.action_call, this.graph.nodes_executedAction[this.id] = i.action_call)), this.action_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(e, i);
      }, s.prototype.trigger = function (t, e, i) {
        if (this.outputs && this.outputs.length) {
          this.graph && (this.graph._last_trigger_time = m.getTime());

          for (var s = 0; s < this.outputs.length; ++s) {
            var o = this.outputs[s];
            !o || o.type !== m.EVENT || t && o.name != t || this.triggerSlot(s, e, null, i);
          }
        }
      }, s.prototype.triggerSlot = function (t, e, i, s) {
        if (s = s || {}, this.outputs) {
          var o = this.outputs[t];

          if (o) {
            var n = o.links;

            if (n && n.length) {
              this.graph && (this.graph._last_trigger_time = m.getTime());

              for (var r = 0; r < n.length; ++r) {
                var a = n[r];

                if (null == i || i == a) {
                  var u = this.graph.links[n[r]];

                  if (u) {
                    u._last_time = m.getTime();
                    var h = this.graph.getNodeById(u.target_id);

                    if (h) {
                      var p = h.inputs[u.target_slot];
                      if (h.mode === m.ON_TRIGGER) s.action_call || (s.action_call = this.id + "_trigg_" + Math.floor(9999 * Math.random())), h.onExecute && h.doExecute(e, s);else if (h.onAction) {
                        s.action_call || (s.action_call = this.id + "_act_" + Math.floor(9999 * Math.random()));
                        p = h.inputs[u.target_slot];
                        h.actionDo(p.name, e, s);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }, s.prototype.clearTriggeredSlot = function (t, e) {
        if (this.outputs) {
          var i = this.outputs[t];

          if (i) {
            var s = i.links;
            if (s && s.length) for (var o = 0; o < s.length; ++o) {
              var n = s[o];

              if (null == e || e == n) {
                var r = this.graph.links[s[o]];
                r && (r._last_time = 0);
              }
            }
          }
        }
      }, s.prototype.setSize = function (t) {
        this.size = t, this.onResize && this.onResize(this.size);
      }, s.prototype.addProperty = function (t, e, i, s) {
        var o = {
          name: t,
          type: i,
          default_value: e
        };
        if (s) for (var n in s) o[n] = s[n];
        return this.properties_info || (this.properties_info = []), this.properties_info.push(o), this.properties || (this.properties = {}), this.properties[t] = e, o;
      }, s.prototype.addOutput = function (t, e, i) {
        var s = {
          name: t,
          type: e,
          links: null
        };
        if (i) for (var o in i) s[o] = i[o];
        return this.outputs || (this.outputs = []), this.outputs.push(s), this.onOutputAdded && this.onOutputAdded(s), m.auto_load_slot_types && m.registerNodeAndSlotType(this, e, !0), this.setSize(this.computeSize()), this.setDirtyCanvas(!0, !0), s;
      }, s.prototype.addOutputs = function (t) {
        for (var e = 0; e < t.length; ++e) {
          var i = t[e],
              s = {
            name: i[0],
            type: i[1],
            link: null
          };
          if (t[2]) for (var o in i[2]) s[o] = i[2][o];
          this.outputs || (this.outputs = []), this.outputs.push(s), this.onOutputAdded && this.onOutputAdded(s), m.auto_load_slot_types && m.registerNodeAndSlotType(this, i[1], !0);
        }

        this.setSize(this.computeSize()), this.setDirtyCanvas(!0, !0);
      }, s.prototype.removeOutput = function (t) {
        this.disconnectOutput(t), this.outputs.splice(t, 1);

        for (var e = t; e < this.outputs.length; ++e) if (this.outputs[e] && this.outputs[e].links) for (var i = this.outputs[e].links, s = 0; s < i.length; ++s) {
          var o = this.graph.links[i[s]];
          o && (o.origin_slot -= 1);
        }

        this.setSize(this.computeSize()), this.onOutputRemoved && this.onOutputRemoved(t), this.setDirtyCanvas(!0, !0);
      }, s.prototype.addInput = function (t, e, i) {
        e = e || 0;
        var s = {
          name: t,
          type: e,
          link: null
        };
        if (i) for (var o in i) s[o] = i[o];
        return this.inputs || (this.inputs = []), this.inputs.push(s), this.setSize(this.computeSize()), this.onInputAdded && this.onInputAdded(s), m.registerNodeAndSlotType(this, e), this.setDirtyCanvas(!0, !0), s;
      }, s.prototype.addInputs = function (t) {
        for (var e = 0; e < t.length; ++e) {
          var i = t[e],
              s = {
            name: i[0],
            type: i[1],
            link: null
          };
          if (t[2]) for (var o in i[2]) s[o] = i[2][o];
          this.inputs || (this.inputs = []), this.inputs.push(s), this.onInputAdded && this.onInputAdded(s), m.registerNodeAndSlotType(this, i[1]);
        }

        this.setSize(this.computeSize()), this.setDirtyCanvas(!0, !0);
      }, s.prototype.removeInput = function (t) {
        this.disconnectInput(t);

        for (var e = this.inputs.splice(t, 1), i = t; i < this.inputs.length; ++i) if (this.inputs[i]) {
          var s = this.graph.links[this.inputs[i].link];
          s && (s.target_slot -= 1);
        }

        this.setSize(this.computeSize()), this.onInputRemoved && this.onInputRemoved(t, e[0]), this.setDirtyCanvas(!0, !0);
      }, s.prototype.addConnection = function (t, e, i, s) {
        var o = {
          name: t,
          type: e,
          pos: i,
          direction: s,
          links: null
        };
        return this.connections.push(o), o;
      }, s.prototype.computeSize = function (t) {
        function e(t) {
          return t ? o * t.length * .6 : 0;
        }

        if (this.constructor.size) return this.constructor.size.concat();
        var i = Math.max(this.inputs ? this.inputs.length : 1, this.outputs ? this.outputs.length : 1),
            s = t || new Float32Array([0, 0]);
        i = Math.max(i, 1);
        var o = m.NODE_TEXT_SIZE,
            n = e(this.title),
            r = 0,
            a = 0;
        if (this.inputs) for (var u = 0, h = this.inputs.length; u < h; ++u) {
          var p = this.inputs[u],
              l = p.label || p.name || "",
              d = e(l);
          r < d && (r = d);
        }
        if (this.outputs) for (u = 0, h = this.outputs.length; u < h; ++u) {
          var c = this.outputs[u];
          l = c.label || c.name || "", d = e(l);
          a < d && (a = d);
        }
        s[0] = Math.max(r + a + 10, n), s[0] = Math.max(s[0], m.NODE_WIDTH), this.widgets && this.widgets.length && (s[0] = Math.max(s[0], 1.5 * m.NODE_WIDTH)), s[1] = (this.constructor.slot_start_y || 0) + i * m.NODE_SLOT_HEIGHT;
        var _ = 0;

        if (this.widgets && this.widgets.length) {
          for (u = 0, h = this.widgets.length; u < h; ++u) this.widgets[u].computeSize ? _ += this.widgets[u].computeSize(s[0])[1] + 4 : _ += m.NODE_WIDGET_HEIGHT + 4;

          _ += 8;
        }

        return this.widgets_up ? s[1] = Math.max(s[1], _) : null != this.widgets_start_y ? s[1] = Math.max(s[1], _ + this.widgets_start_y) : s[1] += _, this.constructor.min_height && s[1] < this.constructor.min_height && (s[1] = this.constructor.min_height), s[1] += 6, s;
      }, s.prototype.getPropertyInfo = function (t) {
        var e = null;
        if (this.properties_info) for (var i = 0; i < this.properties_info.length; ++i) if (this.properties_info[i].name == t) {
          e = this.properties_info[i];
          break;
        }
        return this.constructor["@" + t] && (e = this.constructor["@" + t]), this.constructor.widgets_info && this.constructor.widgets_info[t] && (e = this.constructor.widgets_info[t]), !e && this.onGetPropertyInfo && (e = this.onGetPropertyInfo(t)), e || (e = {}), e.type || (e.type = typeof this.properties[t]), "combo" == e.widget && (e.type = "enum"), e;
      }, s.prototype.addWidget = function (t, e, i, s, o) {
        this.widgets || (this.widgets = []), !o && s && s.constructor === Object && (o = s, s = null), o && o.constructor === String && (o = {
          property: o
        }), s && s.constructor === String && (o || (o = {}), o.property = s, s = null), s && s.constructor !== Function && (console.warn("addWidget: callback must be a function"), s = null);
        var n = {
          type: t.toLowerCase(),
          name: e,
          value: i,
          callback: s,
          options: o || {}
        };
        if (void 0 !== n.options.y && (n.y = n.options.y), s || n.options.callback || n.options.property || console.warn("LiteGraph addWidget(...) without a callback or property assigned"), "combo" == t && !n.options.values) throw "LiteGraph addWidget('combo',...) requires to pass values in options: { values:['red','blue'] }";
        return this.widgets.push(n), this.setSize(this.computeSize()), n;
      }, s.prototype.addCustomWidget = function (t) {
        return this.widgets || (this.widgets = []), this.widgets.push(t), t;
      }, s.prototype.getBounding = function (t) {
        return t = t || new Float32Array(4), t[0] = this.pos[0] - 4, t[1] = this.pos[1] - m.NODE_TITLE_HEIGHT, t[2] = this.size[0] + 4, t[3] = this.flags.collapsed ? m.NODE_TITLE_HEIGHT : this.size[1] + m.NODE_TITLE_HEIGHT, this.onBounding && this.onBounding(t), t;
      }, s.prototype.isPointInside = function (t, e, i, s) {
        i = i || 0;
        var o = this.graph && this.graph.isLive() ? 0 : m.NODE_TITLE_HEIGHT;

        if (s && (o = 0), this.flags && this.flags.collapsed) {
          if (p(t, e, this.pos[0] - i, this.pos[1] - m.NODE_TITLE_HEIGHT - i, (this._collapsed_width || m.NODE_COLLAPSED_WIDTH) + 2 * i, m.NODE_TITLE_HEIGHT + 2 * i)) return !0;
        } else if (this.pos[0] - 4 - i < t && this.pos[0] + this.size[0] + 4 + i > t && this.pos[1] - o - i < e && this.pos[1] + this.size[1] + i > e) return !0;

        return !1;
      }, s.prototype.getSlotInPosition = function (t, e) {
        var i = new Float32Array(2);
        if (this.inputs) for (var s = 0, o = this.inputs.length; s < o; ++s) {
          var n = this.inputs[s];
          if (this.getConnectionPos(!0, s, i), p(t, e, i[0] - 10, i[1] - 5, 20, 10)) return {
            input: n,
            slot: s,
            link_pos: i
          };
        }
        if (this.outputs) for (s = 0, o = this.outputs.length; s < o; ++s) {
          var r = this.outputs[s];
          if (this.getConnectionPos(!1, s, i), p(t, e, i[0] - 10, i[1] - 5, 20, 10)) return {
            output: r,
            slot: s,
            link_pos: i
          };
        }
        return null;
      }, s.prototype.findInputSlot = function (t, e) {
        if (!this.inputs) return -1;

        for (var i = 0, s = this.inputs.length; i < s; ++i) if (t == this.inputs[i].name) return e ? this.inputs[i] : i;

        return -1;
      }, s.prototype.findOutputSlot = function (t, e) {
        if (e = e || !1, !this.outputs) return -1;

        for (var i = 0, s = this.outputs.length; i < s; ++i) if (t == this.outputs[i].name) return e ? this.outputs[i] : i;

        return -1;
      }, s.prototype.findInputSlotFree = function (t) {
        t = t || {};
        var e = {
          returnObj: !1,
          typesNotAccepted: []
        },
            i = Object.assign(e, t);
        if (!this.inputs) return -1;

        for (var s = 0, o = this.inputs.length; s < o; ++s) if (!(this.inputs[s].link && null != this.inputs[s].link || i.typesNotAccepted && i.typesNotAccepted.includes && i.typesNotAccepted.includes(this.inputs[s].type))) return i.returnObj ? this.inputs[s] : s;

        return -1;
      }, s.prototype.findOutputSlotFree = function (t) {
        t = t || {};
        var e = {
          returnObj: !1,
          typesNotAccepted: []
        },
            i = Object.assign(e, t);
        if (!this.outputs) return -1;

        for (var s = 0, o = this.outputs.length; s < o; ++s) if (!(this.outputs[s].links && null != this.outputs[s].links || i.typesNotAccepted && i.typesNotAccepted.includes && i.typesNotAccepted.includes(this.outputs[s].type))) return i.returnObj ? this.outputs[s] : s;

        return -1;
      }, s.prototype.findInputSlotByType = function (t, e, i, s) {
        return this.findSlotByType(!0, t, e, i, s);
      }, s.prototype.findOutputSlotByType = function (t, e, i, s) {
        return this.findSlotByType(!1, t, e, i, s);
      }, s.prototype.findSlotByType = function (t, e, i, s, o) {
        t = t || !1, i = i || !1, s = s || !1, o = o || !1;
        var n = t ? this.inputs : this.outputs;
        if (!n) return -1;
        "" != e && "*" != e || (e = 0);

        for (var r = 0, a = n.length; r < a; ++r) {
          var u = (e + "").toLowerCase().split(","),
              h = "0" == n[r].type || "*" == n[r].type ? "0" : n[r].type;

          for (h = (h + "").toLowerCase().split(","), sI = 0; sI < u.length; sI++) for (dI = 0; dI < h.length; dI++) if ("_event_" == u[sI] && (u[sI] = m.EVENT), "_event_" == h[sI] && (h[sI] = m.EVENT), "*" == u[sI] && (u[sI] = 0), "*" == h[sI] && (h[sI] = 0), u[sI] == h[dI]) {
            if (s && n[r].links && null !== n[r].links) continue;
            return i ? n[r] : r;
          }
        }

        if (s && !o) for (r = 0, a = n.length; r < a; ++r) {
          u = (e + "").toLowerCase().split(","), h = "0" == n[r].type || "*" == n[r].type ? "0" : n[r].type;

          for (h = (h + "").toLowerCase().split(","), sI = 0; sI < u.length; sI++) for (dI = 0; dI < h.length; dI++) if ("*" == u[sI] && (u[sI] = 0), "*" == h[sI] && (h[sI] = 0), u[sI] == h[dI]) return i ? n[r] : r;
        }
        return -1;
      }, s.prototype.connectByType = function (t, e, i, s) {
        s = s || {};
        var o = {
          createEventInCase: !0,
          firstFreeIfOutputGeneralInCase: !0,
          generalTypeInCase: !0
        },
            n = Object.assign(o, s);
        if (e && e.constructor === Number && (e = this.graph.getNodeById(e)), r = e.findInputSlotByType(i, !1, !0), r >= 0 && null !== r) return this.connect(t, e, r);
        if (n.createEventInCase && i == m.EVENT) return this.connect(t, e, -1);

        if (n.generalTypeInCase) {
          var r = e.findInputSlotByType(0, !1, !0, !0);
          if (r >= 0) return this.connect(t, e, r);
        }

        if (n.firstFreeIfOutputGeneralInCase && (0 == i || "*" == i || "" == i)) {
          r = e.findInputSlotFree({
            typesNotAccepted: [m.EVENT]
          });
          if (r >= 0) return this.connect(t, e, r);
        }

        return console.debug("no way to connect type: ", i, " to targetNODE ", e), null;
      }, s.prototype.connectByTypeOutput = function (t, e, i, s) {
        s = s || {};
        var o = {
          createEventInCase: !0,
          firstFreeIfInputGeneralInCase: !0,
          generalTypeInCase: !0
        },
            n = Object.assign(o, s);
        if (e && e.constructor === Number && (e = this.graph.getNodeById(e)), r = e.findOutputSlotByType(i, !1, !0), r >= 0 && null !== r) return e.connect(r, this, t);

        if (n.generalTypeInCase) {
          var r = e.findOutputSlotByType(0, !1, !0, !0);
          if (r >= 0) return e.connect(r, this, t);
        }

        if (n.createEventInCase && i == m.EVENT && m.do_add_triggers_slots) {
          r = e.addOnExecutedOutput();
          return e.connect(r, this, t);
        }

        if (n.firstFreeIfInputGeneralInCase && (0 == i || "*" == i || "" == i)) {
          r = e.findOutputSlotFree({
            typesNotAccepted: [m.EVENT]
          });
          if (r >= 0) return e.connect(r, this, t);
        }

        return console.debug("no way to connect byOUT type: ", i, " to sourceNODE ", e), null;
      }, s.prototype.connect = function (t, e, s) {
        if (s = s || 0, !this.graph) return console.log("Connect: Error, node doesn't belong to any graph. Nodes must be added first to a graph before connecting them."), null;

        if (t.constructor === String) {
          if (t = this.findOutputSlot(t), -1 == t) return m.debug && console.log("Connect: Error, no slot of name " + t), null;
        } else if (!this.outputs || t >= this.outputs.length) return m.debug && console.log("Connect: Error, slot number not found"), null;

        if (e && e.constructor === Number && (e = this.graph.getNodeById(e)), !e) throw "target node is null";
        if (e == this) return null;

        if (s.constructor === String) {
          if (s = e.findInputSlot(s), -1 == s) return m.debug && console.log("Connect: Error, no slot of name " + s), null;
        } else if (s === m.EVENT) {
          if (!m.do_add_triggers_slots) return null;
          e.changeMode(m.ON_TRIGGER), s = e.findInputSlot("onTrigger");
        } else if (!e.inputs || s >= e.inputs.length) return m.debug && console.log("Connect: Error, slot number not found"), null;

        var o = !1,
            n = e.inputs[s],
            r = null,
            a = this.outputs[t];
        if (!this.outputs[t]) return null;
        if (e.onBeforeConnectInput && (s = e.onBeforeConnectInput(s)), !1 === s || null === s || !m.isValidConnection(a.type, n.type)) return this.setDirtyCanvas(!1, !0), o && this.graph.connectionChange(this, r), null;
        if (e.onConnectInput && !1 === e.onConnectInput(s, a.type, a, this, t)) return null;
        if (this.onConnectOutput && !1 === this.onConnectOutput(t, n.type, n, e, s)) return null;
        if (e.inputs[s] && null != e.inputs[s].link && (this.graph.beforeChange(), e.disconnectInput(s, {
          doProcessChange: !1
        }), o = !0), null !== a.links && a.links.length) switch (a.type) {
          case m.EVENT:
            m.allow_multi_output_for_events || (this.graph.beforeChange(), this.disconnectOutput(t, !1, {
              doProcessChange: !1
            }), o = !0);
        }
        return r = new i(++this.graph.last_link_id, n.type || a.type, this.id, t, e.id, s), this.graph.links[r.id] = r, null == a.links && (a.links = []), a.links.push(r.id), e.inputs[s].link = r.id, this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(m.OUTPUT, t, !0, r, a), e.onConnectionsChange && e.onConnectionsChange(m.INPUT, s, !0, r, n), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(m.INPUT, e, s, this, t), this.graph.onNodeConnectionChange(m.OUTPUT, this, t, e, s)), this.setDirtyCanvas(!1, !0), this.graph.afterChange(), this.graph.connectionChange(this, r), r;
      }, s.prototype.disconnectOutput = function (t, e) {
        if (t.constructor === String) {
          if (t = this.findOutputSlot(t), -1 == t) return m.debug && console.log("Connect: Error, no slot of name " + t), !1;
        } else if (!this.outputs || t >= this.outputs.length) return m.debug && console.log("Connect: Error, slot number not found"), !1;

        var i = this.outputs[t];
        if (!i || !i.links || 0 == i.links.length) return !1;

        if (e) {
          if (e.constructor === Number && (e = this.graph.getNodeById(e)), !e) throw "Target Node not found";

          for (var s = 0, o = i.links.length; s < o; s++) {
            var n = i.links[s],
                r = this.graph.links[n];

            if (r.target_id == e.id) {
              i.links.splice(s, 1);
              var a = e.inputs[r.target_slot];
              a.link = null, delete this.graph.links[n], this.graph && this.graph._version++, e.onConnectionsChange && e.onConnectionsChange(m.INPUT, r.target_slot, !1, r, a), this.onConnectionsChange && this.onConnectionsChange(m.OUTPUT, t, !1, r, i), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(m.OUTPUT, this, t), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(m.OUTPUT, this, t), this.graph.onNodeConnectionChange(m.INPUT, e, r.target_slot));
              break;
            }
          }
        } else {
          for (s = 0, o = i.links.length; s < o; s++) {
            n = i.links[s], r = this.graph.links[n];

            if (r) {
              e = this.graph.getNodeById(r.target_id), a = null;
              this.graph && this.graph._version++, e && (a = e.inputs[r.target_slot], a.link = null, e.onConnectionsChange && e.onConnectionsChange(m.INPUT, r.target_slot, !1, r, a), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(m.INPUT, e, r.target_slot)), delete this.graph.links[n], this.onConnectionsChange && this.onConnectionsChange(m.OUTPUT, t, !1, r, i), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(m.OUTPUT, this, t), this.graph.onNodeConnectionChange(m.INPUT, e, r.target_slot));
            }
          }

          i.links = null;
        }

        return this.setDirtyCanvas(!1, !0), this.graph.connectionChange(this), !0;
      }, s.prototype.disconnectInput = function (t) {
        if (t.constructor === String) {
          if (t = this.findInputSlot(t), -1 == t) return m.debug && console.log("Connect: Error, no slot of name " + t), !1;
        } else if (!this.inputs || t >= this.inputs.length) return m.debug && console.log("Connect: Error, slot number not found"), !1;

        var e = this.inputs[t];
        if (!e) return !1;
        var i = this.inputs[t].link;

        if (null != i) {
          this.inputs[t].link = null;
          var s = this.graph.links[i];

          if (s) {
            var o = this.graph.getNodeById(s.origin_id);
            if (!o) return !1;
            var n = o.outputs[s.origin_slot];
            if (!n || !n.links || 0 == n.links.length) return !1;

            for (var r = 0, a = n.links.length; r < a; r++) if (n.links[r] == i) {
              n.links.splice(r, 1);
              break;
            }

            delete this.graph.links[i], this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(m.INPUT, t, !1, s, e), o.onConnectionsChange && o.onConnectionsChange(m.OUTPUT, r, !1, s, n), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(m.OUTPUT, o, r), this.graph.onNodeConnectionChange(m.INPUT, this, t));
          }
        }

        return this.setDirtyCanvas(!1, !0), this.graph && this.graph.connectionChange(this), !0;
      }, s.prototype.getConnectionPos = function (t, e, i) {
        i = i || new Float32Array(2);
        var s = 0;
        t && this.inputs && (s = this.inputs.length), !t && this.outputs && (s = this.outputs.length);
        var o = .5 * m.NODE_SLOT_HEIGHT;

        if (this.flags.collapsed) {
          var n = this._collapsed_width || m.NODE_COLLAPSED_WIDTH;
          return this.horizontal ? (i[0] = this.pos[0] + .5 * n, i[1] = t ? this.pos[1] - m.NODE_TITLE_HEIGHT : this.pos[1]) : (i[0] = t ? this.pos[0] : this.pos[0] + n, i[1] = this.pos[1] - .5 * m.NODE_TITLE_HEIGHT), i;
        }

        return t && -1 == e ? (i[0] = this.pos[0] + .5 * m.NODE_TITLE_HEIGHT, i[1] = this.pos[1] + .5 * m.NODE_TITLE_HEIGHT, i) : t && s > e && this.inputs[e].pos ? (i[0] = this.pos[0] + this.inputs[e].pos[0], i[1] = this.pos[1] + this.inputs[e].pos[1], i) : !t && s > e && this.outputs[e].pos ? (i[0] = this.pos[0] + this.outputs[e].pos[0], i[1] = this.pos[1] + this.outputs[e].pos[1], i) : this.horizontal ? (i[0] = this.pos[0] + (e + .5) * (this.size[0] / s), i[1] = t ? this.pos[1] - m.NODE_TITLE_HEIGHT : this.pos[1] + this.size[1], i) : (i[0] = t ? this.pos[0] + o : this.pos[0] + this.size[0] + 1 - o, i[1] = this.pos[1] + (e + .7) * m.NODE_SLOT_HEIGHT + (this.constructor.slot_start_y || 0), i);
      }, s.prototype.alignToGrid = function () {
        this.pos[0] = m.CANVAS_GRID_SIZE * Math.round(this.pos[0] / m.CANVAS_GRID_SIZE), this.pos[1] = m.CANVAS_GRID_SIZE * Math.round(this.pos[1] / m.CANVAS_GRID_SIZE);
      }, s.prototype.trace = function (t) {
        this.console || (this.console = []), this.console.push(t), this.console.length > s.MAX_CONSOLE && this.console.shift(), this.graph.onNodeTrace && this.graph.onNodeTrace(this, t);
      }, s.prototype.setDirtyCanvas = function (t, e) {
        this.graph && this.graph.sendActionToCanvas("setDirty", [t, e]);
      }, s.prototype.loadImage = function (t) {
        var e = new Image();
        e.src = m.node_images_path + t, e.ready = !1;
        var i = this;
        return e.onload = function () {
          this.ready = !0, i.setDirtyCanvas(!0);
        }, e;
      }, s.prototype.captureInput = function (t) {
        if (this.graph && this.graph.list_of_graphcanvas) for (var e = this.graph.list_of_graphcanvas, i = 0; i < e.length; ++i) {
          var s = e[i];
          (t || s.node_capturing_input == this) && (s.node_capturing_input = t ? this : null);
        }
      }, s.prototype.collapse = function (t) {
        this.graph._version++, (!1 !== this.constructor.collapsable || t) && (this.flags.collapsed ? this.flags.collapsed = !1 : this.flags.collapsed = !0, this.setDirtyCanvas(!0, !0));
      }, s.prototype.pin = function (t) {
        this.graph._version++, this.flags.pinned = void 0 === t ? !this.flags.pinned : t;
      }, s.prototype.localToScreen = function (t, e, i) {
        return [(t + this.pos[0]) * i.scale + i.offset[0], (e + this.pos[1]) * i.scale + i.offset[1]];
      }, t.LGraphGroup = m.LGraphGroup = o, o.prototype._ctor = function (t) {
        this.title = t || "Group", this.font_size = 24, this.color = r.node_colors.pale_blue ? r.node_colors.pale_blue.groupcolor : "#AAA", this._bounding = new Float32Array([10, 10, 140, 80]), this._pos = this._bounding.subarray(0, 2), this._size = this._bounding.subarray(2, 4), this._nodes = [], this.graph = null, Object.defineProperty(this, "pos", {
          set: function (t) {
            !t || t.length < 2 || (this._pos[0] = t[0], this._pos[1] = t[1]);
          },
          get: function () {
            return this._pos;
          },
          enumerable: !0
        }), Object.defineProperty(this, "size", {
          set: function (t) {
            !t || t.length < 2 || (this._size[0] = Math.max(140, t[0]), this._size[1] = Math.max(80, t[1]));
          },
          get: function () {
            return this._size;
          },
          enumerable: !0
        });
      }, o.prototype.configure = function (t) {
        this.title = t.title, this._bounding.set(t.bounding), this.color = t.color, this.font = t.font;
      }, o.prototype.serialize = function () {
        var t = this._bounding;
        return {
          title: this.title,
          bounding: [Math.round(t[0]), Math.round(t[1]), Math.round(t[2]), Math.round(t[3])],
          color: this.color,
          font: this.font
        };
      }, o.prototype.move = function (t, e, i) {
        if (this._pos[0] += t, this._pos[1] += e, !i) for (var s = 0; s < this._nodes.length; ++s) {
          var o = this._nodes[s];
          o.pos[0] += t, o.pos[1] += e;
        }
      }, o.prototype.recomputeInsideNodes = function () {
        this._nodes.length = 0;

        for (var t = this.graph._nodes, e = new Float32Array(4), i = 0; i < t.length; ++i) {
          var s = t[i];
          s.getBounding(e), c(this._bounding, e) && this._nodes.push(s);
        }
      }, o.prototype.isPointInside = s.prototype.isPointInside, o.prototype.setDirtyCanvas = s.prototype.setDirtyCanvas, m.DragAndScale = n, n.prototype.bindEvents = function (t) {
        this.last_mouse = new Float32Array(2), this._binded_mouse_callback = this.onMouse.bind(this), m.pointerListenerAdd(t, "down", this._binded_mouse_callback), m.pointerListenerAdd(t, "move", this._binded_mouse_callback), m.pointerListenerAdd(t, "up", this._binded_mouse_callback), t.addEventListener("mousewheel", this._binded_mouse_callback, !1), t.addEventListener("wheel", this._binded_mouse_callback, !1);
      }, n.prototype.computeVisibleArea = function (t) {
        if (this.element) {
          var e = this.element.width,
              i = this.element.height,
              s = -this.offset[0],
              o = -this.offset[1];
          t && (s += t[0] / this.scale, o += t[1] / this.scale, e = t[2], i = t[3]);
          var n = s + e / this.scale,
              r = o + i / this.scale;
          this.visible_area[0] = s, this.visible_area[1] = o, this.visible_area[2] = n - s, this.visible_area[3] = r - o;
        } else this.visible_area[0] = this.visible_area[1] = this.visible_area[2] = this.visible_area[3] = 0;
      }, n.prototype.onMouse = function (t) {
        if (this.enabled) {
          var e = this.element,
              i = e.getBoundingClientRect(),
              s = t.clientX - i.left,
              o = t.clientY - i.top;
          t.canvasx = s, t.canvasy = o, t.dragging = this.dragging;
          var n = !this.viewport || this.viewport && s >= this.viewport[0] && s < this.viewport[0] + this.viewport[2] && o >= this.viewport[1] && o < this.viewport[1] + this.viewport[3],
              r = !1;
          if (this.onmouse && (r = this.onmouse(t)), t.type == m.pointerevents_method + "down" && n) this.dragging = !0, m.pointerListenerRemove(e, "move", this._binded_mouse_callback), m.pointerListenerAdd(document, "move", this._binded_mouse_callback), m.pointerListenerAdd(document, "up", this._binded_mouse_callback);else if (t.type == m.pointerevents_method + "move") {
            if (!r) {
              var a = s - this.last_mouse[0],
                  u = o - this.last_mouse[1];
              this.dragging && this.mouseDrag(a, u);
            }
          } else t.type == m.pointerevents_method + "up" ? (this.dragging = !1, m.pointerListenerRemove(document, "move", this._binded_mouse_callback), m.pointerListenerRemove(document, "up", this._binded_mouse_callback), m.pointerListenerAdd(e, "move", this._binded_mouse_callback)) : !n || "mousewheel" != t.type && "wheel" != t.type && "DOMMouseScroll" != t.type || (t.eventType = "mousewheel", "wheel" == t.type ? t.wheel = -t.deltaY : t.wheel = null != t.wheelDeltaY ? t.wheelDeltaY : -60 * t.detail, t.delta = t.wheelDelta ? t.wheelDelta / 40 : t.deltaY ? -t.deltaY / 3 : 0, this.changeDeltaScale(1 + .05 * t.delta));
          return this.last_mouse[0] = s, this.last_mouse[1] = o, n ? (t.preventDefault(), t.stopPropagation(), !1) : void 0;
        }
      }, n.prototype.toCanvasContext = function (t) {
        t.scale(this.scale, this.scale), t.translate(this.offset[0], this.offset[1]);
      }, n.prototype.convertOffsetToCanvas = function (t) {
        return [(t[0] + this.offset[0]) * this.scale, (t[1] + this.offset[1]) * this.scale];
      }, n.prototype.convertCanvasToOffset = function (t, e) {
        return e = e || [0, 0], e[0] = t[0] / this.scale - this.offset[0], e[1] = t[1] / this.scale - this.offset[1], e;
      }, n.prototype.mouseDrag = function (t, e) {
        this.offset[0] += t / this.scale, this.offset[1] += e / this.scale, this.onredraw && this.onredraw(this);
      }, n.prototype.changeScale = function (t, e) {
        if (t < this.min_scale ? t = this.min_scale : t > this.max_scale && (t = this.max_scale), t != this.scale && this.element) {
          var i = this.element.getBoundingClientRect();

          if (i) {
            e = e || [.5 * i.width, .5 * i.height];
            var s = this.convertCanvasToOffset(e);
            this.scale = t, Math.abs(this.scale - 1) < .01 && (this.scale = 1);
            var o = this.convertCanvasToOffset(e),
                n = [o[0] - s[0], o[1] - s[1]];
            this.offset[0] += n[0], this.offset[1] += n[1], this.onredraw && this.onredraw(this);
          }
        }
      }, n.prototype.changeDeltaScale = function (t, e) {
        this.changeScale(this.scale * t, e);
      }, n.prototype.reset = function () {
        this.scale = 1, this.offset[0] = 0, this.offset[1] = 0;
      }, t.LGraphCanvas = m.LGraphCanvas = r, r.DEFAULT_BACKGROUND_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNrs1rEKwjAUhlETUkj3vP9rdmr1Ysammk2w5wdxuLgcMHyptfawuZX4pJSWZTnfnu/lnIe/jNNxHHGNn//HNbbv+4dr6V+11uF527arU7+u63qfa/bnmh8sWLBgwYJlqRf8MEptXPBXJXa37BSl3ixYsGDBMliwFLyCV/DeLIMFCxYsWLBMwSt4Be/NggXLYMGCBUvBK3iNruC9WbBgwYJlsGApeAWv4L1ZBgsWLFiwYJmCV/AK3psFC5bBggULloJX8BpdwXuzYMGCBctgwVLwCl7Be7MMFixYsGDBsu8FH1FaSmExVfAxBa/gvVmwYMGCZbBg/W4vAQYA5tRF9QYlv/QAAAAASUVORK5CYII=", r.link_type_colors = {
        "-1": m.EVENT_LINK_COLOR,
        number: "#AAA",
        node: "#DCA"
      }, r.gradients = {}, r.prototype.clear = function () {
        this.frame = 0, this.last_draw_time = 0, this.render_time = 0, this.fps = 0, this.dragging_rectangle = null, this.selected_nodes = {}, this.selected_group = null, this.visible_nodes = [], this.node_dragged = null, this.node_over = null, this.node_capturing_input = null, this.connecting_node = null, this.highlighted_links = {}, this.dragging_canvas = !1, this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.dirty_area = null, this.node_in_panel = null, this.node_widget = null, this.last_mouse = [0, 0], this.last_mouseclick = 0, this.pointer_is_down = !1, this.pointer_is_double = !1, this.visible_area.set([0, 0, 0, 0]), this.onClear && this.onClear();
      }, r.prototype.setGraph = function (t, e) {
        this.graph != t && (e || this.clear(), t || !this.graph ? (t.attachCanvas(this), this._graph_stack && (this._graph_stack = null), this.setDirty(!0, !0)) : this.graph.detachCanvas(this));
      }, r.prototype.getTopGraph = function () {
        return this._graph_stack.length ? this._graph_stack[0] : this.graph;
      }, r.prototype.openSubgraph = function (t) {
        if (!t) throw "graph cannot be null";
        if (this.graph == t) throw "graph cannot be the same";
        this.clear(), this.graph && (this._graph_stack || (this._graph_stack = []), this._graph_stack.push(this.graph)), t.attachCanvas(this), this.checkPanels(), this.setDirty(!0, !0);
      }, r.prototype.closeSubgraph = function () {
        if (this._graph_stack && 0 != this._graph_stack.length) {
          var t = this.graph._subgraph_node,
              e = this._graph_stack.pop();

          this.selected_nodes = {}, this.highlighted_links = {}, e.attachCanvas(this), this.setDirty(!0, !0), t && (this.centerOnNode(t), this.selectNodes([t])), this.ds.offset = [0, 0], this.ds.scale = 1;
        }
      }, r.prototype.getCurrentGraph = function () {
        return this.graph;
      }, r.prototype.setCanvas = function (t, e) {
        if (t && t.constructor === String && (t = document.getElementById(t), !t)) throw "Error creating LiteGraph canvas: Canvas not found";

        if (t !== this.canvas && (!t && this.canvas && (e || this.unbindEvents()), this.canvas = t, this.ds.element = t, t)) {
          if (t.className += " lgraphcanvas", t.data = this, t.tabindex = "1", this.bgcanvas = null, this.bgcanvas || (this.bgcanvas = document.createElement("canvas"), this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height), null == t.getContext) {
            if ("canvas" != t.localName) throw "Element supplied for LGraphCanvas must be a <canvas> element, you passed a " + t.localName;
            throw "This browser doesn't support Canvas";
          }

          var i = this.ctx = t.getContext("2d");
          null == i && (t.webgl_enabled || console.warn("This canvas seems to be WebGL, enabling WebGL renderer"), this.enableWebGL()), e || this.bindEvents();
        }
      }, r.prototype._doNothing = function (t) {
        return t.preventDefault(), !1;
      }, r.prototype._doReturnTrue = function (t) {
        return t.preventDefault(), !0;
      }, r.prototype.bindEvents = function () {
        if (this._events_binded) console.warn("LGraphCanvas: events already binded");else {
          var t = this.canvas,
              e = this.getCanvasWindow(),
              i = e.document;
          this._mousedown_callback = this.processMouseDown.bind(this), this._mousewheel_callback = this.processMouseWheel.bind(this), this._mousemove_callback = this.processMouseMove.bind(this), this._mouseup_callback = this.processMouseUp.bind(this), m.pointerListenerAdd(t, "down", this._mousedown_callback, !0), t.addEventListener("mousewheel", this._mousewheel_callback, !1), m.pointerListenerAdd(t, "up", this._mouseup_callback, !0), m.pointerListenerAdd(t, "move", this._mousemove_callback), t.addEventListener("contextmenu", this._doNothing), t.addEventListener("DOMMouseScroll", this._mousewheel_callback, !1), this._key_callback = this.processKey.bind(this), t.addEventListener("keydown", this._key_callback, !0), i.addEventListener("keyup", this._key_callback, !0), this._ondrop_callback = this.processDrop.bind(this), t.addEventListener("dragover", this._doNothing, !1), t.addEventListener("dragend", this._doNothing, !1), t.addEventListener("drop", this._ondrop_callback, !1), t.addEventListener("dragenter", this._doReturnTrue, !1), this._events_binded = !0;
        }
      }, r.prototype.unbindEvents = function () {
        if (this._events_binded) {
          var t = this.getCanvasWindow(),
              e = t.document;
          m.pointerListenerRemove(this.canvas, "move", this._mousedown_callback), m.pointerListenerRemove(this.canvas, "up", this._mousedown_callback), m.pointerListenerRemove(this.canvas, "down", this._mousedown_callback), this.canvas.removeEventListener("mousewheel", this._mousewheel_callback), this.canvas.removeEventListener("DOMMouseScroll", this._mousewheel_callback), this.canvas.removeEventListener("keydown", this._key_callback), e.removeEventListener("keyup", this._key_callback), this.canvas.removeEventListener("contextmenu", this._doNothing), this.canvas.removeEventListener("drop", this._ondrop_callback), this.canvas.removeEventListener("dragenter", this._doReturnTrue), this._mousedown_callback = null, this._mousewheel_callback = null, this._key_callback = null, this._ondrop_callback = null, this._events_binded = !1;
        } else console.warn("LGraphCanvas: no events binded");
      }, r.getFileExtension = function (t) {
        var e = t.indexOf("?");
        -1 != e && (t = t.substr(0, e));
        var i = t.lastIndexOf(".");
        return -1 == i ? "" : t.substr(i + 1).toLowerCase();
      }, r.prototype.enableWebGL = function () {
        if (void 0 === typeof GL) throw "litegl.js must be included to use a WebGL canvas";
        if (void 0 === typeof enableWebGLCanvas) throw "webglCanvas.js must be included to use this feature";
        this.gl = this.ctx = enableWebGLCanvas(this.canvas), this.ctx.webgl = !0, this.bgcanvas = this.canvas, this.bgctx = this.gl, this.canvas.webgl_enabled = !0;
      }, r.prototype.setDirty = function (t, e) {
        t && (this.dirty_canvas = !0), e && (this.dirty_bgcanvas = !0);
      }, r.prototype.getCanvasWindow = function () {
        if (!this.canvas) return window;
        var t = this.canvas.ownerDocument;
        return t.defaultView || t.parentWindow;
      }, r.prototype.startRendering = function () {
        function t() {
          this.pause_rendering || this.draw();
          var e = this.getCanvasWindow();
          this.is_rendering && e.requestAnimationFrame(t.bind(this));
        }

        this.is_rendering || (this.is_rendering = !0, t.call(this));
      }, r.prototype.stopRendering = function () {
        this.is_rendering = !1;
      }, r.prototype.blockClick = function () {
        this.block_click = !0, this.last_mouseclick = 0;
      }, r.prototype.processMouseDown = function (t) {
        if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), this.graph) {
          this.adjustMouseEvent(t);
          var e = this.getCanvasWindow();
          e.document;
          r.active_canvas = this;
          var i = this,
              s = t.clientX,
              o = t.clientY;
          this.ds.viewport = this.viewport;
          var n = !this.viewport || this.viewport && s >= this.viewport[0] && s < this.viewport[0] + this.viewport[2] && o >= this.viewport[1] && o < this.viewport[1] + this.viewport[3];

          if (this.options.skip_events || (m.pointerListenerRemove(this.canvas, "move", this._mousemove_callback), m.pointerListenerAdd(e.document, "move", this._mousemove_callback, !0), m.pointerListenerAdd(e.document, "up", this._mouseup_callback, !0)), n) {
            var a = this.graph.getNodeOnPos(t.canvasX, t.canvasY, this.visible_nodes, 5),
                h = !1,
                l = m.getTime(),
                d = void 0 === t.isPrimary || !t.isPrimary,
                c = l - this.last_mouseclick < 300 && d;

            if (this.mouse[0] = t.clientX, this.mouse[1] = t.clientY, this.graph_mouse[0] = t.canvasX, this.graph_mouse[1] = t.canvasY, this.last_click_position = [this.mouse[0], this.mouse[1]], this.pointer_is_down && d ? this.pointer_is_double = !0 : this.pointer_is_double = !1, this.pointer_is_down = !0, this.canvas.focus(), m.closeAllContextMenus(e), !this.onMouse || 1 != this.onMouse(t)) {
              if (1 != t.which || this.pointer_is_double) {
                if (2 == t.which) {
                  if (m.middle_click_slot_add_default_node && a && this.allow_interaction && !h && !this.read_only && !this.connecting_node && !a.flags.collapsed && !this.live_mode) {
                    var _ = !1,
                        g = !1,
                        f = !1;

                    if (a.outputs) for (T = 0, E = a.outputs.length; T < E; ++T) {
                      w = a.outputs[T], O = a.getConnectionPos(!1, T);

                      if (p(t.canvasX, t.canvasY, O[0] - 15, O[1] - 10, 30, 20)) {
                        _ = w, g = T, f = !0;
                        break;
                      }
                    }
                    if (a.inputs) for (T = 0, E = a.inputs.length; T < E; ++T) {
                      I = a.inputs[T], O = a.getConnectionPos(!0, T);

                      if (p(t.canvasX, t.canvasY, O[0] - 15, O[1] - 10, 30, 20)) {
                        _ = I, g = T, f = !1;
                        break;
                      }
                    }

                    if (_ && !1 !== g) {
                      var v = .5 - (g + 1) / (f ? a.outputs.length : a.inputs.length),
                          y = a.getBounding(),
                          x = [f ? y[0] + y[2] : y[0], t.canvasY - 80];
                      this.createDefaultNodeForSlot({
                        nodeFrom: f ? a : null,
                        slotFrom: f ? g : null,
                        nodeTo: f ? null : a,
                        slotTo: f ? null : g,
                        position: x,
                        nodeType: "AUTO",
                        posAdd: [f ? 30 : -30, 130 * -v],
                        posSizeFix: [f ? 0 : -1, 0]
                      });
                    }
                  }
                } else (3 == t.which || this.pointer_is_double) && (!this.allow_interaction || h || this.read_only || (a && (Object.keys(this.selected_nodes).length && (this.selected_nodes[a.id] || t.shiftKey || t.ctrlKey || t.metaKey) ? this.selected_nodes[a.id] || this.selectNodes([a], !0) : this.selectNodes([a])), this.processContextMenu(a, t)));
              } else {
                t.ctrlKey && (this.dragging_rectangle = new Float32Array(4), this.dragging_rectangle[0] = t.canvasX, this.dragging_rectangle[1] = t.canvasY, this.dragging_rectangle[2] = 1, this.dragging_rectangle[3] = 1, h = !0), m.alt_drag_do_clone_nodes && t.altKey && a && this.allow_interaction && !h && !this.read_only && (cloned = a.clone()) && (cloned.pos[0] += 5, cloned.pos[1] += 5, this.graph.add(cloned, !1, {
                  doCalcSize: !1
                }), a = cloned, h = !0, N || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = a), this.selected_nodes[a.id] || this.processNodeSelected(a, t)));
                var b = !1;

                if (a && this.allow_interaction && !h && !this.read_only) {
                  if (this.live_mode || a.flags.pinned || this.bringToFront(a), !this.connecting_node && !a.flags.collapsed && !this.live_mode) if (!h && !1 !== a.resizable && p(t.canvasX, t.canvasY, a.pos[0] + a.size[0] - 5, a.pos[1] + a.size[1] - 5, 10, 10)) this.graph.beforeChange(), this.resizing_node = a, this.canvas.style.cursor = "se-resize", h = !0;else {
                    if (a.outputs) for (var T = 0, E = a.outputs.length; T < E; ++T) {
                      var w = a.outputs[T],
                          O = a.getConnectionPos(!1, T);

                      if (p(t.canvasX, t.canvasY, O[0] - 15, O[1] - 10, 30, 20)) {
                        this.connecting_node = a, this.connecting_output = w, this.connecting_output.slot_index = T, this.connecting_pos = a.getConnectionPos(!1, T), this.connecting_slot = T, m.shift_click_do_break_link_from && t.shiftKey && a.disconnectOutput(T), c ? a.onOutputDblClick && a.onOutputDblClick(T, t) : a.onOutputClick && a.onOutputClick(T, t), h = !0;
                        break;
                      }
                    }
                    if (a.inputs) for (var T = 0, E = a.inputs.length; T < E; ++T) {
                      var I = a.inputs[T],
                          O = a.getConnectionPos(!0, T);

                      if (p(t.canvasX, t.canvasY, O[0] - 15, O[1] - 10, 30, 20)) {
                        if (c ? a.onInputDblClick && a.onInputDblClick(T, t) : a.onInputClick && a.onInputClick(T, t), null !== I.link) {
                          var D = this.graph.links[I.link];
                          m.click_do_break_link_to && (a.disconnectInput(T), this.dirty_bgcanvas = !0, h = !0), (this.allow_reconnect_links || t.shiftKey) && (m.click_do_break_link_to || a.disconnectInput(T), this.connecting_node = this.graph._nodes_by_id[D.origin_id], this.connecting_slot = D.origin_slot, this.connecting_output = this.connecting_node.outputs[this.connecting_slot], this.connecting_pos = this.connecting_node.getConnectionPos(!1, this.connecting_slot), this.dirty_bgcanvas = !0, h = !0);
                        }

                        h || (this.connecting_node = a, this.connecting_input = I, this.connecting_input.slot_index = T, this.connecting_pos = a.getConnectionPos(!0, T), this.connecting_slot = T, this.dirty_bgcanvas = !0, h = !0);
                      }
                    }
                  }

                  if (!h) {
                    var N = !1,
                        S = [t.canvasX - a.pos[0], t.canvasY - a.pos[1]],
                        C = this.processNodeWidgets(a, this.graph_mouse, t);
                    if (C && (N = !0, this.node_widget = [a, C]), c && this.selected_nodes[a.id] && (a.onDblClick && a.onDblClick(t, S, this), this.processNodeDblClicked(a), N = !0), a.onMouseDown && a.onMouseDown(t, S, this)) N = !0;else {
                      if (a.subgraph && !a.skip_subgraph_button && !a.flags.collapsed && S[0] > a.size[0] - m.NODE_TITLE_HEIGHT && S[1] < 0) {
                        i = this;
                        setTimeout(function () {
                          i.openSubgraph(a.subgraph);
                        }, 10);
                      }

                      this.live_mode && (b = !0, N = !0);
                    }
                    N || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = a), this.selected_nodes[a.id] || this.processNodeSelected(a, t)), this.dirty_canvas = !0;
                  }
                } else if (!h) {
                  if (!this.read_only) for (var T = 0; T < this.visible_links.length; ++T) {
                    var A = this.visible_links[T],
                        L = A._pos;

                    if (!(!L || t.canvasX < L[0] - 4 || t.canvasX > L[0] + 4 || t.canvasY < L[1] - 4 || t.canvasY > L[1] + 4)) {
                      this.showLinkMenu(A, t), this.over_link_center = null;
                      break;
                    }
                  }

                  if (this.selected_group = this.graph.getGroupOnPos(t.canvasX, t.canvasY), this.selected_group_resizing = !1, this.selected_group && !this.read_only) {
                    t.ctrlKey && (this.dragging_rectangle = null);
                    var k = u([t.canvasX, t.canvasY], [this.selected_group.pos[0] + this.selected_group.size[0], this.selected_group.pos[1] + this.selected_group.size[1]]);
                    k * this.ds.scale < 10 ? this.selected_group_resizing = !0 : this.selected_group.recomputeInsideNodes();
                  }

                  c && !this.read_only && this.allow_searchbox && (this.showSearchBox(t), t.preventDefault(), t.stopPropagation()), b = !0;
                }

                !h && b && this.allow_dragcanvas && (this.dragging_canvas = !0);
              }
              return this.last_mouse[0] = t.clientX, this.last_mouse[1] = t.clientY, this.last_mouseclick = m.getTime(), this.last_mouse_dragging = !0, this.graph.change(), (!e.document.activeElement || "input" != e.document.activeElement.nodeName.toLowerCase() && "textarea" != e.document.activeElement.nodeName.toLowerCase()) && t.preventDefault(), t.stopPropagation(), this.onMouseDown && this.onMouseDown(t), !1;
            }
          }
        }
      }, r.prototype.processMouseMove = function (t) {
        if (this.autoresize && this.resize(), this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), this.graph) {
          r.active_canvas = this, this.adjustMouseEvent(t);
          var e = [t.clientX, t.clientY];
          this.mouse[0] = e[0], this.mouse[1] = e[1];
          var i = [e[0] - this.last_mouse[0], e[1] - this.last_mouse[1]];
          if (this.last_mouse = e, this.graph_mouse[0] = t.canvasX, this.graph_mouse[1] = t.canvasY, this.block_click) return t.preventDefault(), !1;
          if (t.dragging = this.last_mouse_dragging, this.node_widget && (this.processNodeWidgets(this.node_widget[0], this.graph_mouse, t, this.node_widget[1]), this.dirty_canvas = !0), this.dragging_rectangle) this.dragging_rectangle[2] = t.canvasX - this.dragging_rectangle[0], this.dragging_rectangle[3] = t.canvasY - this.dragging_rectangle[1], this.dirty_canvas = !0;else if (this.selected_group && !this.read_only) {
            if (this.selected_group_resizing) this.selected_group.size = [t.canvasX - this.selected_group.pos[0], t.canvasY - this.selected_group.pos[1]];else {
              var s = i[0] / this.ds.scale,
                  o = i[1] / this.ds.scale;
              this.selected_group.move(s, o, t.ctrlKey), this.selected_group._nodes.length && (this.dirty_canvas = !0);
            }
            this.dirty_bgcanvas = !0;
          } else if (this.dragging_canvas) this.ds.offset[0] += i[0] / this.ds.scale, this.ds.offset[1] += i[1] / this.ds.scale, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;else if (this.allow_interaction && !this.read_only) {
            this.connecting_node && (this.dirty_canvas = !0);

            for (var n = this.graph.getNodeOnPos(t.canvasX, t.canvasY, this.visible_nodes), a = 0, u = this.graph._nodes.length; a < u; ++a) this.graph._nodes[a].mouseOver && n != this.graph._nodes[a] && (this.graph._nodes[a].mouseOver = !1, this.node_over && this.node_over.onMouseLeave && this.node_over.onMouseLeave(t), this.node_over = null, this.dirty_canvas = !0);

            if (n) {
              if (n.redraw_on_mouse && (this.dirty_canvas = !0), n.mouseOver || (n.mouseOver = !0, this.node_over = n, this.dirty_canvas = !0, n.onMouseEnter && n.onMouseEnter(t)), n.onMouseMove && n.onMouseMove(t, [t.canvasX - n.pos[0], t.canvasY - n.pos[1]], this), this.connecting_node) if (this.connecting_output) {
                var h = this._highlight_input || [0, 0];
                if (this.isOverNodeBox(n, t.canvasX, t.canvasY)) ;else {
                  var l = this.isOverNodeInput(n, t.canvasX, t.canvasY, h);

                  if (-1 != l && n.inputs[l]) {
                    var d = n.inputs[l].type;
                    m.isValidConnection(this.connecting_output.type, d) && (this._highlight_input = h, this._highlight_input_slot = n.inputs[l]);
                  } else this._highlight_input = null, this._highlight_input_slot = null;
                }
              } else if (this.connecting_input) {
                h = this._highlight_output || [0, 0];
                if (this.isOverNodeBox(n, t.canvasX, t.canvasY)) ;else {
                  l = this.isOverNodeOutput(n, t.canvasX, t.canvasY, h);

                  if (-1 != l && n.outputs[l]) {
                    d = n.outputs[l].type;
                    m.isValidConnection(this.connecting_input.type, d) && (this._highlight_output = h);
                  } else this._highlight_output = null;
                }
              }
              this.canvas && (p(t.canvasX, t.canvasY, n.pos[0] + n.size[0] - 5, n.pos[1] + n.size[1] - 5, 5, 5) ? this.canvas.style.cursor = "se-resize" : this.canvas.style.cursor = "crosshair");
            } else {
              var c = null;

              for (a = 0; a < this.visible_links.length; ++a) {
                var _ = this.visible_links[a],
                    g = _._pos;

                if (!(!g || t.canvasX < g[0] - 4 || t.canvasX > g[0] + 4 || t.canvasY < g[1] - 4 || t.canvasY > g[1] + 4)) {
                  c = _;
                  break;
                }
              }

              c != this.over_link_center && (this.over_link_center = c, this.dirty_canvas = !0), this.canvas && (this.canvas.style.cursor = "");
            }

            if (this.node_capturing_input && this.node_capturing_input != n && this.node_capturing_input.onMouseMove && this.node_capturing_input.onMouseMove(t, [t.canvasX - this.node_capturing_input.pos[0], t.canvasY - this.node_capturing_input.pos[1]], this), this.node_dragged && !this.live_mode) {
              for (var a in this.selected_nodes) {
                var f = this.selected_nodes[a];
                f.pos[0] += i[0] / this.ds.scale, f.pos[1] += i[1] / this.ds.scale;
              }

              this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
            }

            if (this.resizing_node && !this.live_mode) {
              var v = [t.canvasX - this.resizing_node.pos[0], t.canvasY - this.resizing_node.pos[1]],
                  y = this.resizing_node.computeSize();
              v[0] = Math.max(y[0], v[0]), v[1] = Math.max(y[1], v[1]), this.resizing_node.setSize(v), this.canvas.style.cursor = "se-resize", this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
            }
          }
          return t.preventDefault(), !1;
        }
      }, r.prototype.processMouseUp = function (t) {
        var e = void 0 === t.isPrimary || t.isPrimary;
        if (!e) return !1;

        if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), this.graph) {
          var i = this.getCanvasWindow(),
              s = i.document;
          r.active_canvas = this, this.options.skip_events || (m.pointerListenerRemove(s, "move", this._mousemove_callback, !0), m.pointerListenerAdd(this.canvas, "move", this._mousemove_callback, !0), m.pointerListenerRemove(s, "up", this._mouseup_callback, !0)), this.adjustMouseEvent(t);
          var o = m.getTime();

          if (t.click_time = o - this.last_mouseclick, this.last_mouse_dragging = !1, this.last_click_position = null, this.block_click && (this.block_click = !1), 1 == t.which) {
            if (this.node_widget && this.processNodeWidgets(this.node_widget[0], this.graph_mouse, t), this.node_widget = null, this.selected_group) {
              var n = this.selected_group.pos[0] - Math.round(this.selected_group.pos[0]),
                  a = this.selected_group.pos[1] - Math.round(this.selected_group.pos[1]);
              this.selected_group.move(n, a, t.ctrlKey), this.selected_group.pos[0] = Math.round(this.selected_group.pos[0]), this.selected_group.pos[1] = Math.round(this.selected_group.pos[1]), this.selected_group._nodes.length && (this.dirty_canvas = !0), this.selected_group = null;
            }

            this.selected_group_resizing = !1;
            var u = this.graph.getNodeOnPos(t.canvasX, t.canvasY, this.visible_nodes);

            if (this.dragging_rectangle) {
              if (this.graph) {
                var h = this.graph._nodes,
                    l = new Float32Array(4),
                    d = Math.abs(this.dragging_rectangle[2]),
                    _ = Math.abs(this.dragging_rectangle[3]),
                    g = this.dragging_rectangle[2] < 0 ? this.dragging_rectangle[0] - d : this.dragging_rectangle[0],
                    f = this.dragging_rectangle[3] < 0 ? this.dragging_rectangle[1] - _ : this.dragging_rectangle[1];

                if (this.dragging_rectangle[0] = g, this.dragging_rectangle[1] = f, this.dragging_rectangle[2] = d, this.dragging_rectangle[3] = _, !u || d > 10 && _ > 10) {
                  for (var v = [], y = 0; y < h.length; ++y) {
                    var x = h[y];
                    x.getBounding(l), c(this.dragging_rectangle, l) && v.push(x);
                  }

                  v.length && this.selectNodes(v, t.shiftKey);
                } else this.selectNodes([u], t.shiftKey || t.ctrlKey);
              }

              this.dragging_rectangle = null;
            } else if (this.connecting_node) {
              this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
              var b = this.connecting_output || this.connecting_input,
                  T = b.type;

              if (u) {
                if (this.connecting_output) {
                  var E = this.isOverNodeInput(u, t.canvasX, t.canvasY);
                  -1 != E ? this.connecting_node.connect(this.connecting_slot, u, E) : this.connecting_node.connectByType(this.connecting_slot, u, T);
                } else if (this.connecting_input) {
                  E = this.isOverNodeOutput(u, t.canvasX, t.canvasY);
                  -1 != E ? u.connect(E, this.connecting_node, this.connecting_slot) : this.connecting_node.connectByTypeOutput(this.connecting_slot, u, T);
                }
              } else m.release_link_on_empty_shows_menu && (t.shiftKey && this.allow_searchbox ? this.connecting_output ? this.showSearchBox(t, {
                node_from: this.connecting_node,
                slot_from: this.connecting_output,
                type_filter_in: this.connecting_output.type
              }) : this.connecting_input && this.showSearchBox(t, {
                node_to: this.connecting_node,
                slot_from: this.connecting_input,
                type_filter_out: this.connecting_input.type
              }) : this.connecting_output ? this.showConnectionMenu({
                nodeFrom: this.connecting_node,
                slotFrom: this.connecting_output,
                e: t
              }) : this.connecting_input && this.showConnectionMenu({
                nodeTo: this.connecting_node,
                slotTo: this.connecting_input,
                e: t
              }));

              this.connecting_output = null, this.connecting_input = null, this.connecting_pos = null, this.connecting_node = null, this.connecting_slot = -1;
            } else if (this.resizing_node) this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.graph.afterChange(this.resizing_node), this.resizing_node = null;else if (this.node_dragged) {
              u = this.node_dragged;
              u && t.click_time < 300 && p(t.canvasX, t.canvasY, u.pos[0], u.pos[1] - m.NODE_TITLE_HEIGHT, m.NODE_TITLE_HEIGHT, m.NODE_TITLE_HEIGHT) && u.collapse(), this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.node_dragged.pos[0] = Math.round(this.node_dragged.pos[0]), this.node_dragged.pos[1] = Math.round(this.node_dragged.pos[1]), (this.graph.config.align_to_grid || this.align_to_grid) && this.node_dragged.alignToGrid(), this.onNodeMoved && this.onNodeMoved(this.node_dragged), this.graph.afterChange(this.node_dragged), this.node_dragged = null;
            } else {
              u = this.graph.getNodeOnPos(t.canvasX, t.canvasY, this.visible_nodes);
              !u && t.click_time < 300 && this.deselectAllNodes(), this.dirty_canvas = !0, this.dragging_canvas = !1, this.node_over && this.node_over.onMouseUp && this.node_over.onMouseUp(t, [t.canvasX - this.node_over.pos[0], t.canvasY - this.node_over.pos[1]], this), this.node_capturing_input && this.node_capturing_input.onMouseUp && this.node_capturing_input.onMouseUp(t, [t.canvasX - this.node_capturing_input.pos[0], t.canvasY - this.node_capturing_input.pos[1]]);
            }
          } else 2 == t.which ? (this.dirty_canvas = !0, this.dragging_canvas = !1) : 3 == t.which && (this.dirty_canvas = !0, this.dragging_canvas = !1);

          return e && (this.pointer_is_down = !1, this.pointer_is_double = !1), this.graph.change(), t.stopPropagation(), t.preventDefault(), !1;
        }
      }, r.prototype.processMouseWheel = function (t) {
        if (this.graph && this.allow_dragcanvas) {
          var e = null != t.wheelDeltaY ? t.wheelDeltaY : -60 * t.detail;
          this.adjustMouseEvent(t);
          var i = t.clientX,
              s = t.clientY,
              o = !this.viewport || this.viewport && i >= this.viewport[0] && i < this.viewport[0] + this.viewport[2] && s >= this.viewport[1] && s < this.viewport[1] + this.viewport[3];

          if (o) {
            var n = this.ds.scale;
            return e > 0 ? n *= 1.1 : e < 0 && (n *= 1 / 1.1), this.ds.changeScale(n, [t.clientX, t.clientY]), this.graph.change(), t.preventDefault(), !1;
          }
        }
      }, r.prototype.isOverNodeBox = function (t, e, i) {
        var s = m.NODE_TITLE_HEIGHT;
        return !!p(e, i, t.pos[0] + 2, t.pos[1] + 2 - s, s - 4, s - 4);
      }, r.prototype.isOverNodeInput = function (t, e, i, s) {
        if (t.inputs) for (var o = 0, n = t.inputs.length; o < n; ++o) {
          t.inputs[o];
          var r = t.getConnectionPos(!0, o),
              a = !1;
          if (a = t.horizontal ? p(e, i, r[0] - 5, r[1] - 10, 10, 20) : p(e, i, r[0] - 10, r[1] - 5, 40, 10), a) return s && (s[0] = r[0], s[1] = r[1]), o;
        }
        return -1;
      }, r.prototype.isOverNodeOutput = function (t, e, i, s) {
        if (t.outputs) for (var o = 0, n = t.outputs.length; o < n; ++o) {
          t.outputs[o];
          var r = t.getConnectionPos(!1, o),
              a = !1;
          if (a = t.horizontal ? p(e, i, r[0] - 5, r[1] - 10, 10, 20) : p(e, i, r[0] - 10, r[1] - 5, 40, 10), a) return s && (s[0] = r[0], s[1] = r[1]), o;
        }
        return -1;
      }, r.prototype.processKey = function (t) {
        if (this.graph) {
          var e = !1;

          if ("input" != t.target.localName) {
            if ("keydown" == t.type) {
              if (32 == t.keyCode && (this.dragging_canvas = !0, e = !0), 27 == t.keyCode && (this.node_panel && this.node_panel.close(), this.options_panel && this.options_panel.close(), e = !0), 65 == t.keyCode && t.ctrlKey && (this.selectNodes(), e = !0), "KeyC" != t.code || !t.metaKey && !t.ctrlKey || t.shiftKey || this.selected_nodes && (this.copyToClipboard(), e = !0), "KeyV" != t.code || !t.metaKey && !t.ctrlKey || t.shiftKey || this.pasteFromClipboard(), 46 != t.keyCode && 8 != t.keyCode || "input" != t.target.localName && "textarea" != t.target.localName && (this.deleteSelectedNodes(), e = !0), this.selected_nodes) for (var i in this.selected_nodes) this.selected_nodes[i].onKeyDown && this.selected_nodes[i].onKeyDown(t);
            } else if ("keyup" == t.type && (32 == t.keyCode && (this.dragging_canvas = !1), this.selected_nodes)) for (var i in this.selected_nodes) this.selected_nodes[i].onKeyUp && this.selected_nodes[i].onKeyUp(t);

            return this.graph.change(), e ? (t.preventDefault(), t.stopImmediatePropagation(), !1) : void 0;
          }
        }
      }, r.prototype.copyToClipboard = function () {
        var t = {
          nodes: [],
          links: []
        },
            e = 0,
            i = [];

        for (var s in this.selected_nodes) {
          var o = this.selected_nodes[s];
          o._relative_id = e, i.push(o), e += 1;
        }

        for (s = 0; s < i.length; ++s) {
          o = i[s];
          var n = o.clone();

          if (n) {
            if (t.nodes.push(n.serialize()), o.inputs && o.inputs.length) for (var r = 0; r < o.inputs.length; ++r) {
              var a = o.inputs[r];

              if (a && null != a.link) {
                var u = this.graph.links[a.link];

                if (u) {
                  var h = this.graph.getNodeById(u.origin_id);
                  h && this.selected_nodes[h.id] && t.links.push([h._relative_id, u.origin_slot, o._relative_id, u.target_slot]);
                }
              }
            }
          } else console.warn("node type not found: " + o.type);
        }

        localStorage.setItem("litegrapheditor_clipboard", JSON.stringify(t));
      }, r.prototype.pasteFromClipboard = function () {
        var t = localStorage.getItem("litegrapheditor_clipboard");

        if (t) {
          this.graph.beforeChange();

          for (var e = JSON.parse(t), i = !1, s = !1, o = 0; o < e.nodes.length; ++o) i ? (i[0] > e.nodes[o].pos[0] && (i[0] = e.nodes[o].pos[0], s[0] = o), i[1] > e.nodes[o].pos[1] && (i[1] = e.nodes[o].pos[1], s[1] = o)) : (i = [e.nodes[o].pos[0], e.nodes[o].pos[1]], s = [o, o]);

          var n = [];

          for (o = 0; o < e.nodes.length; ++o) {
            var r = e.nodes[o],
                a = m.createNode(r.type);
            a && (a.configure(r), a.pos[0] += this.graph_mouse[0] - i[0], a.pos[1] += this.graph_mouse[1] - i[1], this.graph.add(a, {
              doProcessChange: !1
            }), n.push(a));
          }

          for (o = 0; o < e.links.length; ++o) {
            var u = e.links[o],
                h = n[u[0]],
                p = n[u[2]];
            h && p ? h.connect(u[1], p, u[3]) : console.warn("Warning, nodes missing on pasting");
          }

          this.selectNodes(n), this.graph.afterChange();
        }
      }, r.prototype.processDrop = function (t) {
        t.preventDefault(), this.adjustMouseEvent(t);
        var e = t.clientX,
            i = t.clientY,
            s = !this.viewport || this.viewport && e >= this.viewport[0] && e < this.viewport[0] + this.viewport[2] && i >= this.viewport[1] && i < this.viewport[1] + this.viewport[3];

        if (s) {
          var o = [t.canvasX, t.canvasY],
              n = this.graph ? this.graph.getNodeOnPos(o[0], o[1]) : null;

          if (!n) {
            var a = null;
            return this.onDropItem && (a = this.onDropItem(event)), void (a || this.checkDropItem(t));
          }

          if (n.onDropFile || n.onDropData) {
            var u = t.dataTransfer.files;
            if (u && u.length) for (var h = 0; h < u.length; h++) {
              var p = t.dataTransfer.files[0],
                  l = p.name;
              r.getFileExtension(l);

              if (n.onDropFile && n.onDropFile(p), n.onDropData) {
                var d = new FileReader();

                d.onload = function (t) {
                  var e = t.target.result;
                  n.onDropData(e, l, p);
                };

                var c = p.type.split("/")[0];
                "text" == c || "" == c ? d.readAsText(p) : "image" == c ? d.readAsDataURL(p) : d.readAsArrayBuffer(p);
              }
            }
          }

          return !(!n.onDropItem || !n.onDropItem(event)) || !!this.onDropItem && this.onDropItem(event);
        }
      }, r.prototype.checkDropItem = function (t) {
        if (t.dataTransfer.files.length) {
          var e = t.dataTransfer.files[0],
              i = r.getFileExtension(e.name).toLowerCase(),
              s = m.node_types_by_file_extension[i];

          if (s) {
            this.graph.beforeChange();
            var o = m.createNode(s.type);
            o.pos = [t.canvasX, t.canvasY], this.graph.add(o), o.onDropFile && o.onDropFile(e), this.graph.afterChange();
          }
        }
      }, r.prototype.processNodeDblClicked = function (t) {
        this.onShowNodePanel ? this.onShowNodePanel(t) : this.showShowNodePanel(t), this.onNodeDblClicked && this.onNodeDblClicked(t), this.setDirty(!0);
      }, r.prototype.processNodeSelected = function (t, e) {
        this.selectNode(t, e && (e.shiftKey || e.ctrlKey)), this.onNodeSelected && this.onNodeSelected(t);
      }, r.prototype.selectNode = function (t, e) {
        null == t ? this.deselectAllNodes() : this.selectNodes([t], e);
      }, r.prototype.selectNodes = function (t, e) {
        for (var i in e || this.deselectAllNodes(), t = t || this.graph._nodes, "string" == typeof t && (t = [t]), t) {
          var s = t[i];

          if (!s.is_selected) {
            if (!s.is_selected && s.onSelected && s.onSelected(), s.is_selected = !0, this.selected_nodes[s.id] = s, s.inputs) for (var o = 0; o < s.inputs.length; ++o) this.highlighted_links[s.inputs[o].link] = !0;
            if (s.outputs) for (o = 0; o < s.outputs.length; ++o) {
              var n = s.outputs[o];
              if (n.links) for (var r = 0; r < n.links.length; ++r) this.highlighted_links[n.links[r]] = !0;
            }
          }
        }

        this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
      }, r.prototype.deselectNode = function (t) {
        if (t.is_selected) {
          if (t.onDeselected && t.onDeselected(), t.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(t), t.inputs) for (var e = 0; e < t.inputs.length; ++e) delete this.highlighted_links[t.inputs[e].link];
          if (t.outputs) for (e = 0; e < t.outputs.length; ++e) {
            var i = t.outputs[e];
            if (i.links) for (var s = 0; s < i.links.length; ++s) delete this.highlighted_links[i.links[s]];
          }
        }
      }, r.prototype.deselectAllNodes = function () {
        if (this.graph) {
          for (var t = this.graph._nodes, e = 0, i = t.length; e < i; ++e) {
            var s = t[e];
            s.is_selected && (s.onDeselected && s.onDeselected(), s.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(s));
          }

          this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
        }
      }, r.prototype.deleteSelectedNodes = function () {
        for (var t in this.graph.beforeChange(), this.selected_nodes) {
          var e = this.selected_nodes[t];

          if (!e.block_delete) {
            if (e.inputs && e.inputs.length && e.outputs && e.outputs.length && m.isValidConnection(e.inputs[0].type, e.outputs[0].type) && e.inputs[0].link && e.outputs[0].links && e.outputs[0].links.length) {
              var i = e.graph.links[e.inputs[0].link],
                  s = e.graph.links[e.outputs[0].links[0]],
                  o = e.getInputNode(0),
                  n = e.getOutputNodes(0)[0];
              o && n && o.connect(i.origin_slot, n, s.target_slot);
            }

            this.graph.remove(e), this.onNodeDeselected && this.onNodeDeselected(e);
          }
        }

        this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.setDirty(!0), this.graph.afterChange();
      }, r.prototype.centerOnNode = function (t) {
        this.ds.offset[0] = -t.pos[0] - .5 * t.size[0] + .5 * this.canvas.width / this.ds.scale, this.ds.offset[1] = -t.pos[1] - .5 * t.size[1] + .5 * this.canvas.height / this.ds.scale, this.setDirty(!0, !0);
      }, r.prototype.adjustMouseEvent = function (t) {
        var e = 0,
            i = 0;

        if (this.canvas) {
          var s = this.canvas.getBoundingClientRect();
          e = t.clientX - s.left, i = t.clientY - s.top;
        } else e = t.clientX, i = t.clientY;

        t.deltaX = e - this.last_mouse_position[0], t.deltaY = i - this.last_mouse_position[1], this.last_mouse_position[0] = e, this.last_mouse_position[1] = i, t.canvasX = e / this.ds.scale - this.ds.offset[0], t.canvasY = i / this.ds.scale - this.ds.offset[1];
      }, r.prototype.setZoom = function (t, e) {
        this.ds.changeScale(t, e), this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
      }, r.prototype.convertOffsetToCanvas = function (t, e) {
        return this.ds.convertOffsetToCanvas(t, e);
      }, r.prototype.convertCanvasToOffset = function (t, e) {
        return this.ds.convertCanvasToOffset(t, e);
      }, r.prototype.convertEventToCanvasOffset = function (t) {
        var e = this.canvas.getBoundingClientRect();
        return this.convertCanvasToOffset([t.clientX - e.left, t.clientY - e.top]);
      }, r.prototype.bringToFront = function (t) {
        var e = this.graph._nodes.indexOf(t);

        -1 != e && (this.graph._nodes.splice(e, 1), this.graph._nodes.push(t));
      }, r.prototype.sendToBack = function (t) {
        var e = this.graph._nodes.indexOf(t);

        -1 != e && (this.graph._nodes.splice(e, 1), this.graph._nodes.unshift(t));
      };
      var y = new Float32Array(4);
      r.prototype.computeVisibleNodes = function (t, e) {
        var i = e || [];
        i.length = 0, t = t || this.graph._nodes;

        for (var s = 0, o = t.length; s < o; ++s) {
          var n = t[s];
          (!this.live_mode || n.onDrawBackground || n.onDrawForeground) && c(this.visible_area, n.getBounding(y)) && i.push(n);
        }

        return i;
      }, r.prototype.draw = function (t, e) {
        if (this.canvas && 0 != this.canvas.width && 0 != this.canvas.height) {
          var i = m.getTime();
          this.render_time = .001 * (i - this.last_draw_time), this.last_draw_time = i, this.graph && this.ds.computeVisibleArea(this.viewport), (this.dirty_bgcanvas || e || this.always_render_background || this.graph && this.graph._last_trigger_time && i - this.graph._last_trigger_time < 1e3) && this.drawBackCanvas(), (this.dirty_canvas || t) && this.drawFrontCanvas(), this.fps = this.render_time ? 1 / this.render_time : 0, this.frame += 1;
        }
      }, r.prototype.drawFrontCanvas = function () {
        this.dirty_canvas = !1, this.ctx || (this.ctx = this.bgcanvas.getContext("2d"));
        var t = this.ctx;

        if (t) {
          var e = this.canvas;
          t.start2D && !this.viewport && (t.start2D(), t.restore(), t.setTransform(1, 0, 0, 1, 0, 0));
          var i = this.viewport || this.dirty_area;

          if (i && (t.save(), t.beginPath(), t.rect(i[0], i[1], i[2], i[3]), t.clip()), this.clear_background && (i ? t.clearRect(i[0], i[1], i[2], i[3]) : t.clearRect(0, 0, e.width, e.height)), this.bgcanvas == this.canvas ? this.drawBackCanvas() : t.drawImage(this.bgcanvas, 0, 0), this.onRender && this.onRender(e, t), this.show_info && this.renderInfo(t, i ? i[0] : 0, i ? i[1] : 0), this.graph) {
            t.save(), this.ds.toCanvasContext(t);

            for (var s = this.computeVisibleNodes(null, this.visible_nodes), o = 0; o < s.length; ++o) {
              var n = s[o];
              t.save(), t.translate(n.pos[0], n.pos[1]), this.drawNode(n, t), 1, t.restore();
            }

            if (this.render_execution_order && this.drawExecutionOrder(t), this.graph.config.links_ontop && (this.live_mode || this.drawConnections(t)), null != this.connecting_pos) {
              t.lineWidth = this.connections_width;
              var r = null,
                  a = this.connecting_output || this.connecting_input,
                  u = a.type,
                  h = a.dir;
              null == h && (h = this.connecting_output ? this.connecting_node.horizontal ? m.DOWN : m.RIGHT : this.connecting_node.horizontal ? m.UP : m.LEFT);
              var p = a.shape;

              switch (u) {
                case m.EVENT:
                  r = m.EVENT_LINK_COLOR;
                  break;

                default:
                  r = m.CONNECTING_LINK_COLOR;
              }

              if (this.renderLink(t, this.connecting_pos, [this.graph_mouse[0], this.graph_mouse[1]], null, !1, null, r, h, m.CENTER), t.beginPath(), u === m.EVENT || p === m.BOX_SHAPE ? (t.rect(this.connecting_pos[0] - 6 + .5, this.connecting_pos[1] - 5 + .5, 14, 10), t.fill(), t.beginPath(), t.rect(this.graph_mouse[0] - 6 + .5, this.graph_mouse[1] - 5 + .5, 14, 10)) : p === m.ARROW_SHAPE ? (t.moveTo(this.connecting_pos[0] + 8, this.connecting_pos[1] + .5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] + 6 + .5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] - 6 + .5), t.closePath()) : (t.arc(this.connecting_pos[0], this.connecting_pos[1], 4, 0, 2 * Math.PI), t.fill(), t.beginPath(), t.arc(this.graph_mouse[0], this.graph_mouse[1], 4, 0, 2 * Math.PI)), t.fill(), t.fillStyle = "#ffcc00", this._highlight_input) {
                t.beginPath();
                var l = this._highlight_input_slot.shape;
                l === m.ARROW_SHAPE ? (t.moveTo(this._highlight_input[0] + 8, this._highlight_input[1] + .5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] + 6 + .5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] - 6 + .5), t.closePath()) : t.arc(this._highlight_input[0], this._highlight_input[1], 6, 0, 2 * Math.PI), t.fill();
              }

              this._highlight_output && (t.beginPath(), l === m.ARROW_SHAPE ? (t.moveTo(this._highlight_output[0] + 8, this._highlight_output[1] + .5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] + 6 + .5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] - 6 + .5), t.closePath()) : t.arc(this._highlight_output[0], this._highlight_output[1], 6, 0, 2 * Math.PI), t.fill());
            }

            this.dragging_rectangle && (t.strokeStyle = "#FFF", t.strokeRect(this.dragging_rectangle[0], this.dragging_rectangle[1], this.dragging_rectangle[2], this.dragging_rectangle[3])), this.over_link_center && this.render_link_tooltip ? this.drawLinkTooltip(t, this.over_link_center) : this.onDrawLinkTooltip && this.onDrawLinkTooltip(t, null), this.onDrawForeground && this.onDrawForeground(t, this.visible_rect), t.restore();
          }

          this._graph_stack && this._graph_stack.length && this.drawSubgraphPanel(t), this.onDrawOverlay && this.onDrawOverlay(t), i && t.restore(), t.finish2D && t.finish2D();
        }
      }, r.prototype.drawSubgraphPanel = function (t) {
        var e = this.graph,
            i = e._subgraph_node;
        i ? (this.drawSubgraphPanelLeft(e, i, t), this.drawSubgraphPanelRight(e, i, t)) : console.warn("subgraph without subnode");
      }, r.prototype.drawSubgraphPanelLeft = function (t, e, i) {
        var s = e.inputs ? e.inputs.length : 0,
            o = 200,
            n = Math.floor(1.6 * m.NODE_SLOT_HEIGHT);
        if (i.fillStyle = "#111", i.globalAlpha = .8, i.beginPath(), i.roundRect(10, 10, o, (s + 1) * n + 50, [8]), i.fill(), i.globalAlpha = 1, i.fillStyle = "#888", i.font = "14px Arial", i.textAlign = "left", i.fillText("Graph Inputs", 20, 34), this.drawButton(o - 20, 20, 20, 20, "X", "#151515")) this.closeSubgraph();else {
          var r = 50;
          if (i.font = "14px Arial", e.inputs) for (var a = 0; a < e.inputs.length; ++a) {
            var u = e.inputs[a];

            if (!u.not_subgraph_input) {
              if (this.drawButton(20, r + 2, o - 20, n - 2)) {
                var h = e.constructor.input_node_type || "graph/input";
                this.graph.beforeChange();
                var p = m.createNode(h);
                p ? (t.add(p), this.block_click = !1, this.last_click_position = null, this.selectNodes([p]), this.node_dragged = p, this.dragging_canvas = !1, p.setProperty("name", u.name), p.setProperty("type", u.type), this.node_dragged.pos[0] = this.graph_mouse[0] - 5, this.node_dragged.pos[1] = this.graph_mouse[1] - 5, this.graph.afterChange()) : console.error("graph input node not found:", h);
              }

              i.fillStyle = "#9C9", i.beginPath(), i.arc(o - 16, r + .5 * n, 5, 0, 2 * Math.PI), i.fill(), i.fillStyle = "#AAA", i.fillText(u.name, 30, r + .75 * n), i.fillStyle = "#777", i.fillText(u.type, 130, r + .75 * n), r += n;
            }
          }
          this.drawButton(20, r + 2, o - 20, n - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialog(e);
        }
      }, r.prototype.drawSubgraphPanelRight = function (t, e, i) {
        var s = e.outputs ? e.outputs.length : 0,
            o = this.bgcanvas.width,
            n = 200,
            r = Math.floor(1.6 * m.NODE_SLOT_HEIGHT);
        i.fillStyle = "#111", i.globalAlpha = .8, i.beginPath(), i.roundRect(o - n - 10, 10, n, (s + 1) * r + 50, [8]), i.fill(), i.globalAlpha = 1, i.fillStyle = "#888", i.font = "14px Arial", i.textAlign = "left";
        var a = "Graph Outputs",
            u = i.measureText(a).width;
        if (i.fillText(a, o - u - 20, 34), this.drawButton(o - n, 20, 20, 20, "X", "#151515")) this.closeSubgraph();else {
          var h = 50;
          if (i.font = "14px Arial", e.outputs) for (var p = 0; p < e.outputs.length; ++p) {
            var l = e.outputs[p];

            if (!l.not_subgraph_input) {
              if (this.drawButton(o - n, h + 2, n - 20, r - 2)) {
                var d = e.constructor.output_node_type || "graph/output";
                this.graph.beforeChange();
                var c = m.createNode(d);
                c ? (t.add(c), this.block_click = !1, this.last_click_position = null, this.selectNodes([c]), this.node_dragged = c, this.dragging_canvas = !1, c.setProperty("name", l.name), c.setProperty("type", l.type), this.node_dragged.pos[0] = this.graph_mouse[0] - 5, this.node_dragged.pos[1] = this.graph_mouse[1] - 5, this.graph.afterChange()) : console.error("graph input node not found:", d);
              }

              i.fillStyle = "#9C9", i.beginPath(), i.arc(o - n + 16, h + .5 * r, 5, 0, 2 * Math.PI), i.fill(), i.fillStyle = "#AAA", i.fillText(l.name, o - n + 30, h + .75 * r), i.fillStyle = "#777", i.fillText(l.type, o - n + 130, h + .75 * r), h += r;
            }
          }
          this.drawButton(o - n, h + 2, n - 20, r - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialogRight(e);
        }
      }, r.prototype.drawButton = function (t, e, i, s, o, n, r, a) {
        var u = this.ctx;
        n = n || m.NODE_DEFAULT_COLOR, r = r || "#555", a = a || m.NODE_TEXT_COLOR;
        var h = e + m.NODE_TITLE_HEIGHT + 2,
            p = this.mouse,
            l = m.isInsideRectangle(p[0], p[1], t, h, i, s);
        p = this.last_click_position;
        var d = p && m.isInsideRectangle(p[0], p[1], t, h, i, s);
        u.fillStyle = l ? r : n, d && (u.fillStyle = "#AAA"), u.beginPath(), u.roundRect(t, e, i, s, [4]), u.fill(), null != o && o.constructor == String && (u.fillStyle = a, u.textAlign = "center", u.font = (.65 * s | 0) + "px Arial", u.fillText(o, t + .5 * i, e + .75 * s), u.textAlign = "left");
        var c = d && !this.block_click;
        return d && this.blockClick(), c;
      }, r.prototype.isAreaClicked = function (t, e, i, s, o) {
        var n = this.mouse;
        m.isInsideRectangle(n[0], n[1], t, e, i, s);
        n = this.last_click_position;
        var r = n && m.isInsideRectangle(n[0], n[1], t, e, i, s),
            a = r && !this.block_click;
        return r && o && this.blockClick(), a;
      }, r.prototype.renderInfo = function (t, e, i) {
        e = e || 10, i = i || this.canvas.height - 80, t.save(), t.translate(e, i), t.font = "10px Arial", t.fillStyle = "#888", t.textAlign = "left", this.graph ? (t.fillText("T: " + this.graph.globaltime.toFixed(2) + "s", 5, 13), t.fillText("I: " + this.graph.iteration, 5, 26), t.fillText("N: " + this.graph._nodes.length + " [" + this.visible_nodes.length + "]", 5, 39), t.fillText("V: " + this.graph._version, 5, 52), t.fillText("FPS:" + this.fps.toFixed(2), 5, 65)) : t.fillText("No graph selected", 5, 13), t.restore();
      }, r.prototype.drawBackCanvas = function () {
        var t = this.bgcanvas;
        t.width == this.canvas.width && t.height == this.canvas.height || (t.width = this.canvas.width, t.height = this.canvas.height), this.bgctx || (this.bgctx = this.bgcanvas.getContext("2d"));
        var e = this.bgctx;
        e.start && e.start();
        var i = this.viewport || [0, 0, e.canvas.width, e.canvas.height];

        if (this.clear_background && e.clearRect(i[0], i[1], i[2], i[3]), this._graph_stack && this._graph_stack.length) {
          e.save();
          this._graph_stack[this._graph_stack.length - 1];
          var s = this.graph._subgraph_node;
          e.strokeStyle = s.bgcolor, e.lineWidth = 10, e.strokeRect(1, 1, t.width - 2, t.height - 2), e.lineWidth = 1, e.font = "40px Arial", e.textAlign = "center", e.fillStyle = s.bgcolor || "#AAA";

          for (var o = "", n = 1; n < this._graph_stack.length; ++n) o += this._graph_stack[n]._subgraph_node.getTitle() + " >> ";

          e.fillText(o + s.getTitle(), .5 * t.width, 40), e.restore();
        }

        var r = !1;

        if (this.onRenderBackground && (r = this.onRenderBackground(t, e)), this.viewport || (e.restore(), e.setTransform(1, 0, 0, 1, 0, 0)), this.visible_links.length = 0, this.graph) {
          if (e.save(), this.ds.toCanvasContext(e), this.background_image && this.ds.scale > .5 && !r) {
            if (this.zoom_modify_alpha ? e.globalAlpha = (1 - .5 / this.ds.scale) * this.editor_alpha : e.globalAlpha = this.editor_alpha, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !1, !this._bg_img || this._bg_img.name != this.background_image) {
              this._bg_img = new Image(), this._bg_img.name = this.background_image, this._bg_img.src = this.background_image;
              var a = this;

              this._bg_img.onload = function () {
                a.draw(!0, !0);
              };
            }

            var u = null;
            null == this._pattern && this._bg_img.width > 0 ? (u = e.createPattern(this._bg_img, "repeat"), this._pattern_img = this._bg_img, this._pattern = u) : u = this._pattern, u && (e.fillStyle = u, e.fillRect(this.visible_area[0], this.visible_area[1], this.visible_area[2], this.visible_area[3]), e.fillStyle = "transparent"), e.globalAlpha = 1, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !0;
          }

          this.graph._groups.length && !this.live_mode && this.drawGroups(t, e), this.onDrawBackground && this.onDrawBackground(e, this.visible_area), this.onBackgroundRender && (console.error("WARNING! onBackgroundRender deprecated, now is named onDrawBackground "), this.onBackgroundRender = null), this.render_canvas_border && (e.strokeStyle = "#235", e.strokeRect(0, 0, t.width, t.height)), this.render_connections_shadows ? (e.shadowColor = "#000", e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 6) : e.shadowColor = "rgba(0,0,0,0)", this.live_mode || this.drawConnections(e), e.shadowColor = "rgba(0,0,0,0)", e.restore();
        }

        e.finish && e.finish(), this.dirty_bgcanvas = !1, this.dirty_canvas = !0;
      };
      var x = new Float32Array(2);
      r.prototype.drawNode = function (t, e) {
        this.current_node = t;
        var i = t.color || t.constructor.color || m.NODE_DEFAULT_COLOR,
            s = t.bgcolor || t.constructor.bgcolor || m.NODE_DEFAULT_BGCOLOR;
        t.mouseOver;
        var o = this.ds.scale < .6;
        if (this.live_mode) t.flags.collapsed || (e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas));else {
          var n = this.editor_alpha;

          if (e.globalAlpha = n, this.render_shadows && !o ? (e.shadowColor = m.DEFAULT_SHADOW_COLOR, e.shadowOffsetX = 2 * this.ds.scale, e.shadowOffsetY = 2 * this.ds.scale, e.shadowBlur = 3 * this.ds.scale) : e.shadowColor = "transparent", !t.flags.collapsed || !t.onDrawCollapsed || 1 != t.onDrawCollapsed(e, this)) {
            var r = t._shape || m.BOX_SHAPE,
                a = x;
            x.set(t.size);
            var u = t.horizontal;

            if (t.flags.collapsed) {
              e.font = this.inner_text_font;
              var h = t.getTitle ? t.getTitle() : t.title;
              null != h && (t._collapsed_width = Math.min(t.size[0], e.measureText(h).width + 2 * m.NODE_TITLE_HEIGHT), a[0] = t._collapsed_width, a[1] = 0);
            }

            t.clip_area && (e.save(), e.beginPath(), r == m.BOX_SHAPE ? e.rect(0, 0, a[0], a[1]) : r == m.ROUND_SHAPE ? e.roundRect(0, 0, a[0], a[1], [10]) : r == m.CIRCLE_SHAPE && e.arc(.5 * a[0], .5 * a[1], .5 * a[0], 0, 2 * Math.PI), e.clip()), t.has_errors && (s = "red"), this.drawNodeShape(t, e, a, i, s, t.is_selected, t.mouseOver), e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas), e.textAlign = u ? "center" : "left", e.font = this.inner_text_font;
            var p = !o,
                l = this.connecting_output,
                d = this.connecting_input;
            e.lineWidth = 1;

            var c = 0,
                _ = new Float32Array(2);

            if (t.flags.collapsed) {
              if (this.render_collapsed_slots) {
                var g = null,
                    f = null;
                if (t.inputs) for (b = 0; b < t.inputs.length; b++) {
                  T = t.inputs[b];

                  if (null != T.link) {
                    g = T;
                    break;
                  }
                }
                if (t.outputs) for (b = 0; b < t.outputs.length; b++) {
                  T = t.outputs[b];
                  T.links && T.links.length && (f = T);
                }

                if (g) {
                  var v = 0,
                      y = -.5 * m.NODE_TITLE_HEIGHT;
                  u && (v = .5 * t._collapsed_width, y = -m.NODE_TITLE_HEIGHT), e.fillStyle = "#686", e.beginPath(), T.type === m.EVENT || T.shape === m.BOX_SHAPE ? e.rect(v - 7 + .5, y - 4, 14, 8) : T.shape === m.ARROW_SHAPE ? (e.moveTo(v + 8, y), e.lineTo(v + -4, y - 4), e.lineTo(v + -4, y + 4), e.closePath()) : e.arc(v, y, 4, 0, 2 * Math.PI), e.fill();
                }

                if (f) {
                  v = t._collapsed_width, y = -.5 * m.NODE_TITLE_HEIGHT;
                  u && (v = .5 * t._collapsed_width, y = 0), e.fillStyle = "#686", e.strokeStyle = "black", e.beginPath(), T.type === m.EVENT || T.shape === m.BOX_SHAPE ? e.rect(v - 7 + .5, y - 4, 14, 8) : T.shape === m.ARROW_SHAPE ? (e.moveTo(v + 6, y), e.lineTo(v - 6, y - 4), e.lineTo(v - 6, y + 4), e.closePath()) : e.arc(v, y, 4, 0, 2 * Math.PI), e.fill();
                }
              }
            } else {
              if (t.inputs) for (var b = 0; b < t.inputs.length; b++) {
                var T = t.inputs[b],
                    E = T.type,
                    w = T.shape;
                e.globalAlpha = n, this.connecting_output && !m.isValidConnection(T.type, l.type) && (e.globalAlpha = .4 * n), e.fillStyle = null != T.link ? T.color_on || this.default_connection_color_byType[E] || this.default_connection_color.input_on : T.color_off || this.default_connection_color_byTypeOff[E] || this.default_connection_color_byType[E] || this.default_connection_color.input_off;
                var O = t.getConnectionPos(!0, b, _);
                O[0] -= t.pos[0], O[1] -= t.pos[1], c < O[1] + .5 * m.NODE_SLOT_HEIGHT && (c = O[1] + .5 * m.NODE_SLOT_HEIGHT), e.beginPath(), "array" == E && (w = m.GRID_SHAPE);
                var I = !0;

                if (T.type === m.EVENT || T.shape === m.BOX_SHAPE ? u ? e.rect(O[0] - 5 + .5, O[1] - 8 + .5, 10, 14) : e.rect(O[0] - 6 + .5, O[1] - 5 + .5, 14, 10) : w === m.ARROW_SHAPE ? (e.moveTo(O[0] + 8, O[1] + .5), e.lineTo(O[0] - 4, O[1] + 6 + .5), e.lineTo(O[0] - 4, O[1] - 6 + .5), e.closePath()) : w === m.GRID_SHAPE ? (e.rect(O[0] - 4, O[1] - 4, 2, 2), e.rect(O[0] - 1, O[1] - 4, 2, 2), e.rect(O[0] + 2, O[1] - 4, 2, 2), e.rect(O[0] - 4, O[1] - 1, 2, 2), e.rect(O[0] - 1, O[1] - 1, 2, 2), e.rect(O[0] + 2, O[1] - 1, 2, 2), e.rect(O[0] - 4, O[1] + 2, 2, 2), e.rect(O[0] - 1, O[1] + 2, 2, 2), e.rect(O[0] + 2, O[1] + 2, 2, 2), I = !1) : o ? e.rect(O[0] - 4, O[1] - 4, 8, 8) : e.arc(O[0], O[1], 4, 0, 2 * Math.PI), e.fill(), p) {
                  var D = null != T.label ? T.label : T.name;
                  D && (e.fillStyle = m.NODE_TEXT_COLOR, u || T.dir == m.UP ? e.fillText(D, O[0], O[1] - 10) : e.fillText(D, O[0] + 10, O[1] + 5));
                }
              }
              if (e.textAlign = u ? "center" : "right", e.strokeStyle = "black", t.outputs) for (var b = 0; b < t.outputs.length; b++) {
                var T = t.outputs[b];
                E = T.type, w = T.shape;
                this.connecting_input && !m.isValidConnection(E, d.type) && (e.globalAlpha = .4 * n);
                O = t.getConnectionPos(!1, b, _);
                O[0] -= t.pos[0], O[1] -= t.pos[1], c < O[1] + .5 * m.NODE_SLOT_HEIGHT && (c = O[1] + .5 * m.NODE_SLOT_HEIGHT), e.fillStyle = T.links && T.links.length ? T.color_on || this.default_connection_color_byType[E] || this.default_connection_color.output_on : T.color_off || this.default_connection_color_byTypeOff[E] || this.default_connection_color_byType[E] || this.default_connection_color.output_off, e.beginPath(), "array" == E && (w = m.GRID_SHAPE);
                I = !0;

                if (E === m.EVENT || w === m.BOX_SHAPE ? u ? e.rect(O[0] - 5 + .5, O[1] - 8 + .5, 10, 14) : e.rect(O[0] - 6 + .5, O[1] - 5 + .5, 14, 10) : w === m.ARROW_SHAPE ? (e.moveTo(O[0] + 8, O[1] + .5), e.lineTo(O[0] - 4, O[1] + 6 + .5), e.lineTo(O[0] - 4, O[1] - 6 + .5), e.closePath()) : w === m.GRID_SHAPE ? (e.rect(O[0] - 4, O[1] - 4, 2, 2), e.rect(O[0] - 1, O[1] - 4, 2, 2), e.rect(O[0] + 2, O[1] - 4, 2, 2), e.rect(O[0] - 4, O[1] - 1, 2, 2), e.rect(O[0] - 1, O[1] - 1, 2, 2), e.rect(O[0] + 2, O[1] - 1, 2, 2), e.rect(O[0] - 4, O[1] + 2, 2, 2), e.rect(O[0] - 1, O[1] + 2, 2, 2), e.rect(O[0] + 2, O[1] + 2, 2, 2), I = !1) : o ? e.rect(O[0] - 4, O[1] - 4, 8, 8) : e.arc(O[0], O[1], 4, 0, 2 * Math.PI), e.fill(), !o && I && e.stroke(), p) {
                  D = null != T.label ? T.label : T.name;
                  D && (e.fillStyle = m.NODE_TEXT_COLOR, u || T.dir == m.DOWN ? e.fillText(D, O[0], O[1] - 8) : e.fillText(D, O[0] - 10, O[1] + 5));
                }
              }

              if (e.textAlign = "left", e.globalAlpha = 1, t.widgets) {
                var N = c;
                (u || t.widgets_up) && (N = 2), null != t.widgets_start_y && (N = t.widgets_start_y), this.drawNodeWidgets(t, N, e, this.node_widget && this.node_widget[0] == t ? this.node_widget[1] : null);
              }
            }

            t.clip_area && e.restore(), e.globalAlpha = 1;
          }
        }
      }, r.prototype.drawLinkTooltip = function (t, e) {
        var i = e._pos;

        if (t.fillStyle = "black", t.beginPath(), t.arc(i[0], i[1], 3, 0, 2 * Math.PI), t.fill(), null != e.data && (!this.onDrawLinkTooltip || 1 != this.onDrawLinkTooltip(t, e, this))) {
          var s = e.data,
              o = null;

          if (o = s.constructor === Number ? s.toFixed(2) : s.constructor === String ? '"' + s + '"' : s.constructor === Boolean ? String(s) : s.toToolTip ? s.toToolTip() : "[" + s.constructor.name + "]", null != o) {
            o = o.substr(0, 30), t.font = "14px Courier New";
            var n = t.measureText(o),
                r = n.width + 20,
                a = 24;
            t.shadowColor = "black", t.shadowOffsetX = 2, t.shadowOffsetY = 2, t.shadowBlur = 3, t.fillStyle = "#454", t.beginPath(), t.roundRect(i[0] - .5 * r, i[1] - 15 - a, r, a, [3]), t.moveTo(i[0] - 10, i[1] - 15), t.lineTo(i[0] + 10, i[1] - 15), t.lineTo(i[0], i[1] - 5), t.fill(), t.shadowColor = "transparent", t.textAlign = "center", t.fillStyle = "#CEC", t.fillText(o, i[0], i[1] - 15 - .3 * a);
          }
        }
      };
      var b = new Float32Array(4);

      r.prototype.drawNodeShape = function (t, e, i, s, o, n, a) {
        e.strokeStyle = s, e.fillStyle = o;
        var u = m.NODE_TITLE_HEIGHT,
            h = this.ds.scale < .5,
            p = t._shape || t.constructor.shape || m.ROUND_SHAPE,
            l = t.constructor.title_mode,
            d = !0;
        l == m.TRANSPARENT_TITLE || l == m.NO_TITLE ? d = !1 : l == m.AUTOHIDE_TITLE && a && (d = !0);
        var c = b;
        c[0] = 0, c[1] = d ? -u : 0, c[2] = i[0] + 1, c[3] = d ? i[1] + u : i[1];
        var _ = e.globalAlpha;

        if (e.beginPath(), p == m.BOX_SHAPE || h ? e.fillRect(c[0], c[1], c[2], c[3]) : p == m.ROUND_SHAPE || p == m.CARD_SHAPE ? e.roundRect(c[0], c[1], c[2], c[3], p == m.CARD_SHAPE ? [this.round_radius, this.round_radius, 0, 0] : [this.round_radius]) : p == m.CIRCLE_SHAPE && e.arc(.5 * i[0], .5 * i[1], .5 * i[0], 0, 2 * Math.PI), e.fill(), !t.flags.collapsed && d && (e.shadowColor = "transparent", e.fillStyle = "rgba(0,0,0,0.2)", e.fillRect(0, -1, c[2], 2)), e.shadowColor = "transparent", t.onDrawBackground && t.onDrawBackground(e, this, this.canvas, this.graph_mouse), d || l == m.TRANSPARENT_TITLE) {
          if (t.onDrawTitleBar) t.onDrawTitleBar(e, u, i, this.ds.scale, s);else if (l != m.TRANSPARENT_TITLE && (t.constructor.title_color || this.render_title_colored)) {
            var g = t.constructor.title_color || s;

            if (t.flags.collapsed && (e.shadowColor = m.DEFAULT_SHADOW_COLOR), this.use_gradients) {
              var f = r.gradients[g];
              f || (f = r.gradients[g] = e.createLinearGradient(0, 0, 400, 0), f.addColorStop(0, g), f.addColorStop(1, "#000")), e.fillStyle = f;
            } else e.fillStyle = g;

            e.beginPath(), p == m.BOX_SHAPE || h ? e.rect(0, -u, i[0] + 1, u) : p != m.ROUND_SHAPE && p != m.CARD_SHAPE || e.roundRect(0, -u, i[0] + 1, u, t.flags.collapsed ? [this.round_radius] : [this.round_radius, this.round_radius, 0, 0]), e.fill(), e.shadowColor = "transparent";
          }
          var v = !1;
          m.node_box_coloured_by_mode && m.NODE_MODES_COLORS[t.mode] && (v = m.NODE_MODES_COLORS[t.mode]), m.node_box_coloured_when_on && (v = t.action_triggered ? "#FFF" : t.execute_triggered ? "#AAA" : v);
          var y = 10;

          if (t.onDrawTitleBox ? t.onDrawTitleBox(e, u, i, this.ds.scale) : p == m.ROUND_SHAPE || p == m.CIRCLE_SHAPE || p == m.CARD_SHAPE ? (h && (e.fillStyle = "black", e.beginPath(), e.arc(.5 * u, -.5 * u, .5 * y + 1, 0, 2 * Math.PI), e.fill()), e.fillStyle = t.boxcolor || v || m.NODE_DEFAULT_BOXCOLOR, h ? e.fillRect(.5 * u - .5 * y, -.5 * u - .5 * y, y, y) : (e.beginPath(), e.arc(.5 * u, -.5 * u, .5 * y, 0, 2 * Math.PI), e.fill())) : (h && (e.fillStyle = "black", e.fillRect(.5 * (u - y) - 1, -.5 * (u + y) - 1, y + 2, y + 2)), e.fillStyle = t.boxcolor || v || m.NODE_DEFAULT_BOXCOLOR, e.fillRect(.5 * (u - y), -.5 * (u + y), y, y)), e.globalAlpha = _, t.onDrawTitleText && t.onDrawTitleText(e, u, i, this.ds.scale, this.title_text_font, n), !h) {
            e.font = this.title_text_font;
            var x = String(t.getTitle());
            if (x) if (e.fillStyle = n ? m.NODE_SELECTED_TITLE_COLOR : t.constructor.title_text_color || this.node_title_color, t.flags.collapsed) {
              e.textAlign = "left";
              e.measureText(x);
              e.fillText(x.substr(0, 20), u, m.NODE_TITLE_TEXT_Y - u), e.textAlign = "left";
            } else e.textAlign = "left", e.fillText(x, u, m.NODE_TITLE_TEXT_Y - u);
          }

          if (!t.flags.collapsed && t.subgraph && !t.skip_subgraph_button) {
            var T = m.NODE_TITLE_HEIGHT,
                E = t.size[0] - T,
                w = m.isInsideRectangle(this.graph_mouse[0] - t.pos[0], this.graph_mouse[1] - t.pos[1], E + 2, 2 - T, T - 4, T - 4);
            e.fillStyle = w ? "#888" : "#555", p == m.BOX_SHAPE || h ? e.fillRect(E + 2, 2 - T, T - 4, T - 4) : (e.beginPath(), e.roundRect(E + 2, 2 - T, T - 4, T - 4, [4]), e.fill()), e.fillStyle = "#333", e.beginPath(), e.moveTo(E + .2 * T, .6 * -T), e.lineTo(E + .8 * T, .6 * -T), e.lineTo(E + .5 * T, .3 * -T), e.fill();
          }

          t.onDrawTitle && t.onDrawTitle(e);
        }

        n && (t.onBounding && t.onBounding(c), l == m.TRANSPARENT_TITLE && (c[1] -= u, c[3] += u), e.lineWidth = 1, e.globalAlpha = .8, e.beginPath(), p == m.BOX_SHAPE ? e.rect(-6 + c[0], -6 + c[1], 12 + c[2], 12 + c[3]) : p == m.ROUND_SHAPE || p == m.CARD_SHAPE && t.flags.collapsed ? e.roundRect(-6 + c[0], -6 + c[1], 12 + c[2], 12 + c[3], [2 * this.round_radius]) : p == m.CARD_SHAPE ? e.roundRect(-6 + c[0], -6 + c[1], 12 + c[2], 12 + c[3], [2 * this.round_radius, 2, 2 * this.round_radius, 2]) : p == m.CIRCLE_SHAPE && e.arc(.5 * i[0], .5 * i[1], .5 * i[0] + 6, 0, 2 * Math.PI), e.strokeStyle = m.NODE_BOX_OUTLINE_COLOR, e.stroke(), e.strokeStyle = s, e.globalAlpha = 1), t.execute_triggered > 0 && t.execute_triggered--, t.action_triggered > 0 && t.action_triggered--;
      };

      var T = new Float32Array(4),
          E = new Float32Array(4),
          w = new Float32Array(2),
          O = new Float32Array(2);
      r.prototype.drawConnections = function (t) {
        var e = m.getTime(),
            i = this.visible_area;
        T[0] = i[0] - 20, T[1] = i[1] - 20, T[2] = i[2] + 40, T[3] = i[3] + 40, t.lineWidth = this.connections_width, t.fillStyle = "#AAA", t.strokeStyle = "#AAA", t.globalAlpha = this.editor_alpha;

        for (var s = this.graph._nodes, o = 0, n = s.length; o < n; ++o) {
          var r = s[o];
          if (r.inputs && r.inputs.length) for (var a = 0; a < r.inputs.length; ++a) {
            var u = r.inputs[a];

            if (u && null != u.link) {
              var h = u.link,
                  p = this.graph.links[h];

              if (p) {
                var l = this.graph.getNodeById(p.origin_id);

                if (null != l) {
                  var d = p.origin_slot,
                      _ = null;
                  _ = -1 == d ? [l.pos[0] + 10, l.pos[1] + 10] : l.getConnectionPos(!1, d, w);
                  var g = r.getConnectionPos(!0, a, O);

                  if (E[0] = _[0], E[1] = _[1], E[2] = g[0] - _[0], E[3] = g[1] - _[1], E[2] < 0 && (E[0] += E[2], E[2] = Math.abs(E[2])), E[3] < 0 && (E[1] += E[3], E[3] = Math.abs(E[3])), c(E, T)) {
                    var f = l.outputs[d],
                        v = r.inputs[a];

                    if (f && v) {
                      var y = f.dir || (l.horizontal ? m.DOWN : m.RIGHT),
                          x = v.dir || (r.horizontal ? m.UP : m.LEFT);

                      if (this.renderLink(t, _, g, p, !1, 0, null, y, x), p && p._last_time && e - p._last_time < 1e3) {
                        var b = 2 - .002 * (e - p._last_time),
                            I = t.globalAlpha;
                        t.globalAlpha = I * b, this.renderLink(t, _, g, p, !0, b, "white", y, x), t.globalAlpha = I;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        t.globalAlpha = 1;
      }, r.prototype.renderLink = function (t, e, i, s, o, n, a, h, p, l) {
        s && this.visible_links.push(s), !a && s && (a = s.color || r.link_type_colors[s.type]), a || (a = this.default_link_color), null != s && this.highlighted_links[s.id] && (a = "#FFF"), h = h || m.RIGHT, p = p || m.LEFT;
        var d = u(e, i);
        this.render_connections_border && this.ds.scale > .6 && (t.lineWidth = this.connections_width + 4), t.lineJoin = "round", l = l || 1, l > 1 && (t.lineWidth = .5), t.beginPath();

        for (var c = 0; c < l; c += 1) {
          var _ = 5 * (c - .5 * (l - 1));

          if (this.links_render_mode == m.SPLINE_LINK) {
            t.moveTo(e[0], e[1] + _);
            var g = 0,
                f = 0,
                v = 0,
                y = 0;

            switch (h) {
              case m.LEFT:
                g = -.25 * d;
                break;

              case m.RIGHT:
                g = .25 * d;
                break;

              case m.UP:
                f = -.25 * d;
                break;

              case m.DOWN:
                f = .25 * d;
            }

            switch (p) {
              case m.LEFT:
                v = -.25 * d;
                break;

              case m.RIGHT:
                v = .25 * d;
                break;

              case m.UP:
                y = -.25 * d;
                break;

              case m.DOWN:
                y = .25 * d;
            }

            t.bezierCurveTo(e[0] + g, e[1] + f + _, i[0] + v, i[1] + y + _, i[0], i[1] + _);
          } else if (this.links_render_mode == m.LINEAR_LINK) {
            t.moveTo(e[0], e[1] + _);
            g = 0, f = 0, v = 0, y = 0;

            switch (h) {
              case m.LEFT:
                g = -1;
                break;

              case m.RIGHT:
                g = 1;
                break;

              case m.UP:
                f = -1;
                break;

              case m.DOWN:
                f = 1;
            }

            switch (p) {
              case m.LEFT:
                v = -1;
                break;

              case m.RIGHT:
                v = 1;
                break;

              case m.UP:
                y = -1;
                break;

              case m.DOWN:
                y = 1;
            }

            var x = 15;
            t.lineTo(e[0] + g * x, e[1] + f * x + _), t.lineTo(i[0] + v * x, i[1] + y * x + _), t.lineTo(i[0], i[1] + _);
          } else {
            if (this.links_render_mode != m.STRAIGHT_LINK) return;
            t.moveTo(e[0], e[1]);
            var b = e[0],
                T = e[1],
                E = i[0],
                w = i[1];
            h == m.RIGHT ? b += 10 : T += 10, p == m.LEFT ? E -= 10 : w -= 10, t.lineTo(b, T), t.lineTo(.5 * (b + E), T), t.lineTo(.5 * (b + E), w), t.lineTo(E, w), t.lineTo(i[0], i[1]);
          }
        }

        this.render_connections_border && this.ds.scale > .6 && !o && (t.strokeStyle = "rgba(0,0,0,0.5)", t.stroke()), t.lineWidth = this.connections_width, t.fillStyle = t.strokeStyle = a, t.stroke();
        var O = this.computeConnectionPoint(e, i, .5, h, p);

        if (s && s._pos && (s._pos[0] = O[0], s._pos[1] = O[1]), this.ds.scale >= .6 && this.highquality_render && p != m.CENTER) {
          if (this.render_connection_arrows) {
            var I = this.computeConnectionPoint(e, i, .25, h, p),
                D = this.computeConnectionPoint(e, i, .26, h, p),
                N = this.computeConnectionPoint(e, i, .75, h, p),
                S = this.computeConnectionPoint(e, i, .76, h, p),
                C = 0,
                A = 0;
            this.render_curved_connections ? (C = -Math.atan2(D[0] - I[0], D[1] - I[1]), A = -Math.atan2(S[0] - N[0], S[1] - N[1])) : A = C = i[1] > e[1] ? 0 : Math.PI, t.save(), t.translate(I[0], I[1]), t.rotate(C), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore(), t.save(), t.translate(N[0], N[1]), t.rotate(A), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore();
          }

          t.beginPath(), t.arc(O[0], O[1], 5, 0, 2 * Math.PI), t.fill();
        }

        if (n) {
          t.fillStyle = a;

          for (c = 0; c < 5; ++c) {
            var L = (.001 * m.getTime() + .2 * c) % 1;
            O = this.computeConnectionPoint(e, i, L, h, p);
            t.beginPath(), t.arc(O[0], O[1], 5, 0, 2 * Math.PI), t.fill();
          }
        }
      }, r.prototype.computeConnectionPoint = function (t, e, i, s, o) {
        s = s || m.RIGHT, o = o || m.LEFT;
        var n = u(t, e),
            r = t,
            a = [t[0], t[1]],
            h = [e[0], e[1]],
            p = e;

        switch (s) {
          case m.LEFT:
            a[0] += -.25 * n;
            break;

          case m.RIGHT:
            a[0] += .25 * n;
            break;

          case m.UP:
            a[1] += -.25 * n;
            break;

          case m.DOWN:
            a[1] += .25 * n;
        }

        switch (o) {
          case m.LEFT:
            h[0] += -.25 * n;
            break;

          case m.RIGHT:
            h[0] += .25 * n;
            break;

          case m.UP:
            h[1] += -.25 * n;
            break;

          case m.DOWN:
            h[1] += .25 * n;
        }

        var l = (1 - i) * (1 - i) * (1 - i),
            d = (1 - i) * (1 - i) * 3 * i,
            c = 3 * (1 - i) * (i * i),
            _ = i * i * i,
            g = l * r[0] + d * a[0] + c * h[0] + _ * p[0],
            f = l * r[1] + d * a[1] + c * h[1] + _ * p[1];

        return [g, f];
      }, r.prototype.drawExecutionOrder = function (t) {
        t.shadowColor = "transparent", t.globalAlpha = .25, t.textAlign = "center", t.strokeStyle = "white", t.globalAlpha = .75;

        for (var e = this.visible_nodes, i = 0; i < e.length; ++i) {
          var s = e[i];
          t.fillStyle = "black", t.fillRect(s.pos[0] - m.NODE_TITLE_HEIGHT, s.pos[1] - m.NODE_TITLE_HEIGHT, m.NODE_TITLE_HEIGHT, m.NODE_TITLE_HEIGHT), 0 == s.order && t.strokeRect(s.pos[0] - m.NODE_TITLE_HEIGHT + .5, s.pos[1] - m.NODE_TITLE_HEIGHT + .5, m.NODE_TITLE_HEIGHT, m.NODE_TITLE_HEIGHT), t.fillStyle = "#FFF", t.fillText(s.order, s.pos[0] + -.5 * m.NODE_TITLE_HEIGHT, s.pos[1] - 6);
        }

        t.globalAlpha = 1;
      }, r.prototype.drawNodeWidgets = function (t, e, i, s) {
        if (!t.widgets || !t.widgets.length) return 0;
        var o = t.size[0],
            n = t.widgets;
        e += 2;
        var r = m.NODE_WIDGET_HEIGHT,
            a = this.ds.scale > .5;
        i.save(), i.globalAlpha = this.editor_alpha;

        for (var u = m.WIDGET_OUTLINE_COLOR, h = m.WIDGET_BGCOLOR, p = m.WIDGET_TEXT_COLOR, l = m.WIDGET_SECONDARY_TEXT_COLOR, d = 15, c = 0; c < n.length; ++c) {
          var _ = n[c],
              g = e;
          _.y && (g = _.y), _.last_y = g, i.strokeStyle = u, i.fillStyle = "#222", i.textAlign = "left", _.disabled && (i.globalAlpha *= .5);
          var f = _.width || o;

          switch (_.type) {
            case "button":
              _.clicked && (i.fillStyle = "#AAA", _.clicked = !1, this.dirty_canvas = !0), i.fillRect(d, g, f - 2 * d, r), a && !_.disabled && i.strokeRect(d, g, f - 2 * d, r), a && (i.textAlign = "center", i.fillStyle = p, i.fillText(_.name, .5 * f, g + .7 * r));
              break;

            case "toggle":
              i.textAlign = "left", i.strokeStyle = u, i.fillStyle = h, i.beginPath(), a ? i.roundRect(d, g, f - 2 * d, r, [.5 * r]) : i.rect(d, g, f - 2 * d, r), i.fill(), a && !_.disabled && i.stroke(), i.fillStyle = _.value ? "#89A" : "#333", i.beginPath(), i.arc(f - 2 * d, g + .5 * r, .36 * r, 0, 2 * Math.PI), i.fill(), a && (i.fillStyle = l, null != _.name && i.fillText(_.name, 2 * d, g + .7 * r), i.fillStyle = _.value ? p : l, i.textAlign = "right", i.fillText(_.value ? _.options.on || "true" : _.options.off || "false", f - 40, g + .7 * r));
              break;

            case "slider":
              i.fillStyle = h, i.fillRect(d, g, f - 2 * d, r);
              var v = _.options.max - _.options.min,
                  y = (_.value - _.options.min) / v;

              if (i.fillStyle = s == _ ? "#89A" : "#678", i.fillRect(d, g, y * (f - 2 * d), r), a && !_.disabled && i.strokeRect(d, g, f - 2 * d, r), _.marker) {
                var x = (_.marker - _.options.min) / v;
                i.fillStyle = "#AA9", i.fillRect(d + x * (f - 2 * d), g, 2, r);
              }

              a && (i.textAlign = "center", i.fillStyle = p, i.fillText(_.name + "  " + Number(_.value).toFixed(3), .5 * f, g + .7 * r));
              break;

            case "number":
            case "combo":
              if (i.textAlign = "left", i.strokeStyle = u, i.fillStyle = h, i.beginPath(), a ? i.roundRect(d, g, f - 2 * d, r, [.5 * r]) : i.rect(d, g, f - 2 * d, r), i.fill(), a) if (_.disabled || i.stroke(), i.fillStyle = p, _.disabled || (i.beginPath(), i.moveTo(d + 16, g + 5), i.lineTo(d + 6, g + .5 * r), i.lineTo(d + 16, g + r - 5), i.fill(), i.beginPath(), i.moveTo(f - d - 16, g + 5), i.lineTo(f - d - 6, g + .5 * r), i.lineTo(f - d - 16, g + r - 5), i.fill()), i.fillStyle = l, i.fillText(_.name, 2 * d + 5, g + .7 * r), i.fillStyle = p, i.textAlign = "right", "number" == _.type) i.fillText(Number(_.value).toFixed(void 0 !== _.options.precision ? _.options.precision : 3), f - 2 * d - 20, g + .7 * r);else {
                var b = _.value;

                if (_.options.values) {
                  var T = _.options.values;
                  T.constructor === Function && (T = T()), T && T.constructor !== Array && (b = T[_.value]);
                }

                i.fillText(b, f - 2 * d - 20, g + .7 * r);
              }
              break;

            case "string":
            case "text":
              i.textAlign = "left", i.strokeStyle = u, i.fillStyle = h, i.beginPath(), a ? i.roundRect(d, g, f - 2 * d, r, [.5 * r]) : i.rect(d, g, f - 2 * d, r), i.fill(), a && (_.disabled || i.stroke(), i.save(), i.beginPath(), i.rect(d, g, f - 2 * d, r), i.clip(), i.fillStyle = l, null != _.name && i.fillText(_.name, 2 * d, g + .7 * r), i.fillStyle = p, i.textAlign = "right", i.fillText(String(_.value).substr(0, 30), f - 2 * d, g + .7 * r), i.restore());
              break;

            default:
              _.draw && _.draw(i, t, f, g, r);
          }

          e += (_.computeSize ? _.computeSize(f)[1] : r) + 4, i.globalAlpha = this.editor_alpha;
        }

        i.restore(), i.textAlign = "left";
      }, r.prototype.processNodeWidgets = function (t, e, i, s) {
        function o(s, o) {
          s.value = o, s.options && s.options.property && void 0 !== t.properties[s.options.property] && t.setProperty(s.options.property, o), s.callback && s.callback(s.value, u, t, e, i);
        }

        if (!t.widgets || !t.widgets.length) return null;

        for (var n = e[0] - t.pos[0], r = e[1] - t.pos[1], a = t.size[0], u = this, h = this.getCanvasWindow(), p = 0; p < t.widgets.length; ++p) {
          var l = t.widgets[p];

          if (l && !l.disabled) {
            var d = l.computeSize ? l.computeSize(a)[1] : m.NODE_WIDGET_HEIGHT,
                c = l.width || a;

            if (l == s || !(n < 6 || n > c - 12 || r < l.last_y || r > l.last_y + d || void 0 === l.last_y)) {
              var _ = l.value;

              switch (l.type) {
                case "button":
                  i.type === m.pointerevents_method + "down" && (l.callback && setTimeout(function () {
                    l.callback(l, u, t, e, i);
                  }, 20), l.clicked = !0, this.dirty_canvas = !0);
                  break;

                case "slider":
                  l.options.max, l.options.min;
                  var g = Math.clamp((n - 15) / (c - 30), 0, 1);
                  l.value = l.options.min + (l.options.max - l.options.min) * g, l.callback && setTimeout(function () {
                    o(l, l.value);
                  }, 20), this.dirty_canvas = !0;
                  break;

                case "number":
                case "combo":
                  _ = l.value;
                  if (i.type == m.pointerevents_method + "move" && "number" == l.type) l.value += .1 * i.deltaX * (l.options.step || 1), null != l.options.min && l.value < l.options.min && (l.value = l.options.min), null != l.options.max && l.value > l.options.max && (l.value = l.options.max);else if (i.type == m.pointerevents_method + "down") {
                    var f = l.options.values;
                    f && f.constructor === Function && (f = l.options.values(l, t));
                    var v = null;
                    "number" != l.type && (v = f.constructor === Array ? f : Object.keys(f));
                    var y = n < 40 ? -1 : n > c - 40 ? 1 : 0;
                    if ("number" == l.type) l.value += .1 * y * (l.options.step || 1), null != l.options.min && l.value < l.options.min && (l.value = l.options.min), null != l.options.max && l.value > l.options.max && (l.value = l.options.max);else if (y) {
                      var x = -1;
                      this.last_mouseclick = 0, x = f.constructor === Object ? v.indexOf(String(l.value)) + y : v.indexOf(l.value) + y, x >= v.length && (x = v.length - 1), x < 0 && (x = 0), f.constructor === Array ? l.value = f[x] : l.value = x;
                    } else {
                      var b = f != v ? Object.values(f) : f;
                      new m.ContextMenu(b, {
                        scale: Math.max(1, this.ds.scale),
                        event: i,
                        className: "dark",
                        callback: T.bind(l)
                      }, h);

                      function T(t, e, i) {
                        return f != v && (t = b.indexOf(t)), this.value = t, o(this, t), u.dirty_canvas = !0, !1;
                      }
                    }
                  } else if (i.type == m.pointerevents_method + "up" && "number" == l.type) {
                    y = n < 40 ? -1 : n > c - 40 ? 1 : 0;
                    i.click_time < 200 && 0 == y && this.prompt("Value", l.value, function (t) {
                      this.value = Number(t), o(this, this.value);
                    }.bind(l), i);
                  }
                  _ != l.value && setTimeout(function () {
                    o(this, this.value);
                  }.bind(l), 20), this.dirty_canvas = !0;
                  break;

                case "toggle":
                  i.type == m.pointerevents_method + "down" && (l.value = !l.value, setTimeout(function () {
                    o(l, l.value);
                  }, 20));
                  break;

                case "string":
                case "text":
                  i.type == m.pointerevents_method + "down" && this.prompt("Value", l.value, function (t) {
                    this.value = t, o(this, t);
                  }.bind(l), i, !!l.options && l.options.multiline);
                  break;

                default:
                  l.mouse && (this.dirty_canvas = l.mouse(i, [n, r], t));
              }

              return _ != l.value && (t.onWidgetChanged && t.onWidgetChanged(l.name, l.value, _, l), t.graph._version++), l;
            }
          }
        }

        return null;
      }, r.prototype.drawGroups = function (t, e) {
        if (this.graph) {
          var i = this.graph._groups;
          e.save(), e.globalAlpha = .5 * this.editor_alpha;

          for (var s = 0; s < i.length; ++s) {
            var o = i[s];

            if (c(this.visible_area, o._bounding)) {
              e.fillStyle = o.color || "#335", e.strokeStyle = o.color || "#335";
              var n = o._pos,
                  r = o._size;
              e.globalAlpha = .25 * this.editor_alpha, e.beginPath(), e.rect(n[0] + .5, n[1] + .5, r[0], r[1]), e.fill(), e.globalAlpha = this.editor_alpha, e.stroke(), e.beginPath(), e.moveTo(n[0] + r[0], n[1] + r[1]), e.lineTo(n[0] + r[0] - 10, n[1] + r[1]), e.lineTo(n[0] + r[0], n[1] + r[1] - 10), e.fill();
              var a = o.font_size || m.DEFAULT_GROUP_FONT_SIZE;
              e.font = a + "px Arial", e.textAlign = "left", e.fillText(o.title, n[0] + 4, n[1] + a);
            }
          }

          e.restore();
        }
      }, r.prototype.adjustNodesSize = function () {
        for (var t = this.graph._nodes, e = 0; e < t.length; ++e) t[e].size = t[e].computeSize();

        this.setDirty(!0, !0);
      }, r.prototype.resize = function (t, e) {
        if (!t && !e) {
          var i = this.canvas.parentNode;
          t = i.offsetWidth, e = i.offsetHeight;
        }

        this.canvas.width == t && this.canvas.height == e || (this.canvas.width = t, this.canvas.height = e, this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height, this.setDirty(!0, !0));
      }, r.prototype.switchLiveMode = function (t) {
        if (!t) return this.live_mode = !this.live_mode, this.dirty_canvas = !0, void (this.dirty_bgcanvas = !0);
        var e = this,
            i = this.live_mode ? 1.1 : .9;
        this.live_mode && (this.live_mode = !1, this.editor_alpha = .1);
        var s = setInterval(function () {
          e.editor_alpha *= i, e.dirty_canvas = !0, e.dirty_bgcanvas = !0, i < 1 && e.editor_alpha < .01 && (clearInterval(s), i < 1 && (e.live_mode = !0)), i > 1 && e.editor_alpha > .99 && (clearInterval(s), e.editor_alpha = 1);
        }, 1);
      }, r.prototype.onNodeSelectionChange = function (t) {}, r.onGroupAdd = function (t, e, i) {
        var s = r.active_canvas,
            o = (s.getCanvasWindow(), new m.LGraphGroup());
        o.pos = s.convertEventToCanvasOffset(i), s.graph.add(o);
      }, r.onMenuAdd = function (t, e, i, s, o) {
        function n(t, e) {
          var s = m.getNodeTypesCategories(a.filter || h.filter).filter(function (e) {
            return e.startsWith(t);
          }),
              r = [];
          s.map(function (e) {
            if (e) {
              var i = new RegExp("^(" + t + ")"),
                  s = e.replace(i, "").split("/")[0],
                  o = "" === t ? s + "/" : t + s + "/",
                  a = s;
              -1 != a.indexOf("::") && (a = a.split("::")[1]);
              var u = r.findIndex(function (t) {
                return t.value === o;
              });
              -1 === u && r.push({
                value: o,
                content: a,
                has_submenu: !0,
                callback: function (t, e, i, s) {
                  n(t.value, s);
                }
              });
            }
          });
          var p = m.getNodeTypesInCategory(t.slice(0, -1), a.filter || h.filter);
          p.map(function (t) {
            if (!t.skip_list) {
              var e = {
                value: t.type,
                content: t.title,
                has_submenu: !1,
                callback: function (t, e, i, s) {
                  var n = s.getFirstEvent();
                  a.graph.beforeChange();
                  var r = m.createNode(t.value);
                  r && (r.pos = a.convertEventToCanvasOffset(n), a.graph.add(r)), o && o(r), a.graph.afterChange();
                }
              };
              r.push(e);
            }
          }), new m.ContextMenu(r, {
            event: i,
            parentMenu: e
          }, u);
        }

        var a = r.active_canvas,
            u = a.getCanvasWindow(),
            h = a.graph;
        if (h) return n("", s), !1;
      }, r.onMenuCollapseAll = function () {}, r.onMenuNodeEdit = function () {}, r.showMenuNodeOptionalInputs = function (t, e, i, s, o) {
        function n(t, e, i) {
          o && (t.callback && t.callback.call(a, o, t, e, i), t.value && (o.graph.beforeChange(), o.addInput(t.value[0], t.value[1], t.value[2]), o.onNodeInputAdd && o.onNodeInputAdd(t.value), o.setDirtyCanvas(!0, !0), o.graph.afterChange()));
        }

        if (o) {
          var a = this,
              u = r.active_canvas,
              h = u.getCanvasWindow();
          e = o.optional_inputs;
          o.onGetInputs && (e = o.onGetInputs());
          var p = [];
          if (e) for (var l = 0; l < e.length; l++) {
            var d = e[l];

            if (d) {
              var c = d[0];
              d[2] || (d[2] = {}), d[2].label && (c = d[2].label), d[2].removable = !0;
              var _ = {
                content: c,
                value: d
              };
              d[1] == m.ACTION && (_.className = "event"), p.push(_);
            } else p.push(null);
          }

          if (o.onMenuNodeInputs) {
            var g = o.onMenuNodeInputs(p);
            g && (p = g);
          }

          if (p.length) {
            new m.ContextMenu(p, {
              event: i,
              callback: n,
              parentMenu: s,
              node: o
            }, h);
            return !1;
          }

          console.log("no input entries");
        }
      }, r.showMenuNodeOptionalOutputs = function (t, e, i, s, o) {
        function n(t, e, i) {
          if (o && (t.callback && t.callback.call(a, o, t, e, i), t.value)) {
            var r = t.value[1];

            if (r && (r.constructor === Object || r.constructor === Array)) {
              var u = [];

              for (var h in r) u.push({
                content: h,
                value: r[h]
              });

              return new m.ContextMenu(u, {
                event: e,
                callback: n,
                parentMenu: s,
                node: o
              }), !1;
            }

            o.graph.beforeChange(), o.addOutput(t.value[0], t.value[1], t.value[2]), o.onNodeOutputAdd && o.onNodeOutputAdd(t.value), o.setDirtyCanvas(!0, !0), o.graph.afterChange();
          }
        }

        if (o) {
          var a = this,
              u = r.active_canvas,
              h = u.getCanvasWindow();
          e = o.optional_outputs;
          o.onGetOutputs && (e = o.onGetOutputs());
          var p = [];
          if (e) for (var l = 0; l < e.length; l++) {
            var d = e[l];

            if (d) {
              if (!o.flags || !o.flags.skip_repeated_outputs || -1 == o.findOutputSlot(d[0])) {
                var c = d[0];
                d[2] || (d[2] = {}), d[2].label && (c = d[2].label), d[2].removable = !0;
                var _ = {
                  content: c,
                  value: d
                };
                d[1] == m.EVENT && (_.className = "event"), p.push(_);
              }
            } else p.push(null);
          }

          if (this.onMenuNodeOutputs && (p = this.onMenuNodeOutputs(p)), m.do_add_triggers_slots && -1 == o.findOutputSlot("onExecuted") && p.push({
            content: "On Executed",
            value: ["onExecuted", m.EVENT, {
              nameLocked: !0
            }],
            className: "event"
          }), o.onMenuNodeOutputs) {
            var g = o.onMenuNodeOutputs(p);
            g && (p = g);
          }

          if (p.length) {
            new m.ContextMenu(p, {
              event: i,
              callback: n,
              parentMenu: s,
              node: o
            }, h);
            return !1;
          }
        }
      }, r.onShowMenuNodeProperties = function (t, e, i, s, o) {
        function n(t, e, i, s) {
          if (o) {
            var n = this.getBoundingClientRect();
            a.showEditPropertyValue(o, t.value, {
              position: [n.left, n.top]
            });
          }
        }

        if (o && o.properties) {
          var a = r.active_canvas,
              u = a.getCanvasWindow(),
              h = [];

          for (var p in o.properties) {
            t = void 0 !== o.properties[p] ? o.properties[p] : " ";
            "object" == typeof t && (t = JSON.stringify(t));
            var l = o.getPropertyInfo(p);
            "enum" != l.type && "combo" != l.type || (t = r.getPropertyPrintableValue(t, l.values)), t = r.decodeHTML(t), h.push({
              content: "<span class='property_name'>" + (l.label ? l.label : p) + "</span><span class='property_value'>" + t + "</span>",
              value: p
            });
          }

          if (h.length) {
            new m.ContextMenu(h, {
              event: i,
              callback: n,
              parentMenu: s,
              allow_html: !0,
              node: o
            }, u);
            return !1;
          }
        }
      }, r.decodeHTML = function (t) {
        var e = document.createElement("div");
        return e.innerText = t, e.innerHTML;
      }, r.onMenuResizeNode = function (t, e, i, s, o) {
        if (o) {
          var n = function (t) {
            t.size = t.computeSize(), t.onResize && t.onResize(t.size);
          },
              a = r.active_canvas;

          if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1) n(o);else for (var u in a.selected_nodes) n(a.selected_nodes[u]);
          o.setDirtyCanvas(!0, !0);
        }
      }, r.prototype.showLinkMenu = function (t, e) {
        function i(e, i, h) {
          switch (e) {
            case "Add Node":
              r.onMenuAdd(null, null, h, p, function (e) {
                e.inputs && e.inputs.length && e.outputs && e.outputs.length && o.connectByType(t.origin_slot, e, a) && (e.connectByType(t.target_slot, n, u), e.pos[0] -= .5 * e.size[0]);
              });
              break;

            case "Delete":
              s.graph.removeLink(t.id);
          }
        }

        var s = this,
            o = s.graph.getNodeById(t.origin_id),
            n = s.graph.getNodeById(t.target_id),
            a = !1;
        o && o.outputs && o.outputs[t.origin_slot] && (a = o.outputs[t.origin_slot].type);
        var u = !1;
        n && n.outputs && n.outputs[t.target_slot] && (u = n.inputs[t.target_slot].type);
        var h = ["Add Node", null, "Delete", null],
            p = new m.ContextMenu(h, {
          event: e,
          title: null != t.data ? t.data.constructor.name : null,
          callback: i
        });
        return !1;
      }, r.prototype.createDefaultNodeForSlot = function (t) {
        t = t || {};
        var e = Object.assign({
          nodeFrom: null,
          slotFrom: null,
          nodeTo: null,
          slotTo: null,
          position: [],
          nodeType: null,
          posAdd: [0, 0],
          posSizeFix: [0, 0]
        }, t),
            i = this,
            s = e.nodeFrom && null !== e.slotFrom,
            o = !s && e.nodeTo && null !== e.slotTo;
        if (!s && !o) return console.warn("No data passed to createDefaultNodeForSlot " + e.nodeFrom + " " + e.slotFrom + " " + e.nodeTo + " " + e.slotTo), !1;
        if (!e.nodeType) return console.warn("No type to createDefaultNodeForSlot"), !1;
        var n = s ? e.nodeFrom : e.nodeTo,
            r = s ? e.slotFrom : e.slotTo,
            a = !1;

        switch (typeof r) {
          case "string":
            a = s ? n.findOutputSlot(r, !1) : n.findInputSlot(r, !1), r = s ? n.outputs[r] : n.inputs[r];
            break;

          case "object":
            a = s ? n.findOutputSlot(r.name) : n.findInputSlot(r.name);
            break;

          case "number":
            a = r, r = s ? n.outputs[r] : n.inputs[r];
            break;

          case "undefined":
          default:
            return console.warn("Cant get slot information " + r), !1;
        }

        !1 !== r && !1 !== a || console.warn("createDefaultNodeForSlot bad slotX " + r + " " + a);
        var u = r.type == m.EVENT ? "_event_" : r.type,
            h = s ? m.slot_types_default_out : m.slot_types_default_in;

        if (h && h[u]) {
          if (r.link, nodeNewType = !1, "object" == typeof h[u] || "array" == typeof h[u]) {
            for (var p in h[u]) if (e.nodeType == h[u][p] || "AUTO" == e.nodeType) {
              nodeNewType = h[u][p];
              break;
            }
          } else e.nodeType != h[u] && "AUTO" != e.nodeType || (nodeNewType = h[u]);

          if (nodeNewType) {
            var l = !1;
            "object" == typeof nodeNewType && nodeNewType.node && (l = nodeNewType, nodeNewType = nodeNewType.node);
            var d = m.createNode(nodeNewType);

            if (d) {
              if (l) {
                if (l.properties) for (var c in l.properties) d.addProperty(c, l.properties[c]);
                if (l.inputs) for (var c in d.inputs = [], l.inputs) d.addOutput(l.inputs[c][0], l.inputs[c][1]);
                if (l.outputs) for (var c in d.outputs = [], l.outputs) d.addOutput(l.outputs[c][0], l.outputs[c][1]);
                l.title && (d.title = l.title), l.json && d.configure(l.json);
              }

              return i.graph.add(d), d.pos = [e.position[0] + e.posAdd[0] + (e.posSizeFix[0] ? e.posSizeFix[0] * d.size[0] : 0), e.position[1] + e.posAdd[1] + (e.posSizeFix[1] ? e.posSizeFix[1] * d.size[1] : 0)], s ? e.nodeFrom.connectByType(a, d, u) : e.nodeTo.connectByTypeOutput(a, d, u), !0;
            }

            console.log("failed creating " + nodeNewType);
          }
        }

        return !1;
      }, r.prototype.showConnectionMenu = function (t) {
        function e(t, e, n) {
          switch (t) {
            case "Add Node":
              r.onMenuAdd(null, null, n, _, function (t) {
                o ? i.nodeFrom.connectByType(h, t, l) : i.nodeTo.connectByTypeOutput(h, t, l);
              });
              break;

            case "Search":
              o ? s.showSearchBox(n, {
                node_from: i.nodeFrom,
                slot_from: u,
                type_filter_in: l
              }) : s.showSearchBox(n, {
                node_to: i.nodeTo,
                slot_from: u,
                type_filter_out: l
              });
              break;

            default:
              s.createDefaultNodeForSlot(Object.assign(i, {
                position: [i.e.canvasX, i.e.canvasY],
                nodeType: t
              }));
          }
        }

        t = t || {};
        var i = Object.assign({
          nodeFrom: null,
          slotFrom: null,
          nodeTo: null,
          slotTo: null,
          e: null
        }, t),
            s = this,
            o = i.nodeFrom && i.slotFrom,
            n = !o && i.nodeTo && i.slotTo;
        if (!o && !n) return console.warn("No data passed to showConnectionMenu"), !1;
        var a = o ? i.nodeFrom : i.nodeTo,
            u = o ? i.slotFrom : i.slotTo,
            h = !1;

        switch (typeof u) {
          case "string":
            h = o ? a.findOutputSlot(u, !1) : a.findInputSlot(u, !1), u = o ? a.outputs[u] : a.inputs[u];
            break;

          case "object":
            h = o ? a.findOutputSlot(u.name) : a.findInputSlot(u.name);
            break;

          case "number":
            h = u, u = o ? a.outputs[u] : a.inputs[u];
            break;

          default:
            return console.warn("Cant get slot information " + u), !1;
        }

        var p = ["Add Node", null];
        s.allow_searchbox && (p.push("Search"), p.push(null));
        var l = u.type == m.EVENT ? "_event_" : u.type,
            d = o ? m.slot_types_default_out : m.slot_types_default_in;
        if (d && d[l]) if ("object" == typeof d[l] || "array" == typeof d[l]) for (var c in d[l]) p.push(d[l][c]);else p.push(d[l]);

        var _ = new m.ContextMenu(p, {
          event: i.e,
          title: (u && "" != u.name ? u.name + (l ? " | " : "") : "") + (u && l ? l : ""),
          callback: e
        });

        return !1;
      }, r.onShowPropertyEditor = function (t, e, i, s, o) {
        function n() {
          d && a(d.value);
        }

        function a(e) {
          "Number" == t.type ? e = Number(e) : "Boolean" == t.type && (e = Boolean(e)), o[u] = e, p.parentNode && p.parentNode.removeChild(p), o.setDirtyCanvas(!0, !0);
        }

        var u = t.property || "title",
            h = o[u],
            p = document.createElement("div");
        p.is_modified = !1, p.className = "graphdialog", p.innerHTML = "<span class='name'></span><input autofocus type='text' class='value'/><button>OK</button>", p.close = function () {
          p.parentNode && p.parentNode.removeChild(p);
        };
        var l = p.querySelector(".name");
        l.innerText = u;
        var d = p.querySelector(".value");
        d && (d.value = h, d.addEventListener("blur", function (t) {
          this.focus();
        }), d.addEventListener("keydown", function (t) {
          if (p.is_modified = !0, 27 == t.keyCode) p.close();else if (13 == t.keyCode) n();else if (13 != t.keyCode && "textarea" != t.target.localName) return;
          t.preventDefault(), t.stopPropagation();
        }));

        var c = r.active_canvas,
            _ = c.canvas,
            g = _.getBoundingClientRect(),
            f = -20,
            v = -20;

        g && (f -= g.left, v -= g.top), event ? (p.style.left = event.clientX + f + "px", p.style.top = event.clientY + v + "px") : (p.style.left = .5 * _.width + f + "px", p.style.top = .5 * _.height + v + "px");
        var y = p.querySelector("button");
        y.addEventListener("click", n), _.parentNode.appendChild(p), d && d.focus();
        var x = null;
        p.addEventListener("mouseleave", function (t) {
          m.dialog_close_on_mouse_leave && !p.is_modified && m.dialog_close_on_mouse_leave && (x = setTimeout(p.close, m.dialog_close_on_mouse_leave_delay));
        }), p.addEventListener("mouseenter", function (t) {
          m.dialog_close_on_mouse_leave && x && clearTimeout(x);
        });
      }, r.prototype.prompt = function (t, e, i, s, o) {
        var n = this;
        t = t || "";
        var a = document.createElement("div");
        a.is_modified = !1, a.className = "graphdialog rounded", a.innerHTML = o ? "<span class='name'></span> <textarea autofocus class='value'></textarea><button class='rounded'>OK</button>" : "<span class='name'></span> <input autofocus type='text' class='value'/><button class='rounded'>OK</button>", a.close = function () {
          n.prompt_box = null, a.parentNode && a.parentNode.removeChild(a);
        };
        var u = r.active_canvas,
            h = u.canvas;
        h.parentNode.appendChild(a), this.ds.scale > 1 && (a.style.transform = "scale(" + this.ds.scale + ")");
        var p = null,
            l = !1;
        m.pointerListenerAdd(a, "leave", function (t) {
          l || m.dialog_close_on_mouse_leave && !a.is_modified && m.dialog_close_on_mouse_leave && (p = setTimeout(a.close, m.dialog_close_on_mouse_leave_delay));
        }), m.pointerListenerAdd(a, "enter", function (t) {
          m.dialog_close_on_mouse_leave && p && clearTimeout(p);
        });
        var d = a.querySelectorAll("select");
        d && d.forEach(function (t) {
          t.addEventListener("click", function (t) {
            l++;
          }), t.addEventListener("blur", function (t) {
            l = 0;
          }), t.addEventListener("change", function (t) {
            l = -1;
          });
        }), n.prompt_box && n.prompt_box.close(), n.prompt_box = a;
        var c = a.querySelector(".name");
        c.innerText = t;

        var _ = a.querySelector(".value");

        _.value = e;
        var g = _;
        g.addEventListener("keydown", function (t) {
          if (a.is_modified = !0, 27 == t.keyCode) a.close();else {
            if (13 != t.keyCode || "textarea" == t.target.localName) return;
            i && i(this.value), a.close();
          }
          t.preventDefault(), t.stopPropagation();
        });
        var f = a.querySelector("button");
        f.addEventListener("click", function (t) {
          i && i(g.value), n.setDirty(!0), a.close();
        });
        var v = h.getBoundingClientRect(),
            y = -20,
            x = -20;
        return v && (y -= v.left, x -= v.top), s ? (a.style.left = s.clientX + y + "px", a.style.top = s.clientY + x + "px") : (a.style.left = .5 * h.width + y + "px", a.style.top = .5 * h.height + x + "px"), setTimeout(function () {
          g.focus();
        }, 10), a;
      }, r.search_limit = -1, r.prototype.showSearchBox = function (t, e) {
        function i(i) {
          if (i) if (n.onSearchBoxSelection) n.onSearchBoxSelection(i, t, a);else {
            var s = m.searchbox_extras[i.toLowerCase()];
            s && (i = s.type), a.graph.beforeChange();
            var o = m.createNode(i);

            if (o && (o.pos = a.convertEventToCanvasOffset(t), a.graph.add(o, !1)), s && s.data) {
              if (s.data.properties) for (var r in s.data.properties) o.addProperty(r, s.data.properties[r]);
              if (s.data.inputs) for (var r in o.inputs = [], s.data.inputs) o.addOutput(s.data.inputs[r][0], s.data.inputs[r][1]);
              if (s.data.outputs) for (var r in o.outputs = [], s.data.outputs) o.addOutput(s.data.outputs[r][0], s.data.outputs[r][1]);
              s.data.title && (o.title = s.data.title), s.data.json && o.configure(s.data.json);
            }

            if (e.node_from) {
              var u = !1;

              switch (typeof e.slot_from) {
                case "string":
                  u = e.node_from.findOutputSlot(e.slot_from);
                  break;

                case "object":
                  u = e.slot_from.name ? e.node_from.findOutputSlot(e.slot_from.name) : -1, -1 == u && void 0 !== e.slot_from.slot_index && (u = e.slot_from.slot_index);
                  break;

                case "number":
                  u = e.slot_from;
                  break;

                default:
                  u = 0;
              }

              void 0 !== typeof e.node_from.outputs[u] && !1 !== u && u > -1 && e.node_from.connectByType(u, o, e.node_from.outputs[u].type);
            }

            if (e.node_to) {
              u = !1;

              switch (typeof e.slot_from) {
                case "string":
                  u = e.node_to.findInputSlot(e.slot_from);
                  break;

                case "object":
                  u = e.slot_from.name ? e.node_to.findInputSlot(e.slot_from.name) : -1, -1 == u && void 0 !== e.slot_from.slot_index && (u = e.slot_from.slot_index);
                  break;

                case "number":
                  u = e.slot_from;
                  break;

                default:
                  u = 0;
              }

              void 0 !== typeof e.node_to.inputs[u] && !1 !== u && u > -1 && e.node_to.connectByTypeOutput(u, o, e.node_to.inputs[u].type);
            }

            a.graph.afterChange();
          }
          p.close();
        }

        function s(t) {
          var e = y;
          y && y.classList.remove("selected"), y ? (y = t ? y.nextSibling : y.previousSibling, y || (y = e)) : y = t ? g.childNodes[0] : g.childNodes[g.childNodes.length], y && (y.classList.add("selected"), y.scrollIntoView({
            block: "end",
            behavior: "smooth"
          }));
        }

        function o() {
          function t(t, e) {
            var s = document.createElement("div");
            f || (f = t), s.innerText = t, s.dataset.type = escape(t), s.className = "litegraph lite-search-item", e && (s.className += " " + e), s.addEventListener("click", function (t) {
              i(unescape(this.dataset.type));
            }), g.appendChild(s);
          }

          v = null;
          var s = x.value;
          if (f = null, g.innerHTML = "", s || e.show_all_if_empty) if (n.onSearchBox) {
            var o = n.onSearchBox(g, s, a);
            if (o) for (var u = 0; u < o.length; ++u) t(o[u]);
          } else {
            var h = 0;
            s = s.toLowerCase();
            var p = a.filter || a.graph.filter;
            if (e.do_type_filter && n.search_box) var l = n.search_box.querySelector(".slot_in_type_filter"),
                d = n.search_box.querySelector(".slot_out_type_filter");else l = !1, d = !1;

            for (var u in m.searchbox_extras) {
              var c = m.searchbox_extras[u];

              if (e.show_all_if_empty && !s || -1 !== c.desc.toLowerCase().indexOf(s)) {
                var _ = m.registered_node_types[c.type];
                if ((!_ || _.filter == p) && T(c.type) && (t(c.desc, "searchbox_extra"), -1 !== r.search_limit && h++ > r.search_limit)) break;
              }
            }

            var y = null;

            if (Array.prototype.filter) {
              var b = Object.keys(m.registered_node_types);
              y = b.filter(T);
            } else for (var u in y = [], m.registered_node_types) T(u) && y.push(u);

            for (u = 0; u < y.length && (t(y[u]), !(-1 !== r.search_limit && h++ > r.search_limit)); u++);

            if (e.show_general_after_typefiltered && (l.value || d.value)) {
              for (var u in filtered_extra = [], m.registered_node_types) T(u, {
                inTypeOverride: !(!l || !l.value) && "*",
                outTypeOverride: !(!d || !d.value) && "*"
              }) && filtered_extra.push(u);

              for (u = 0; u < filtered_extra.length && (t(filtered_extra[u], "generic_type"), !(-1 !== r.search_limit && h++ > r.search_limit)); u++);
            }

            if ((l.value || d.value) && 0 == g.childNodes.length && e.show_general_if_none_on_typefilter) {
              for (var u in filtered_extra = [], m.registered_node_types) T(u, {
                skipFilter: !0
              }) && filtered_extra.push(u);

              for (u = 0; u < filtered_extra.length && (t(filtered_extra[u], "not_in_filter"), !(-1 !== r.search_limit && h++ > r.search_limit)); u++);
            }

            function T(t, i) {
              i = i || {};
              var o = {
                skipFilter: !1,
                inTypeOverride: !1,
                outTypeOverride: !1
              },
                  n = Object.assign(o, i),
                  r = m.registered_node_types[t];
              if (p && r.filter != p) return !1;
              if ((!e.show_all_if_empty || s) && -1 === t.toLowerCase().indexOf(s)) return !1;

              if (e.do_type_filter && !n.skipFilter) {
                var a = t,
                    u = l.value;

                if (!1 !== n.inTypeOverride && (u = n.inTypeOverride), l && u && m.registered_slot_in_types[u] && m.registered_slot_in_types[u].nodes) {
                  var h = m.registered_slot_in_types[u].nodes.includes(a);
                  if (!1 === h) return !1;
                }

                u = d.value;

                if (!1 !== n.outTypeOverride && (u = n.outTypeOverride), d && u && m.registered_slot_out_types[u] && m.registered_slot_out_types[u].nodes) {
                  h = m.registered_slot_out_types[u].nodes.includes(a);
                  if (!1 === h) return !1;
                }
              }

              return !0;
            }
          }
        }

        def_options = {
          slot_from: null,
          node_from: null,
          node_to: null,
          do_type_filter: m.search_filter_enabled,
          type_filter_in: !1,
          type_filter_out: !1,
          show_general_if_none_on_typefilter: !0,
          show_general_after_typefiltered: !0,
          hide_on_mouse_leave: m.search_hide_on_mouse_leave,
          show_all_if_empty: !0,
          show_all_on_open: m.search_show_all_on_open
        }, e = Object.assign(def_options, e || {});
        var n = this,
            a = r.active_canvas,
            u = a.canvas,
            h = u.ownerDocument || document,
            p = document.createElement("div");
        if (p.className = "litegraph litesearchbox graphdialog rounded", p.innerHTML = "<span class='name'>Search</span> <input autofocus type='text' class='value rounded'/>", e.do_type_filter && (p.innerHTML += "<select class='slot_in_type_filter'><option value=''></option></select>", p.innerHTML += "<select class='slot_out_type_filter'><option value=''></option></select>"), p.innerHTML += "<div class='helper'></div>", h.fullscreenElement ? h.fullscreenElement.appendChild(p) : (h.body.appendChild(p), h.body.style.overflow = "hidden"), e.do_type_filter) var l = p.querySelector(".slot_in_type_filter"),
            d = p.querySelector(".slot_out_type_filter");

        if (p.close = function () {
          n.search_box = null, this.blur(), u.focus(), h.body.style.overflow = "", setTimeout(function () {
            n.canvas.focus();
          }, 20), p.parentNode && p.parentNode.removeChild(p);
        }, this.ds.scale > 1 && (p.style.transform = "scale(" + this.ds.scale + ")"), e.hide_on_mouse_leave) {
          var c = !1,
              _ = null;
          m.pointerListenerAdd(p, "enter", function (t) {
            _ && (clearTimeout(_), _ = null);
          }), m.pointerListenerAdd(p, "leave", function (t) {
            c || (_ = setTimeout(function () {
              p.close();
            }, 500));
          }), e.do_type_filter && (l.addEventListener("click", function (t) {
            c++;
          }), l.addEventListener("blur", function (t) {
            c = 0;
          }), l.addEventListener("change", function (t) {
            c = -1;
          }), d.addEventListener("click", function (t) {
            c++;
          }), d.addEventListener("blur", function (t) {
            c = 0;
          }), d.addEventListener("change", function (t) {
            c = -1;
          }));
        }

        n.search_box && n.search_box.close(), n.search_box = p;
        var g = p.querySelector(".helper"),
            f = null,
            v = null,
            y = null,
            x = p.querySelector("input");

        if (x && (x.addEventListener("blur", function (t) {
          this.focus();
        }), x.addEventListener("keydown", function (t) {
          if (38 == t.keyCode) s(!1);else if (40 == t.keyCode) s(!0);else if (27 == t.keyCode) p.close();else {
            if (13 != t.keyCode) return v && clearInterval(v), void (v = setTimeout(o, 250));
            y ? i(y.innerHTML) : f ? i(f) : p.close();
          }
          return t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), !0;
        })), e.do_type_filter) {
          if (l) {
            var b = m.slot_types_in,
                T = b.length;
            e.type_filter_in != m.EVENT && e.type_filter_in != m.ACTION || (e.type_filter_in = "_event_");

            for (var E = 0; E < T; E++) {
              var w = document.createElement("option");
              w.value = b[E], w.innerHTML = b[E], l.appendChild(w), !1 !== e.type_filter_in && (e.type_filter_in + "").toLowerCase() == (b[E] + "").toLowerCase() && (w.selected = !0);
            }

            l.addEventListener("change", function () {
              o();
            });
          }

          if (d) {
            b = m.slot_types_out, T = b.length;
            e.type_filter_out != m.EVENT && e.type_filter_out != m.ACTION || (e.type_filter_out = "_event_");

            for (E = 0; E < T; E++) {
              w = document.createElement("option");
              w.value = b[E], w.innerHTML = b[E], d.appendChild(w), !1 !== e.type_filter_out && (e.type_filter_out + "").toLowerCase() == (b[E] + "").toLowerCase() && (w.selected = !0);
            }

            d.addEventListener("change", function () {
              o();
            });
          }
        }

        var O = u.getBoundingClientRect(),
            I = (t ? t.clientX : O.left + .5 * O.width) - 80,
            D = (t ? t.clientY : O.top + .5 * O.height) - 20;
        return p.style.left = I + "px", p.style.top = D + "px", t.layerY > O.height - 200 && (g.style.maxHeight = O.height - t.layerY - 20 + "px"), x.focus(), e.show_all_on_open && o(), p;
      }, r.prototype.showEditPropertyValue = function (t, e, i) {
        function s() {
          o(l.value);
        }

        function o(s) {
          n && n.values && n.values.constructor === Object && null != n.values[s] && (s = n.values[s]), "number" == typeof t.properties[e] && (s = Number(s)), "array" != r && "object" != r || (s = JSON.parse(s)), t.properties[e] = s, t.graph && t.graph._version++, t.onPropertyChanged && t.onPropertyChanged(e, s), i.onclose && i.onclose(), p.close(), t.setDirtyCanvas(!0, !0);
        }

        if (t && void 0 !== t.properties[e]) {
          i = i || {};
          var n = t.getPropertyInfo(e),
              r = n.type,
              a = "";
          if ("string" == r || "number" == r || "array" == r || "object" == r) a = "<input autofocus type='text' class='value'/>";else if ("enum" != r && "combo" != r || !n.values) {
            if ("boolean" != r && "toggle" != r) return void console.warn("unknown type: " + r);
            a = "<input autofocus type='checkbox' class='value' " + (t.properties[e] ? "checked" : "") + "/>";
          } else {
            for (var u in a = "<select autofocus type='text' class='value'>", n.values) {
              var h = u;
              n.values.constructor === Array && (h = n.values[u]), a += "<option value='" + h + "' " + (h == t.properties[e] ? "selected" : "") + ">" + n.values[u] + "</option>";
            }

            a += "</select>";
          }
          var p = this.createDialog("<span class='name'>" + (n.label ? n.label : e) + "</span>" + a + "<button>OK</button>", i),
              l = !1;

          if ("enum" != r && "combo" != r || !n.values) {
            if ("boolean" == r || "toggle" == r) l = p.querySelector("input"), l && l.addEventListener("click", function (t) {
              p.modified(), o(!!l.checked);
            });else if (l = p.querySelector("input"), l) {
              l.addEventListener("blur", function (t) {
                this.focus();
              });
              h = void 0 !== t.properties[e] ? t.properties[e] : "";
              "string" !== r && (h = JSON.stringify(h)), l.value = h, l.addEventListener("keydown", function (t) {
                if (27 == t.keyCode) p.close();else if (13 == t.keyCode) s();else if (13 != t.keyCode) return void p.modified();
                t.preventDefault(), t.stopPropagation();
              });
            }
          } else l = p.querySelector("select"), l.addEventListener("change", function (t) {
            p.modified(), o(t.target.value);
          });

          l && l.focus();
          var d = p.querySelector("button");
          return d.addEventListener("click", s), p;
        }
      }, r.prototype.createDialog = function (t, e) {
        def_options = {
          checkForInput: !1,
          closeOnLeave: !0,
          closeOnLeave_checkModified: !0
        }, e = Object.assign(def_options, e || {});
        var i = document.createElement("div");
        i.className = "graphdialog", i.innerHTML = t, i.is_modified = !1;
        var s = this.canvas.getBoundingClientRect(),
            o = -20,
            n = -20;

        if (s && (o -= s.left, n -= s.top), e.position ? (o += e.position[0], n += e.position[1]) : e.event ? (o += e.event.clientX, n += e.event.clientY) : (o += .5 * this.canvas.width, n += .5 * this.canvas.height), i.style.left = o + "px", i.style.top = n + "px", this.canvas.parentNode.appendChild(i), e.checkForInput) {
          var r = [],
              a = !1;
          (r = i.querySelectorAll("input")) && r.forEach(function (t) {
            t.addEventListener("keydown", function (t) {
              if (i.modified(), 27 == t.keyCode) i.close();else if (13 != t.keyCode) return;
              t.preventDefault(), t.stopPropagation();
            }), a || t.focus();
          });
        }

        i.modified = function () {
          i.is_modified = !0;
        }, i.close = function () {
          i.parentNode && i.parentNode.removeChild(i);
        };
        var u = null,
            h = !1;
        i.addEventListener("mouseleave", function (t) {
          h || (e.closeOnLeave || m.dialog_close_on_mouse_leave) && !i.is_modified && m.dialog_close_on_mouse_leave && (u = setTimeout(i.close, m.dialog_close_on_mouse_leave_delay));
        }), i.addEventListener("mouseenter", function (t) {
          (e.closeOnLeave || m.dialog_close_on_mouse_leave) && u && clearTimeout(u);
        });
        var p = i.querySelectorAll("select");
        return p && p.forEach(function (t) {
          t.addEventListener("click", function (t) {
            h++;
          }), t.addEventListener("blur", function (t) {
            h = 0;
          }), t.addEventListener("change", function (t) {
            h = -1;
          });
        }), i;
      }, r.prototype.createPanel = function (t, e) {
        e = e || {};
        var i = e.window || window,
            s = document.createElement("div");

        if (s.className = "litegraph dialog", s.innerHTML = "<div class='dialog-header'><span class='dialog-title'></span></div><div class='dialog-content'></div><div style='display:none;' class='dialog-alt-content'></div><div class='dialog-footer'></div>", s.header = s.querySelector(".dialog-header"), e.width && (s.style.width = e.width + (e.width.constructor === Number ? "px" : "")), e.height && (s.style.height = e.height + (e.height.constructor === Number ? "px" : "")), e.closable) {
          var o = document.createElement("span");
          o.innerHTML = "&#10005;", o.classList.add("close"), o.addEventListener("click", function () {
            s.close();
          }), s.header.appendChild(o);
        }

        return s.title_element = s.querySelector(".dialog-title"), s.title_element.innerText = t, s.content = s.querySelector(".dialog-content"), s.alt_content = s.querySelector(".dialog-alt-content"), s.footer = s.querySelector(".dialog-footer"), s.close = function () {
          s.onClose && "function" == typeof s.onClose && s.onClose(), s.parentNode.removeChild(s), this.parentNode && this.parentNode.removeChild(this);
        }, s.toggleAltContent = function (t) {
          if (void 0 !== t) var e = t ? "block" : "none",
              i = t ? "none" : "block";else e = "block" != s.alt_content.style.display ? "block" : "none", i = "block" != s.alt_content.style.display ? "none" : "block";
          s.alt_content.style.display = e, s.content.style.display = i;
        }, s.toggleFooterVisibility = function (t) {
          if (void 0 !== t) var e = t ? "block" : "none";else e = "block" != s.footer.style.display ? "block" : "none";
          s.footer.style.display = e;
        }, s.clear = function () {
          this.content.innerHTML = "";
        }, s.addHTML = function (t, e, i) {
          var o = document.createElement("div");
          return e && (o.className = e), o.innerHTML = t, i ? s.footer.appendChild(o) : s.content.appendChild(o), o;
        }, s.addButton = function (t, e, i) {
          var o = document.createElement("button");
          return o.innerText = t, o.options = i, o.classList.add("btn"), o.addEventListener("click", e), s.footer.appendChild(o), o;
        }, s.addSeparator = function () {
          var t = document.createElement("div");
          t.className = "separator", s.content.appendChild(t);
        }, s.addWidget = function (t, e, o, n, a) {
          function u(t, e) {
            n.callback && n.callback(t, e, n), a && a(t, e, n);
          }

          n = n || {};
          var h = String(o);
          t = t.toLowerCase(), "number" == t && (h = o.toFixed(3));
          var p = document.createElement("div");
          p.className = "property", p.innerHTML = "<span class='property_name'></span><span class='property_value'></span>", p.querySelector(".property_name").innerText = n.label || e;
          var l = p.querySelector(".property_value");
          if (l.innerText = h, p.dataset.property = e, p.dataset.type = n.type || t, p.options = n, p.value = o, "code" == t) p.addEventListener("click", function (t) {
            s.inner_showCodePad(this.dataset.property);
          });else if ("boolean" == t) p.classList.add("boolean"), o && p.classList.add("bool-on"), p.addEventListener("click", function () {
            var t = this.dataset.property;
            this.value = !this.value, this.classList.toggle("bool-on"), this.querySelector(".property_value").innerText = this.value ? "true" : "false", u(t, this.value);
          });else if ("string" == t || "number" == t) l.setAttribute("contenteditable", !0), l.addEventListener("keydown", function (e) {
            "Enter" != e.code || "string" == t && e.shiftKey || (e.preventDefault(), this.blur());
          }), l.addEventListener("blur", function () {
            var t = this.innerText,
                e = this.parentNode.dataset.property,
                i = this.parentNode.dataset.type;
            "number" == i && (t = Number(t)), u(e, t);
          });else if ("enum" == t || "combo" == t) {
            h = r.getPropertyPrintableValue(o, n.values);
            l.innerText = h, l.addEventListener("click", function (t) {
              function e(t, e, i) {
                return r.innerText = t, u(o, t), !1;
              }

              var s = n.values || [],
                  o = this.parentNode.dataset.property,
                  r = this;
              new m.ContextMenu(s, {
                event: t,
                className: "dark",
                callback: e
              }, i);
            });
          }
          return s.content.appendChild(p), p;
        }, s.onOpen && "function" == typeof s.onOpen && s.onOpen(), s;
      }, r.getPropertyPrintableValue = function (t, e) {
        if (!e) return String(t);
        if (e.constructor === Array) return String(t);

        if (e.constructor === Object) {
          var i = "";

          for (var s in e) if (e[s] == t) {
            i = s;
            break;
          }

          return String(t) + " (" + i + ")";
        }
      }, r.prototype.closePanels = function () {
        var t = document.querySelector("#node-panel");
        t && t.close();
        t = document.querySelector("#option-panel");
        t && t.close();
      }, r.prototype.showShowGraphOptionsPanel = function (t, e, i, s) {
        function o() {
          panel.content.innerHTML = "";

          var t = function (t, e, i) {
            i && i.key && (t = i.key), i.values && (e = Object.values(i.values).indexOf(e)), n[t] = e;
          },
              e = m.availableCanvasOptions;

          for (pI in e.sort(), e) {
            var i = e[pI];
            panel.addWidget("boolean", i, n[i], {
              key: i,
              on: "True",
              off: "False"
            }, t);
          }

          n.links_render_mode;
          panel.addWidget("combo", "Render mode", m.LINK_RENDER_MODES[n.links_render_mode], {
            key: "links_render_mode",
            values: m.LINK_RENDER_MODES
          }, t), panel.addSeparator(), panel.footer.innerHTML = "";
        }

        if (this.constructor && "HTMLDivElement" == this.constructor.name) {
          if (!(e && e.event && e.event.target && e.event.target.lgraphcanvas)) return void console.warn("Canvas not found");
          var n = e.event.target.lgraphcanvas;
        } else n = this;

        n.closePanels();
        var r = n.getCanvasWindow();
        panel = n.createPanel("Options", {
          closable: !0,
          window: r,
          onOpen: function () {
            n.OPTIONPANEL_IS_OPEN = !0;
          },
          onClose: function () {
            n.OPTIONPANEL_IS_OPEN = !1, n.options_panel = null;
          }
        }), n.options_panel = panel, panel.id = "option-panel", panel.classList.add("settings"), o(), n.canvas.parentNode.appendChild(panel);
      }, r.prototype.showShowNodePanel = function (t) {
        function e() {
          panel.content.innerHTML = "", panel.addHTML("<span class='node_type'>" + t.type + "</span><span class='node_desc'>" + (t.constructor.desc || "") + "</span><span class='separator'></span>"), panel.addHTML("<h3>Properties</h3>");

          var e = function (e, i) {
            switch (s.graph.beforeChange(t), e) {
              case "Title":
                t.title = i;
                break;

              case "Mode":
                var o = Object.values(m.NODE_MODES).indexOf(i);
                o >= 0 && m.NODE_MODES[o] ? t.changeMode(o) : console.warn("unexpected mode: " + i);
                break;

              case "Color":
                r.node_colors[i] ? (t.color = r.node_colors[i].color, t.bgcolor = r.node_colors[i].bgcolor) : console.warn("unexpected color: " + i);
                break;

              default:
                t.setProperty(e, i);
            }

            s.graph.afterChange(), s.dirty_canvas = !0;
          };

          panel.addWidget("string", "Title", t.title, {}, e), panel.addWidget("combo", "Mode", m.NODE_MODES[t.mode], {
            values: m.NODE_MODES
          }, e);
          var i = "";

          for (var o in void 0 !== t.color && (i = Object.keys(r.node_colors).filter(function (e) {
            return r.node_colors[e].color == t.color;
          })), panel.addWidget("combo", "Color", i, {
            values: Object.keys(r.node_colors)
          }, e), t.properties) {
            var n = t.properties[o],
                a = t.getPropertyInfo(o);
            a.type;
            t.onAddPropertyToPanel && t.onAddPropertyToPanel(o, panel) || panel.addWidget(a.widget || a.type, o, n, a, e);
          }

          panel.addSeparator(), t.onShowCustomPanelInfo && t.onShowCustomPanelInfo(panel), panel.footer.innerHTML = "", panel.addButton("Delete", function () {
            t.block_delete || (t.graph.remove(t), panel.close());
          }).classList.add("delete");
        }

        this.SELECTED_NODE = t, this.closePanels();
        var i = this.getCanvasWindow(),
            s = this;
        panel = this.createPanel(t.title || "", {
          closable: !0,
          window: i,
          onOpen: function () {
            s.NODEPANEL_IS_OPEN = !0;
          },
          onClose: function () {
            s.NODEPANEL_IS_OPEN = !1, s.node_panel = null;
          }
        }), s.node_panel = panel, panel.id = "node-panel", panel.node = t, panel.classList.add("settings"), panel.inner_showCodePad = function (i) {
          panel.classList.remove("settings"), panel.classList.add("centered"), panel.alt_content.innerHTML = "<textarea class='code'></textarea>";

          var s = panel.alt_content.querySelector("textarea"),
              o = function () {
            panel.toggleAltContent(!1), panel.toggleFooterVisibility(!0), s.parentNode.removeChild(s), panel.classList.add("settings"), panel.classList.remove("centered"), e();
          };

          s.value = t.properties[i], s.addEventListener("keydown", function (e) {
            "Enter" == e.code && e.ctrlKey && (t.setProperty(i, s.value), o());
          }), panel.toggleAltContent(!0), panel.toggleFooterVisibility(!1), s.style.height = "calc(100% - 40px)";
          var n = panel.addButton("Assign", function () {
            t.setProperty(i, s.value), o();
          });
          panel.alt_content.appendChild(n);
          var r = panel.addButton("Close", o);
          r.style.float = "right", panel.alt_content.appendChild(r);
        }, e(), this.canvas.parentNode.appendChild(panel);
      }, r.prototype.showSubgraphPropertiesDialog = function (t) {
        function e() {
          if (s.clear(), t.inputs) for (var i = 0; i < t.inputs.length; ++i) {
            var o = t.inputs[i];

            if (!o.not_subgraph_input) {
              var n = "<button>&#10005;</button> <span class='bullet_icon'></span><span class='name'></span><span class='type'></span>",
                  r = s.addHTML(n, "subgraph_property");
              r.dataset.name = o.name, r.dataset.slot = i, r.querySelector(".name").innerText = o.name, r.querySelector(".type").innerText = o.type, r.querySelector("button").addEventListener("click", function (i) {
                t.removeInput(Number(this.parentNode.dataset.slot)), e();
              });
            }
          }
        }

        console.log("showing subgraph properties dialog");
        var i = this.canvas.parentNode.querySelector(".subgraph_dialog");
        i && i.close();
        var s = this.createPanel("Subgraph Inputs", {
          closable: !0,
          width: 500
        });
        s.node = t, s.classList.add("subgraph_dialog");
        var o = " + <span class='label'>Name</span><input class='name'/><span class='label'>Type</span><input class='type'></input><button>+</button>",
            n = s.addHTML(o, "subgraph_property extra", !0);
        return n.querySelector("button").addEventListener("click", function (i) {
          var s = this.parentNode,
              o = s.querySelector(".name").value,
              n = s.querySelector(".type").value;
          o && -1 == t.findInputSlot(o) && (t.addInput(o, n), s.querySelector(".name").value = "", s.querySelector(".type").value = "", e());
        }), e(), this.canvas.parentNode.appendChild(s), s;
      }, r.prototype.showSubgraphPropertiesDialogRight = function (t) {
        function e() {
          if (o.clear(), t.outputs) for (var i = 0; i < t.outputs.length; ++i) {
            var s = t.outputs[i];

            if (!s.not_subgraph_output) {
              var n = "<button>&#10005;</button> <span class='bullet_icon'></span><span class='name'></span><span class='type'></span>",
                  r = o.addHTML(n, "subgraph_property");
              r.dataset.name = s.name, r.dataset.slot = i, r.querySelector(".name").innerText = s.name, r.querySelector(".type").innerText = s.type, r.querySelector("button").addEventListener("click", function (i) {
                t.removeOutput(Number(this.parentNode.dataset.slot)), e();
              });
            }
          }
        }

        function i() {
          var i = this.parentNode,
              s = i.querySelector(".name").value,
              o = i.querySelector(".type").value;
          s && -1 == t.findOutputSlot(s) && (t.addOutput(s, o), i.querySelector(".name").value = "", i.querySelector(".type").value = "", e());
        }

        var s = this.canvas.parentNode.querySelector(".subgraph_dialog");
        s && s.close();
        var o = this.createPanel("Subgraph Outputs", {
          closable: !0,
          width: 500
        });
        o.node = t, o.classList.add("subgraph_dialog");
        var n = " + <span class='label'>Name</span><input class='name'/><span class='label'>Type</span><input class='type'></input><button>+</button>",
            r = o.addHTML(n, "subgraph_property extra", !0);
        return r.querySelector(".name").addEventListener("keydown", function (t) {
          13 == t.keyCode && i.apply(this);
        }), r.querySelector("button").addEventListener("click", function (t) {
          i.apply(this);
        }), e(), this.canvas.parentNode.appendChild(o), o;
      }, r.prototype.checkPanels = function () {
        if (this.canvas) for (var t = this.canvas.parentNode.querySelectorAll(".litegraph.dialog"), e = 0; e < t.length; ++e) {
          var i = t[e];
          i.node && (i.node.graph && i.graph == this.graph || i.close());
        }
      }, r.onMenuNodeCollapse = function (t, e, i, s, o) {
        o.graph.beforeChange();

        var n = function (t) {
          t.collapse();
        },
            a = r.active_canvas;

        if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1) n(o);else for (var u in a.selected_nodes) n(a.selected_nodes[u]);
        o.graph.afterChange();
      }, r.onMenuNodePin = function (t, e, i, s, o) {
        o.pin();
      }, r.onMenuNodeMode = function (t, e, i, s, o) {
        function n(t) {
          if (o) {
            var e = Object.values(m.NODE_MODES).indexOf(t),
                i = function (i) {
              e >= 0 && m.NODE_MODES[e] ? i.changeMode(e) : (console.warn("unexpected mode: " + t), i.changeMode(m.ALWAYS));
            },
                s = r.active_canvas;

            if (!s.selected_nodes || Object.keys(s.selected_nodes).length <= 1) i(o);else for (var n in s.selected_nodes) i(s.selected_nodes[n]);
          }
        }

        return new m.ContextMenu(m.NODE_MODES, {
          event: i,
          callback: n,
          parentMenu: s,
          node: o
        }), !1;
      }, r.onMenuNodeColors = function (t, e, i, s, o) {
        function n(t) {
          if (o) {
            var e = t.value ? r.node_colors[t.value] : null,
                i = function (t) {
              e ? t.constructor === m.LGraphGroup ? t.color = e.groupcolor : (t.color = e.color, t.bgcolor = e.bgcolor) : (delete t.color, delete t.bgcolor);
            },
                s = r.active_canvas;

            if (!s.selected_nodes || Object.keys(s.selected_nodes).length <= 1) i(o);else for (var n in s.selected_nodes) i(s.selected_nodes[n]);
            o.setDirtyCanvas(!0, !0);
          }
        }

        if (!o) throw "no node for color";
        var a = [];

        for (var u in a.push({
          value: null,
          content: "<span style='display: block; padding-left: 4px;'>No color</span>"
        }), r.node_colors) {
          var h = r.node_colors[u];
          t = {
            value: u,
            content: "<span style='display: block; color: #999; padding-left: 4px; border-left: 8px solid " + h.color + "; background-color:" + h.bgcolor + "'>" + u + "</span>"
          };
          a.push(t);
        }

        return new m.ContextMenu(a, {
          event: i,
          callback: n,
          parentMenu: s,
          node: o
        }), !1;
      }, r.onMenuNodeShapes = function (t, e, i, s, o) {
        function n(t) {
          if (o) {
            o.graph.beforeChange();

            var e = function (e) {
              e.shape = t;
            },
                i = r.active_canvas;

            if (!i.selected_nodes || Object.keys(i.selected_nodes).length <= 1) e(o);else for (var s in i.selected_nodes) e(i.selected_nodes[s]);
            o.graph.afterChange(), o.setDirtyCanvas(!0);
          }
        }

        if (!o) throw "no node passed";
        return new m.ContextMenu(m.VALID_SHAPES, {
          event: i,
          callback: n,
          parentMenu: s,
          node: o
        }), !1;
      }, r.onMenuNodeRemove = function (t, e, i, s, o) {
        if (!o) throw "no node passed";
        var n = o.graph;
        n.beforeChange();

        var a = function (t) {
          !1 !== t.removable && n.remove(t);
        },
            u = r.active_canvas;

        if (!u.selected_nodes || Object.keys(u.selected_nodes).length <= 1) a(o);else for (var h in u.selected_nodes) a(u.selected_nodes[h]);
        n.afterChange(), o.setDirtyCanvas(!0, !0);
      }, r.onMenuNodeToSubgraph = function (t, e, i, s, o) {
        var n = o.graph,
            a = r.active_canvas;

        if (a) {
          var u = Object.values(a.selected_nodes || {});
          u.length || (u = [o]);
          var h = m.createNode("graph/subgraph");
          h.pos = o.pos.concat(), n.add(h), h.buildFromNodes(u), a.deselectAllNodes(), o.setDirtyCanvas(!0, !0);
        }
      }, r.onMenuNodeClone = function (t, e, i, s, o) {
        o.graph.beforeChange();

        var n = {},
            a = function (t) {
          if (0 != t.clonable) {
            var e = t.clone();
            e && (e.pos = [t.pos[0] + 5, t.pos[1] + 5], t.graph.add(e), n[e.id] = e);
          }
        },
            u = r.active_canvas;

        if (!u.selected_nodes || Object.keys(u.selected_nodes).length <= 1) a(o);else for (var h in u.selected_nodes) a(u.selected_nodes[h]);
        Object.keys(n).length && u.selectNodes(n), o.graph.afterChange(), o.setDirtyCanvas(!0, !0);
      }, r.node_colors = {
        red: {
          color: "#322",
          bgcolor: "#533",
          groupcolor: "#A88"
        },
        brown: {
          color: "#332922",
          bgcolor: "#593930",
          groupcolor: "#b06634"
        },
        green: {
          color: "#232",
          bgcolor: "#353",
          groupcolor: "#8A8"
        },
        blue: {
          color: "#223",
          bgcolor: "#335",
          groupcolor: "#88A"
        },
        pale_blue: {
          color: "#2a363b",
          bgcolor: "#3f5159",
          groupcolor: "#3f789e"
        },
        cyan: {
          color: "#233",
          bgcolor: "#355",
          groupcolor: "#8AA"
        },
        purple: {
          color: "#323",
          bgcolor: "#535",
          groupcolor: "#a1309b"
        },
        yellow: {
          color: "#432",
          bgcolor: "#653",
          groupcolor: "#b58b2a"
        },
        black: {
          color: "#222",
          bgcolor: "#000",
          groupcolor: "#444"
        }
      }, r.prototype.getCanvasMenuOptions = function () {
        var t = null;

        if (this.getMenuOptions ? t = this.getMenuOptions() : (t = [{
          content: "Add Node",
          has_submenu: !0,
          callback: r.onMenuAdd
        }, {
          content: "Add Group",
          callback: r.onGroupAdd
        }], this._graph_stack && this._graph_stack.length > 0 && t.push(null, {
          content: "Close subgraph",
          callback: this.closeSubgraph.bind(this)
        })), this.getExtraMenuOptions) {
          var e = this.getExtraMenuOptions(this, t);
          e && (t = t.concat(e));
        }

        return t;
      }, r.prototype.getNodeMenuOptions = function (t) {
        var e = null;

        if (t.getMenuOptions ? e = t.getMenuOptions(this) : (e = [{
          content: "Inputs",
          has_submenu: !0,
          disabled: !0,
          callback: r.showMenuNodeOptionalInputs
        }, {
          content: "Outputs",
          has_submenu: !0,
          disabled: !0,
          callback: r.showMenuNodeOptionalOutputs
        }, null, {
          content: "Properties",
          has_submenu: !0,
          callback: r.onShowMenuNodeProperties
        }, null, {
          content: "Title",
          callback: r.onShowPropertyEditor
        }, {
          content: "Mode",
          has_submenu: !0,
          callback: r.onMenuNodeMode
        }], !1 !== t.resizable && e.push({
          content: "Resize",
          callback: r.onMenuResizeNode
        }), e.push({
          content: "Collapse",
          callback: r.onMenuNodeCollapse
        }, {
          content: "Pin",
          callback: r.onMenuNodePin
        }, {
          content: "Colors",
          has_submenu: !0,
          callback: r.onMenuNodeColors
        }, {
          content: "Shapes",
          has_submenu: !0,
          callback: r.onMenuNodeShapes
        }, null)), t.onGetInputs) {
          var i = t.onGetInputs();
          i && i.length && (e[0].disabled = !1);
        }

        if (t.onGetOutputs) {
          var s = t.onGetOutputs();
          s && s.length && (e[1].disabled = !1);
        }

        if (t.getExtraMenuOptions) {
          var o = t.getExtraMenuOptions(this, e);
          o && (o.push(null), e = o.concat(e));
        }

        return !1 !== t.clonable && e.push({
          content: "Clone",
          callback: r.onMenuNodeClone
        }), e.push(null, {
          content: "Remove",
          disabled: !(!1 !== t.removable && !t.block_delete),
          callback: r.onMenuNodeRemove
        }), t.graph && t.graph.onGetNodeMenuOptions && t.graph.onGetNodeMenuOptions(e, t), e;
      }, r.prototype.getGroupMenuOptions = function (t) {
        var e = [{
          content: "Title",
          callback: r.onShowPropertyEditor
        }, {
          content: "Color",
          has_submenu: !0,
          callback: r.onMenuNodeColors
        }, {
          content: "Font size",
          property: "font_size",
          type: "Number",
          callback: r.onShowPropertyEditor
        }, null, {
          content: "Remove",
          callback: r.onMenuNodeRemove
        }];
        return e;
      }, r.prototype.processContextMenu = function (t, e) {
        function i(e, i, o) {
          if (e) {
            if ("Remove Slot" == e.content) {
              var n = e.slot;
              return t.graph.beforeChange(), n.input ? t.removeInput(n.slot) : n.output && t.removeOutput(n.slot), void t.graph.afterChange();
            }

            if ("Disconnect Links" == e.content) {
              n = e.slot;
              return t.graph.beforeChange(), n.output ? t.disconnectOutput(n.slot) : n.input && t.disconnectInput(n.slot), void t.graph.afterChange();
            }

            if ("Rename Slot" == e.content) {
              n = e.slot;
              var r = n.input ? t.getInputInfo(n.slot) : t.getOutputInfo(n.slot),
                  a = s.createDialog("<span class='name'>Name</span><input autofocus type='text'/><button>OK</button>", i),
                  u = a.querySelector("input");
              u && r && (u.value = r.label || "");

              var h = function () {
                t.graph.beforeChange(), u.value && (r && (r.label = u.value), s.setDirty(!0)), a.close(), t.graph.afterChange();
              };

              a.querySelector("button").addEventListener("click", h), u.addEventListener("keydown", function (t) {
                if (a.is_modified = !0, 27 == t.keyCode) a.close();else if (13 == t.keyCode) h();else if (13 != t.keyCode && "textarea" != t.target.localName) return;
                t.preventDefault(), t.stopPropagation();
              }), u.focus();
            }
          }
        }

        var s = this,
            o = r.active_canvas,
            n = o.getCanvasWindow(),
            a = null,
            u = {
          event: e,
          callback: i,
          extra: t
        };
        t && (u.title = t.type);
        var h = null;

        if (t && (h = t.getSlotInPosition(e.canvasX, e.canvasY), r.active_node = t), h) {
          if (a = [], t.getSlotMenuOptions) a = t.getSlotMenuOptions(h);else {
            h && h.output && h.output.links && h.output.links.length && a.push({
              content: "Disconnect Links",
              slot: h
            });
            var p = h.input || h.output;
            p.removable && a.push(p.locked ? "Cannot remove" : {
              content: "Remove Slot",
              slot: h
            }), p.nameLocked || a.push({
              content: "Rename Slot",
              slot: h
            });
          }
          u.title = (h.input ? h.input.type : h.output.type) || "*", h.input && h.input.type == m.ACTION && (u.title = "Action"), h.output && h.output.type == m.EVENT && (u.title = "Event");
        } else if (t) a = this.getNodeMenuOptions(t);else {
          a = this.getCanvasMenuOptions();
          var l = this.graph.getGroupOnPos(e.canvasX, e.canvasY);
          l && a.push(null, {
            content: "Edit Group",
            has_submenu: !0,
            submenu: {
              title: "Group",
              extra: l,
              options: this.getGroupMenuOptions(l)
            }
          });
        }

        if (a) new m.ContextMenu(a, u, n);
      }, "undefined" != typeof window && window.CanvasRenderingContext2D && !window.CanvasRenderingContext2D.prototype.roundRect && (window.CanvasRenderingContext2D.prototype.roundRect = function (t, e, i, s, o, n) {
        var r = 0,
            a = 0,
            u = 0,
            h = 0;

        if (0 !== o) {
          if (void 0 === n && (n = o), null != o && o.constructor === Array) {
            if (1 == o.length) r = a = u = h = o[0];else if (2 == o.length) r = h = o[0], a = u = o[1];else {
              if (4 != o.length) return;
              r = o[0], a = o[1], u = o[2], h = o[3];
            }
          } else r = o || 0, a = o || 0, u = n || 0, h = n || 0;
          this.moveTo(t + r, e), this.lineTo(t + i - a, e), this.quadraticCurveTo(t + i, e, t + i, e + a), this.lineTo(t + i, e + s - h), this.quadraticCurveTo(t + i, e + s, t + i - h, e + s), this.lineTo(t + h, e + s), this.quadraticCurveTo(t, e + s, t, e + s - u), this.lineTo(t, e + u), this.quadraticCurveTo(t, e, t + r, e);
        } else this.rect(t, e, i, s);
      }), m.compareObjects = a, m.distance = u, m.colorToString = h, m.isInsideRectangle = p, m.growBounding = l, m.isInsideBounding = d, m.overlapBounding = c, m.hex2num = _, m.num2hex = g, f.prototype.addItem = function (t, e, i) {
        function s(t) {
          var e = this.value;
          e && e.has_submenu && o.call(this, t);
        }

        function o(t) {
          var e = this.value,
              s = !0;

          if (n.current_submenu && n.current_submenu.close(t), i.callback) {
            var o = i.callback.call(this, e, i, t, n, i.node);
            !0 === o && (s = !1);
          }

          if (e) {
            if (e.callback && !i.ignore_item_callbacks && !0 !== e.disabled) {
              o = e.callback.call(this, e, i, t, n, i.extra);
              !0 === o && (s = !1);
            }

            if (e.submenu) {
              if (!e.submenu.options) throw "ContextMenu submenu needs options";
              new n.constructor(e.submenu.options, {
                callback: e.submenu.callback,
                event: t,
                parentMenu: n,
                ignore_item_callbacks: e.submenu.ignore_item_callbacks,
                title: e.submenu.title,
                extra: e.submenu.extra,
                autoopen: i.autoopen
              });
              s = !1;
            }
          }

          s && !n.lock && n.close();
        }

        var n = this;
        i = i || {};
        var r = document.createElement("div");
        r.className = "litemenu-entry submenu";
        var a = !1;
        return null === e ? r.classList.add("separator") : (r.innerHTML = e && e.title ? e.title : t, r.value = e, e && (e.disabled && (a = !0, r.classList.add("disabled")), (e.submenu || e.has_submenu) && r.classList.add("has_submenu")), "function" == typeof e ? (r.dataset.value = t, r.onclick_callback = e) : r.dataset.value = e, e.className && (r.className += " " + e.className)), this.root.appendChild(r), a || r.addEventListener("click", o), i.autoopen && m.pointerListenerAdd(r, "enter", s), r;
      }, f.prototype.close = function (t, e) {
        this.root.parentNode && this.root.parentNode.removeChild(this.root), this.parentMenu && !e && (this.parentMenu.lock = !1, this.parentMenu.current_submenu = null, void 0 === t ? this.parentMenu.close() : t && !f.isCursorOverElement(t, this.parentMenu.root) && f.trigger(this.parentMenu.root, m.pointerevents_method + "leave", t)), this.current_submenu && this.current_submenu.close(t, !0), this.root.closing_timer && clearTimeout(this.root.closing_timer);
      }, f.trigger = function (t, e, i, s) {
        var o = document.createEvent("CustomEvent");
        return o.initCustomEvent(e, !0, !0, i), o.srcElement = s, t.dispatchEvent ? t.dispatchEvent(o) : t.__events && t.__events.dispatchEvent(o), o;
      }, f.prototype.getTopMenu = function () {
        return this.options.parentMenu ? this.options.parentMenu.getTopMenu() : this;
      }, f.prototype.getFirstEvent = function () {
        return this.options.parentMenu ? this.options.parentMenu.getFirstEvent() : this.options.event;
      }, f.isCursorOverElement = function (t, e) {
        var i = t.clientX,
            s = t.clientY,
            o = e.getBoundingClientRect();
        return !!o && s > o.top && s < o.top + o.height && i > o.left && i < o.left + o.width;
      }, m.ContextMenu = f, m.closeAllContextMenus = function (t) {
        t = t || window;
        var e = t.document.querySelectorAll(".litecontextmenu");

        if (e.length) {
          for (var i = [], s = 0; s < e.length; s++) i.push(e[s]);

          for (s = 0; s < i.length; s++) i[s].close ? i[s].close() : i[s].parentNode && i[s].parentNode.removeChild(i[s]);
        }
      }, m.extendClass = function (t, e) {
        for (var i in e) t.hasOwnProperty(i) || (t[i] = e[i]);

        if (e.prototype) for (var i in e.prototype) e.prototype.hasOwnProperty(i) && (t.prototype.hasOwnProperty(i) || (e.prototype.__lookupGetter__(i) ? t.prototype.__defineGetter__(i, e.prototype.__lookupGetter__(i)) : t.prototype[i] = e.prototype[i], e.prototype.__lookupSetter__(i) && t.prototype.__defineSetter__(i, e.prototype.__lookupSetter__(i))));
      }, v.sampleCurve = function (t, e) {
        if (e) {
          for (var i = 0; i < e.length - 1; ++i) {
            var s = e[i],
                o = e[i + 1];

            if (!(o[0] < t)) {
              var n = o[0] - s[0];
              if (Math.abs(n) < 1e-5) return s[1];
              var r = (t - s[0]) / n;
              return s[1] * (1 - r) + o[1] * r;
            }
          }

          return 0;
        }
      }, v.prototype.draw = function (t, e, i, s, o, n) {
        var r = this.points;

        if (r) {
          this.size = e;
          var a = e[0] - 2 * this.margin,
              u = e[1] - 2 * this.margin;
          o = o || "#666", t.save(), t.translate(this.margin, this.margin), s && (t.fillStyle = "#111", t.fillRect(0, 0, a, u), t.fillStyle = "#222", t.fillRect(.5 * a, 0, 1, u), t.strokeStyle = "#333", t.strokeRect(0, 0, a, u)), t.strokeStyle = o, n && (t.globalAlpha = .5), t.beginPath();

          for (var h = 0; h < r.length; ++h) {
            var p = r[h];
            t.lineTo(p[0] * a, (1 - p[1]) * u);
          }

          if (t.stroke(), t.globalAlpha = 1, !n) for (h = 0; h < r.length; ++h) {
            p = r[h];
            t.fillStyle = this.selected == h ? "#FFF" : this.nearest == h ? "#DDD" : "#AAA", t.beginPath(), t.arc(p[0] * a, (1 - p[1]) * u, 2, 0, 2 * Math.PI), t.fill();
          }
          t.restore();
        }
      }, v.prototype.onMouseDown = function (t, e) {
        var i = this.points;

        if (i && !(t[1] < 0)) {
          var s = this.size[0] - 2 * this.margin,
              o = this.size[1] - 2 * this.margin,
              n = t[0] - this.margin,
              r = t[1] - this.margin,
              a = [n, r],
              u = 30 / e.ds.scale;

          if (this.selected = this.getCloserPoint(a, u), -1 == this.selected) {
            var h = [n / s, 1 - r / o];
            i.push(h), i.sort(function (t, e) {
              return t[0] - e[0];
            }), this.selected = i.indexOf(h), this.must_update = !0;
          }

          return -1 != this.selected || void 0;
        }
      }, v.prototype.onMouseMove = function (t, e) {
        var i = this.points;

        if (i) {
          var s = this.selected;

          if (!(s < 0)) {
            var o = (t[0] - this.margin) / (this.size[0] - 2 * this.margin),
                n = (t[1] - this.margin) / (this.size[1] - 2 * this.margin),
                r = [t[0] - this.margin, t[1] - this.margin],
                a = 30 / e.ds.scale;
            this._nearest = this.getCloserPoint(r, a);
            var u = i[s];

            if (u) {
              var h = 0 == s || s == i.length - 1;
              if (!h && (t[0] < -10 || t[0] > this.size[0] + 10 || t[1] < -10 || t[1] > this.size[1] + 10)) return i.splice(s, 1), void (this.selected = -1);
              u[0] = h ? 0 == s ? 0 : 1 : Math.clamp(o, 0, 1), u[1] = 1 - Math.clamp(n, 0, 1), i.sort(function (t, e) {
                return t[0] - e[0];
              }), this.selected = i.indexOf(u), this.must_update = !0;
            }
          }
        }
      }, v.prototype.onMouseUp = function (t, e) {
        return this.selected = -1, !1;
      }, v.prototype.getCloserPoint = function (t, e) {
        var i = this.points;
        if (!i) return -1;
        e = e || 30;

        for (var s = this.size[0] - 2 * this.margin, o = this.size[1] - 2 * this.margin, n = i.length, r = [0, 0], a = 1e6, u = -1, h = 0; h < n; ++h) {
          var p = i[h];
          r[0] = p[0] * s, r[1] = (1 - p[1]) * o, r[0] < t[0] && h;
          var l = vec2.distance(t, r);
          l > a || l > e || (u = h, a = l);
        }

        return u;
      }, m.CurveEditor = v, m.getParameterNames = function (t) {
        return (t + "").replace(/[/][/].*$/gm, "").replace(/\s+/g, "").replace(/[/][*][^/*]*[*][/]/g, "").split("){", 1)[0].replace(/^[^(]*[(]/, "").replace(/=[^,]+/g, "").split(",").filter(Boolean);
      }, m.pointerListenerAdd = function (t, e, i, s = !1) {
        if (t && t.addEventListener && e && "function" == typeof i) {
          var o = m.pointerevents_method,
              n = e;
          if ("pointer" == o && !window.PointerEvent) switch (console.warn("sMethod=='pointer' && !window.PointerEvent"), console.log("Converting pointer[" + n + "] : down move up cancel enter TO touchstart touchmove touchend, etc .."), n) {
            case "down":
              o = "touch", n = "start";
              break;

            case "move":
              o = "touch";
              break;

            case "up":
              o = "touch", n = "end";
              break;

            case "cancel":
              o = "touch";
              break;

            case "enter":
              console.log("debug: Should I send a move event?");
              break;

            default:
              console.warn("PointerEvent not available in this browser ? The event " + n + " would not be called");
          }

          switch (n) {
            case "down":
            case "up":
            case "move":
            case "over":
            case "out":
            case "enter":
              t.addEventListener(o + n, i, s);

            case "leave":
            case "cancel":
            case "gotpointercapture":
            case "lostpointercapture":
              if ("mouse" != o) return t.addEventListener(o + n, i, s);

            default:
              return t.addEventListener(n, i, s);
          }
        }
      }, m.pointerListenerRemove = function (t, e, i, s = !1) {
        if (t && t.removeEventListener && e && "function" == typeof i) switch (e) {
          case "down":
          case "up":
          case "move":
          case "over":
          case "out":
          case "enter":
            "pointer" != m.pointerevents_method && "mouse" != m.pointerevents_method || t.removeEventListener(m.pointerevents_method + e, i, s);

          case "leave":
          case "cancel":
          case "gotpointercapture":
          case "lostpointercapture":
            if ("pointer" == m.pointerevents_method) return t.removeEventListener(m.pointerevents_method + e, i, s);

          default:
            return t.removeEventListener(e, i, s);
        }
      }, Math.clamp = function (t, e, i) {
        return e > t ? e : i < t ? i : t;
      }, "undefined" == typeof window || window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t) {
        window.setTimeout(t, 1e3 / 60);
      });
    })(this), "undefined" != typeof exports && (exports.LiteGraph = this.LiteGraph), function (t) {
      function e() {
        this.addOutput("in ms", "number"), this.addOutput("in sec", "number");
      }

      function i() {
        this.size = [140, 80], this.properties = {
          enabled: !0
        }, this.enabled = !0, this.subgraph = new N.LGraph(), this.subgraph._subgraph_node = this, this.subgraph._is_subgraph = !0, this.subgraph.onTrigger = this.onSubgraphTrigger.bind(this), this.subgraph.onInputAdded = this.onSubgraphNewInput.bind(this), this.subgraph.onInputRenamed = this.onSubgraphRenamedInput.bind(this), this.subgraph.onInputTypeChanged = this.onSubgraphTypeChangeInput.bind(this), this.subgraph.onInputRemoved = this.onSubgraphRemovedInput.bind(this), this.subgraph.onOutputAdded = this.onSubgraphNewOutput.bind(this), this.subgraph.onOutputRenamed = this.onSubgraphRenamedOutput.bind(this), this.subgraph.onOutputTypeChanged = this.onSubgraphTypeChangeOutput.bind(this), this.subgraph.onOutputRemoved = this.onSubgraphRemovedOutput.bind(this);
      }

      function s() {
        this.addOutput("", "number"), this.name_in_graph = "", this.properties = {
          name: "",
          type: "number",
          value: 0
        };
        var t = this;
        this.name_widget = this.addWidget("text", "Name", this.properties.name, function (e) {
          e && t.setProperty("name", e);
        }), this.type_widget = this.addWidget("text", "Type", this.properties.type, function (e) {
          t.setProperty("type", e);
        }), this.value_widget = this.addWidget("number", "Value", this.properties.value, function (e) {
          t.setProperty("value", e);
        }), this.widgets_up = !0, this.size = [180, 90];
      }

      function o() {
        this.addInput("", ""), this.name_in_graph = "", this.properties = {
          name: "",
          type: ""
        };
        this.name_widget = this.addWidget("text", "Name", this.properties.name, "name"), this.type_widget = this.addWidget("text", "Type", this.properties.type, "type"), this.widgets_up = !0, this.size = [180, 60];
      }

      function n() {
        this.addOutput("value", "number"), this.addProperty("value", 1), this.widget = this.addWidget("number", "value", 1, "value"), this.widgets_up = !0, this.size = [180, 30];
      }

      function r() {
        this.addOutput("bool", "boolean"), this.addProperty("value", !0), this.widget = this.addWidget("toggle", "value", !0, "value"), this.serialize_widgets = !0, this.widgets_up = !0, this.size = [140, 30];
      }

      function a() {
        this.addOutput("string", "string"), this.addProperty("value", ""), this.widget = this.addWidget("text", "value", "", "value"), this.widgets_up = !0, this.size = [180, 30];
      }

      function u() {
        this.addOutput("obj", "object"), this.size = [120, 30], this._object = {};
      }

      function h() {
        this.addInput("url", "string"), this.addOutput("file", "string"), this.addProperty("url", ""), this.addProperty("type", "text"), this.widget = this.addWidget("text", "url", "", "url"), this._data = null;
      }

      function p() {
        this.addOutput("data", "object"), this.addProperty("value", ""), this.widget = this.addWidget("text", "json", "", "value"), this.widgets_up = !0, this.size = [140, 30], this._value = null;
      }

      function l() {
        this._value = [], this.addInput("json", ""), this.addOutput("arrayOut", "array"), this.addOutput("length", "number"), this.addProperty("value", "[]"), this.widget = this.addWidget("text", "array", this.properties.value, "value"), this.widgets_up = !0, this.size = [140, 50];
      }

      function d() {
        this.addInput("arr", "array"), this.addInput("value", ""), this.addOutput("arr", "array"), this.properties = {
          index: 0
        }, this.widget = this.addWidget("number", "i", this.properties.index, "index", {
          precision: 0,
          step: 10,
          min: 0
        });
      }

      function c() {
        this.addInput("array", "array,table,string"), this.addInput("index", "number"), this.addOutput("value", ""), this.addProperty("index", 0);
      }

      function _() {
        this.addInput("table", "table"), this.addInput("row", "number"), this.addInput("col", "number"), this.addOutput("value", ""), this.addProperty("row", 0), this.addProperty("column", 0);
      }

      function g() {
        this.addInput("obj", "object"), this.addOutput("property", 0), this.addProperty("value", 0), this.widget = this.addWidget("text", "prop.", "", this.setValue.bind(this)), this.widgets_up = !0, this.size = [140, 30], this._value = null;
      }

      function f() {
        this.addInput("obj", ""), this.addOutput("keys", "array"), this.size = [140, 30];
      }

      function v() {
        this.addInput("obj", ""), this.addInput("value", ""), this.addOutput("obj", ""), this.properties = {
          property: ""
        }, this.name_widget = this.addWidget("text", "prop.", this.properties.property, "property");
      }

      function m() {
        this.addInput("A", "object"), this.addInput("B", "object"), this.addOutput("out", "object"), this._result = {};
        var t = this;
        this.addWidget("button", "clear", "", function () {
          t._result = {};
        }), this.size = this.computeSize();
      }

      function y() {
        this.size = [60, 30], this.addInput("in"), this.addOutput("out"), this.properties = {
          varname: "myname",
          container: y.LITEGRAPH
        }, this.value = null;
      }

      function x(t) {
        return t && null != t.length ? Number(t.length) : 0;
      }

      function x(t) {
        return t && null != t.length ? Number(t.length) : 0;
      }

      function b() {
        this.size = [60, 30], this.addInput("data", 0), this.addInput("download", N.ACTION), this.properties = {
          filename: "data.json"
        }, this.value = null;
        var t = this;
        this.addWidget("button", "Download", "", function (e) {
          t.value && t.downloadAsFile();
        });
      }

      function T() {
        this.size = [60, 30], this.addInput("value", 0, {
          label: ""
        }), this.value = 0;
      }

      function E() {
        this.addInput("in", 0), this.addOutput("out", 0), this.size = [40, 30];
      }

      function w() {
        this.mode = N.ON_EVENT, this.size = [80, 30], this.addProperty("msg", ""), this.addInput("log", N.EVENT), this.addInput("msg", 0);
      }

      function O() {
        this.mode = N.ON_EVENT, this.addProperty("msg", ""), this.addInput("", N.EVENT);
        this.widget = this.addWidget("text", "Text", "", "msg"), this.widgets_up = !0, this.size = [200, 30];
      }

      function I() {
        this.size = [60, 30], this.addProperty("onExecute", "return A;"), this.addInput("A", 0), this.addInput("B", 0), this.addOutput("out", 0), this._func = null, this.data = {};
      }

      function D() {
        this.addInput("A", 0), this.addInput("B", 0), this.addOutput("true", "boolean"), this.addOutput("false", "boolean"), this.addProperty("A", 1), this.addProperty("B", 1), this.addProperty("OP", "==", "enum", {
          values: D.values
        }), this.addWidget("combo", "Op.", this.properties.OP, {
          property: "OP",
          values: D.values
        }), this.size = [80, 60];
      }

      var N = t.LiteGraph;
      e.title = "Time", e.desc = "Time", e.prototype.onExecute = function () {
        this.setOutputData(0, 1e3 * this.graph.globaltime), this.setOutputData(1, this.graph.globaltime);
      }, N.registerNodeType("basic/time", e), i.title = "Subgraph", i.desc = "Graph inside a node", i.title_color = "#334", i.prototype.onGetInputs = function () {
        return [["enabled", "boolean"]];
      }, i.prototype.onDblClick = function (t, e, i) {
        var s = this;
        setTimeout(function () {
          i.openSubgraph(s.subgraph);
        }, 10);
      }, i.prototype.onAction = function (t, e) {
        this.subgraph.onAction(t, e);
      }, i.prototype.onExecute = function () {
        if (this.enabled = this.getInputOrProperty("enabled"), this.enabled) {
          if (this.inputs) for (var t = 0; t < this.inputs.length; t++) {
            var e = this.inputs[t],
                i = this.getInputData(t);
            this.subgraph.setInputData(e.name, i);
          }
          if (this.subgraph.runStep(), this.outputs) for (t = 0; t < this.outputs.length; t++) {
            var s = this.outputs[t];
            i = this.subgraph.getOutputData(s.name);
            this.setOutputData(t, i);
          }
        }
      }, i.prototype.sendEventToAllNodes = function (t, e, i) {
        this.enabled && this.subgraph.sendEventToAllNodes(t, e, i);
      }, i.prototype.onDrawBackground = function (t, e, i, s) {
        if (this.flags.collapsed) return;
        var o = this.size[1] - N.NODE_TITLE_HEIGHT + .5,
            n = N.isInsideRectangle(s[0], s[1], this.pos[0], this.pos[1] + o, this.size[0], N.NODE_TITLE_HEIGHT);
        let r = N.isInsideRectangle(s[0], s[1], this.pos[0], this.pos[1] + o, this.size[0] / 2, N.NODE_TITLE_HEIGHT);
        t.fillStyle = n ? "#555" : "#222", t.beginPath(), this._shape == N.BOX_SHAPE ? r ? t.rect(0, o, this.size[0] / 2 + 1, N.NODE_TITLE_HEIGHT) : t.rect(this.size[0] / 2, o, this.size[0] / 2 + 1, N.NODE_TITLE_HEIGHT) : r ? t.roundRect(0, o, this.size[0] / 2 + 1, N.NODE_TITLE_HEIGHT, [0, 0, 8, 8]) : t.roundRect(this.size[0] / 2, o, this.size[0] / 2 + 1, N.NODE_TITLE_HEIGHT, [0, 0, 8, 8]), n ? t.fill() : t.fillRect(0, o, this.size[0] + 1, N.NODE_TITLE_HEIGHT), t.textAlign = "center", t.font = "24px Arial", t.fillStyle = n ? "#DDD" : "#999", t.fillText("+", .25 * this.size[0], o + 24), t.fillText("+", .75 * this.size[0], o + 24);
      }, i.prototype.onMouseDown = function (t, e, i) {
        var s = this.size[1] - N.NODE_TITLE_HEIGHT + .5;
        console.log(0), e[1] > s && (e[0] < this.size[0] / 2 ? (console.log(1), i.showSubgraphPropertiesDialog(this)) : (console.log(2), i.showSubgraphPropertiesDialogRight(this)));
      }, i.prototype.computeSize = function () {
        var t = this.inputs ? this.inputs.length : 0,
            e = this.outputs ? this.outputs.length : 0;
        return [200, Math.max(t, e) * N.NODE_SLOT_HEIGHT + N.NODE_TITLE_HEIGHT];
      }, i.prototype.onSubgraphTrigger = function (t, e) {
        var i = this.findOutputSlot(t);
        -1 != i && this.triggerSlot(i);
      }, i.prototype.onSubgraphNewInput = function (t, e) {
        var i = this.findInputSlot(t);
        -1 == i && this.addInput(t, e);
      }, i.prototype.onSubgraphRenamedInput = function (t, e) {
        var i = this.findInputSlot(t);

        if (-1 != i) {
          var s = this.getInputInfo(i);
          s.name = e;
        }
      }, i.prototype.onSubgraphTypeChangeInput = function (t, e) {
        var i = this.findInputSlot(t);

        if (-1 != i) {
          var s = this.getInputInfo(i);
          s.type = e;
        }
      }, i.prototype.onSubgraphRemovedInput = function (t) {
        var e = this.findInputSlot(t);
        -1 != e && this.removeInput(e);
      }, i.prototype.onSubgraphNewOutput = function (t, e) {
        var i = this.findOutputSlot(t);
        -1 == i && this.addOutput(t, e);
      }, i.prototype.onSubgraphRenamedOutput = function (t, e) {
        var i = this.findOutputSlot(t);

        if (-1 != i) {
          var s = this.getOutputInfo(i);
          s.name = e;
        }
      }, i.prototype.onSubgraphTypeChangeOutput = function (t, e) {
        var i = this.findOutputSlot(t);

        if (-1 != i) {
          var s = this.getOutputInfo(i);
          s.type = e;
        }
      }, i.prototype.onSubgraphRemovedOutput = function (t) {
        var e = this.findInputSlot(t);
        -1 != e && this.removeOutput(e);
      }, i.prototype.getExtraMenuOptions = function (t) {
        var e = this;
        return [{
          content: "Open",
          callback: function () {
            t.openSubgraph(e.subgraph);
          }
        }];
      }, i.prototype.onResize = function (t) {
        t[1] += 20;
      }, i.prototype.serialize = function () {
        var t = N.LGraphNode.prototype.serialize.call(this);
        return t.subgraph = this.subgraph.serialize(), t;
      }, i.prototype.clone = function () {
        var t = N.createNode(this.type),
            e = this.serialize();
        return delete e.id, delete e.inputs, delete e.outputs, t.configure(e), t;
      }, i.prototype.buildFromNodes = function (t) {
        for (var e = {}, i = 0, s = 0; s < t.length; ++s) {
          var o = t[s];
          e[o.id] = o, i = Math.min(o.pos[0], i), Math.max(o.pos[0], i);
        }

        for (s = 0; s < t.length; ++s) {
          o = t[s];
          if (o.inputs) for (var n = 0; n < o.inputs.length; ++n) {
            var r = o.inputs[n];

            if (r && r.link) {
              var a = o.graph.links[r.link];
              a && (e[a.origin_id] || this.subgraph.addInput(r.name, a.type));
            }
          }
          if (o.outputs) for (n = 0; n < o.outputs.length; ++n) {
            var u = o.outputs[n];
            if (u && u.links && u.links.length) for (var h = 0; h < u.links.length; ++h) {
              a = o.graph.links[u.links[h]];

              if (a && !e[a.target_id]) {
                !0;
                break;
              }
            }
          }
        }
      }, N.Subgraph = i, N.registerNodeType("graph/subgraph", i), s.title = "Input", s.desc = "Input of the graph", s.prototype.onConfigure = function () {
        this.updateType();
      }, s.prototype.updateType = function () {
        var t = this.properties.type;
        this.type_widget.value = t, this.outputs[0].type != t && (N.isValidConnection(this.outputs[0].type, t) || this.disconnectOutput(0), this.outputs[0].type = t), "number" == t ? (this.value_widget.type = "number", this.value_widget.value = 0) : "boolean" == t ? (this.value_widget.type = "toggle", this.value_widget.value = !0) : "string" == t ? (this.value_widget.type = "text", this.value_widget.value = "") : (this.value_widget.type = null, this.value_widget.value = null), this.properties.value = this.value_widget.value, this.graph && this.name_in_graph && this.graph.changeInputType(this.name_in_graph, t);
      }, s.prototype.onPropertyChanged = function (t, e) {
        if ("name" == t) {
          if ("" == e || e == this.name_in_graph || "enabled" == e) return !1;
          this.graph && (this.name_in_graph ? this.graph.renameInput(this.name_in_graph, e) : this.graph.addInput(e, this.properties.type)), this.name_widget.value = e, this.name_in_graph = e;
        } else "type" == t && this.updateType();
      }, s.prototype.getTitle = function () {
        return this.flags.collapsed ? this.properties.name : this.title;
      }, s.prototype.onAction = function (t, e) {
        this.properties.type == N.EVENT && this.triggerSlot(0, e);
      }, s.prototype.onExecute = function () {
        var t = this.properties.name,
            e = this.graph.inputs[t];
        e ? this.setOutputData(0, void 0 !== e.value ? e.value : this.properties.value) : this.setOutputData(0, this.properties.value);
      }, s.prototype.onRemoved = function () {
        this.name_in_graph && this.graph.removeInput(this.name_in_graph);
      }, N.GraphInput = s, N.registerNodeType("graph/input", s), o.title = "Output", o.desc = "Output of the graph", o.prototype.onPropertyChanged = function (t, e) {
        if ("name" == t) {
          if ("" == e || e == this.name_in_graph || "enabled" == e) return !1;
          this.graph && (this.name_in_graph ? this.graph.renameOutput(this.name_in_graph, e) : this.graph.addOutput(e, this.properties.type)), this.name_widget.value = e, this.name_in_graph = e;
        } else "type" == t && this.updateType();
      }, o.prototype.updateType = function () {
        var t = this.properties.type;
        this.type_widget && (this.type_widget.value = t), this.inputs[0].type != t && ("action" != t && "event" != t || (t = N.EVENT), N.isValidConnection(this.inputs[0].type, t) || this.disconnectInput(0), this.inputs[0].type = t), this.graph && this.name_in_graph && this.graph.changeOutputType(this.name_in_graph, t);
      }, o.prototype.onExecute = function () {
        this._value = this.getInputData(0), this.graph.setOutputData(this.properties.name, this._value);
      }, o.prototype.onAction = function (t, e) {
        this.properties.type == N.ACTION && this.graph.trigger(this.properties.name, e);
      }, o.prototype.onRemoved = function () {
        this.name_in_graph && this.graph.removeOutput(this.name_in_graph);
      }, o.prototype.getTitle = function () {
        return this.flags.collapsed ? this.properties.name : this.title;
      }, N.GraphOutput = o, N.registerNodeType("graph/output", o), n.title = "Const Number", n.desc = "Constant number", n.prototype.onExecute = function () {
        this.setOutputData(0, parseFloat(this.properties.value));
      }, n.prototype.getTitle = function () {
        return this.flags.collapsed ? this.properties.value : this.title;
      }, n.prototype.setValue = function (t) {
        this.setProperty("value", t);
      }, n.prototype.onDrawBackground = function (t) {
        this.outputs[0].label = this.properties.value.toFixed(3);
      }, N.registerNodeType("basic/const", n), r.title = "Const Boolean", r.desc = "Constant boolean", r.prototype.getTitle = n.prototype.getTitle, r.prototype.onExecute = function () {
        this.setOutputData(0, this.properties.value);
      }, r.prototype.setValue = n.prototype.setValue, r.prototype.onGetInputs = function () {
        return [["toggle", N.ACTION]];
      }, r.prototype.onAction = function (t) {
        this.setValue(!this.properties.value);
      }, N.registerNodeType("basic/boolean", r), a.title = "Const String", a.desc = "Constant string", a.prototype.getTitle = n.prototype.getTitle, a.prototype.onExecute = function () {
        this.setOutputData(0, this.properties.value);
      }, a.prototype.setValue = n.prototype.setValue, a.prototype.onDropFile = function (t) {
        var e = this,
            i = new FileReader();
        i.onload = function (t) {
          e.setProperty("value", t.target.result);
        }, i.readAsText(t);
      }, N.registerNodeType("basic/string", a), u.title = "Const Object", u.desc = "Constant Object", u.prototype.onExecute = function () {
        this.setOutputData(0, this._object);
      }, N.registerNodeType("basic/object", u), h.title = "Const File", h.desc = "Fetches a file from an url", h["@type"] = {
        type: "enum",
        values: ["text", "arraybuffer", "blob", "json"]
      }, h.prototype.onPropertyChanged = function (t, e) {
        "url" == t && (null == e || "" == e ? this._data = null : this.fetchFile(e));
      }, h.prototype.onExecute = function () {
        var t = this.getInputData(0) || this.properties.url;
        !t || t == this._url && this._type == this.properties.type || this.fetchFile(t), this.setOutputData(0, this._data);
      }, h.prototype.setValue = n.prototype.setValue, h.prototype.fetchFile = function (t) {
        var e = this;
        if (!t || t.constructor !== String) return e._data = null, void (e.boxcolor = null);
        this._url = t, this._type = this.properties.type, "http" == t.substr(0, 4) && N.proxy && (t = N.proxy + t.substr(t.indexOf(":") + 3)), fetch(t).then(function (t) {
          if (!t.ok) throw new Error("File not found");
          return "arraybuffer" == e.properties.type ? t.arrayBuffer() : "text" == e.properties.type ? t.text() : "json" == e.properties.type ? t.json() : "blob" == e.properties.type ? t.blob() : void 0;
        }).then(function (t) {
          e._data = t, e.boxcolor = "#AEA";
        }).catch(function (i) {
          e._data = null, e.boxcolor = "red", console.error("error fetching file:", t);
        });
      }, h.prototype.onDropFile = function (t) {
        var e = this;
        this._url = t.name, this._type = this.properties.type, this.properties.url = t.name;
        var i = new FileReader();
        if (i.onload = function (t) {
          e.boxcolor = "#AEA";
          var i = t.target.result;
          "json" == e.properties.type && (i = JSON.parse(i)), e._data = i;
        }, "arraybuffer" == e.properties.type) i.readAsArrayBuffer(t);else if ("text" == e.properties.type || "json" == e.properties.type) i.readAsText(t);else if ("blob" == e.properties.type) return i.readAsBinaryString(t);
      }, N.registerNodeType("basic/file", h), p.title = "Const Data", p.desc = "Constant Data", p.prototype.onPropertyChanged = function (t, e) {
        if (this.widget.value = e, null != e && "" != e) try {
          this._value = JSON.parse(e), this.boxcolor = "#AEA";
        } catch (t) {
          this.boxcolor = "red";
        }
      }, p.prototype.onExecute = function () {
        this.setOutputData(0, this._value);
      }, p.prototype.setValue = n.prototype.setValue, N.registerNodeType("basic/data", p), l.title = "Const Array", l.desc = "Constant Array", l.prototype.onPropertyChanged = function (t, e) {
        if (this.widget.value = e, null != e && "" != e) try {
          "[" != e[0] ? this._value = JSON.parse("[" + e + "]") : this._value = JSON.parse(e), this.boxcolor = "#AEA";
        } catch (t) {
          this.boxcolor = "red";
        }
      }, l.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t && t.length) {
          this._value || (this._value = new Array()), this._value.length = t.length;

          for (var e = 0; e < t.length; ++e) this._value[e] = t[e];
        }

        this.setOutputData(0, this._value), this.setOutputData(1, this._value && this._value.length || 0);
      }, l.prototype.setValue = n.prototype.setValue, N.registerNodeType("basic/array", l), d.title = "Set Array", d.desc = "Sets index of array", d.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          var e = this.getInputData(1);
          void 0 !== e && (this.properties.index && (t[Math.floor(this.properties.index)] = e), this.setOutputData(0, t));
        }
      }, N.registerNodeType("basic/set_array", d), c.title = "Array[i]", c.desc = "Returns an element from an array", c.prototype.onExecute = function () {
        var t = this.getInputData(0),
            e = this.getInputData(1);
        null == e && (e = this.properties.index), null != t && null != e && this.setOutputData(0, t[Math.floor(Number(e))]);
      }, N.registerNodeType("basic/array[]", c), _.title = "Table[row][col]", _.desc = "Returns an element from a table", _.prototype.onExecute = function () {
        var t = this.getInputData(0),
            e = this.getInputData(1),
            i = this.getInputData(2);

        if (null == e && (e = this.properties.row), null == i && (i = this.properties.column), null != t && null != e && null != i) {
          e = t[Math.floor(Number(e))];
          e ? this.setOutputData(0, e[Math.floor(Number(i))]) : this.setOutputData(0, null);
        }
      }, N.registerNodeType("basic/table[][]", _), g.title = "Object property", g.desc = "Outputs the property of an object", g.prototype.setValue = function (t) {
        this.properties.value = t, this.widget.value = t;
      }, g.prototype.getTitle = function () {
        return this.flags.collapsed ? "in." + this.properties.value : this.title;
      }, g.prototype.onPropertyChanged = function (t, e) {
        this.widget.value = e;
      }, g.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && this.setOutputData(0, t[this.properties.value]);
      }, N.registerNodeType("basic/object_property", g), f.title = "Object keys", f.desc = "Outputs an array with the keys of an object", f.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && this.setOutputData(0, Object.keys(t));
      }, N.registerNodeType("basic/object_keys", f), v.title = "Set Object", v.desc = "Adds propertiesrty to object", v.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          var e = this.getInputData(1);
          void 0 !== e && (this.properties.property && (t[this.properties.property] = e), this.setOutputData(0, t));
        }
      }, N.registerNodeType("basic/set_object", v), m.title = "Merge Objects", m.desc = "Creates an object copying properties from others", m.prototype.onExecute = function () {
        var t = this.getInputData(0),
            e = this.getInputData(1),
            i = this._result;
        if (t) for (var s in t) i[s] = t[s];
        if (e) for (var s in e) i[s] = e[s];
        this.setOutputData(0, i);
      }, N.registerNodeType("basic/merge_objects", m), y.title = "Variable", y.desc = "store/read variable value", y.LITEGRAPH = 0, y.GRAPH = 1, y.GLOBALSCOPE = 2, y["@container"] = {
        type: "enum",
        values: {
          litegraph: y.LITEGRAPH,
          graph: y.GRAPH,
          global: y.GLOBALSCOPE
        }
      }, y.prototype.onExecute = function () {
        var t = this.getContainer();
        if (this.isInputConnected(0)) return this.value = this.getInputData(0), t[this.properties.varname] = this.value, void this.setOutputData(0, this.value);
        this.setOutputData(0, t[this.properties.varname]);
      }, y.prototype.getContainer = function () {
        switch (this.properties.container) {
          case y.GRAPH:
            return this.graph ? this.graph.vars : {};

          case y.GLOBALSCOPE:
            return t;

          case y.LITEGRAPH:
          default:
            return N.Globals;
        }
      }, y.prototype.getTitle = function () {
        return this.properties.varname;
      }, N.registerNodeType("basic/variable", y), N.wrapFunctionAsNode("basic/length", x, [""], "number"), N.wrapFunctionAsNode("basic/not", function (t) {
        return !t;
      }, [""], "boolean"), b.title = "Download", b.desc = "Download some data", b.prototype.downloadAsFile = function () {
        if (null != this.value) {
          var t = null;
          t = this.value.constructor === String ? this.value : JSON.stringify(this.value);
          var e = new Blob([t]),
              i = URL.createObjectURL(e),
              s = document.createElement("a");
          s.setAttribute("href", i), s.setAttribute("download", this.properties.filename), s.style.display = "none", document.body.appendChild(s), s.click(), document.body.removeChild(s), setTimeout(function () {
            URL.revokeObjectURL(i);
          }, 6e4);
        }
      }, b.prototype.onAction = function (t, e) {
        var i = this;
        setTimeout(function () {
          i.downloadAsFile();
        }, 100);
      }, b.prototype.onExecute = function () {
        this.inputs[0] && (this.value = this.getInputData(0));
      }, b.prototype.getTitle = function () {
        return this.flags.collapsed ? this.properties.filename : this.title;
      }, N.registerNodeType("basic/download", b), T.title = "Watch", T.desc = "Show value of input", T.prototype.onExecute = function () {
        this.inputs[0] && (this.value = this.getInputData(0));
      }, T.prototype.getTitle = function () {
        return this.flags.collapsed ? this.inputs[0].label : this.title;
      }, T.toString = function (t) {
        if (null == t) return "null";
        if (t.constructor === Number) return t.toFixed(3);

        if (t.constructor === Array) {
          for (var e = "[", i = 0; i < t.length; ++i) e += T.toString(t[i]) + (i + 1 != t.length ? "," : "");

          return e += "]", e;
        }

        return String(t);
      }, T.prototype.onDrawBackground = function (t) {
        this.inputs[0].label = T.toString(this.value);
      }, N.registerNodeType("basic/watch", T), E.title = "Cast", E.desc = "Allows to connect different types", E.prototype.onExecute = function () {
        this.setOutputData(0, this.getInputData(0));
      }, N.registerNodeType("basic/cast", E), w.title = "Console", w.desc = "Show value inside the console", w.prototype.onAction = function (t, e) {
        var i = this.getInputData(1);
        i || (i = this.properties.msg), i || (i = "Event: " + e), "log" == t ? console.log(i) : "warn" == t ? console.warn(i) : "error" == t && console.error(i);
      }, w.prototype.onExecute = function () {
        var t = this.getInputData(1);
        t || (t = this.properties.msg), null != t && void 0 !== t && (this.properties.msg = t, console.log(t));
      }, w.prototype.onGetInputs = function () {
        return [["log", N.ACTION], ["warn", N.ACTION], ["error", N.ACTION]];
      }, N.registerNodeType("basic/console", w), O.title = "Alert", O.desc = "Show an alert window", O.color = "#510", O.prototype.onConfigure = function (t) {
        this.widget.value = t.properties.msg;
      }, O.prototype.onAction = function (t, e) {
        var i = this.properties.msg;
        setTimeout(function () {
          alert(i);
        }, 10);
      }, N.registerNodeType("basic/alert", O), I.prototype.onConfigure = function (t) {
        t.properties.onExecute && N.allow_scripts ? this.compileCode(t.properties.onExecute) : console.warn("Script not compiled, LiteGraph.allow_scripts is false");
      }, I.title = "Script", I.desc = "executes a code (max 100 characters)", I.widgets_info = {
        onExecute: {
          type: "code"
        }
      }, I.prototype.onPropertyChanged = function (t, e) {
        "onExecute" == t && N.allow_scripts ? this.compileCode(e) : console.warn("Script not compiled, LiteGraph.allow_scripts is false");
      }, I.prototype.compileCode = function (t) {
        if (this._func = null, t.length > 256) console.warn("Script too long, max 256 chars");else {
          for (var e = t.toLowerCase(), i = ["script", "body", "document", "eval", "nodescript", "function"], s = 0; s < i.length; ++s) if (-1 != e.indexOf(i[s])) return void console.warn("invalid script");

          try {
            this._func = new Function("A", "B", "C", "DATA", "node", t);
          } catch (t) {
            console.error("Error parsing script"), console.error(t);
          }
        }
      }, I.prototype.onExecute = function () {
        if (this._func) try {
          var t = this.getInputData(0),
              e = this.getInputData(1),
              i = this.getInputData(2);
          this.setOutputData(0, this._func(t, e, i, this.data, this));
        } catch (t) {
          console.error("Error in script"), console.error(t);
        }
      }, I.prototype.onGetOutputs = function () {
        return [["C", ""]];
      }, N.registerNodeType("basic/script", I), D.values = ["==", "!="], D["@OP"] = {
        type: "enum",
        title: "operation",
        values: D.values
      }, D.title = "Compare *", D.desc = "evaluates condition between A and B", D.prototype.getTitle = function () {
        return "*A " + this.properties.OP + " *B";
      }, D.prototype.onExecute = function () {
        var t = this.getInputData(0);
        void 0 === t ? t = this.properties.A : this.properties.A = t;
        var e = this.getInputData(1);
        void 0 === e ? e = this.properties.B : this.properties.B = e;
        var i = !1;
        if (typeof t == typeof e) switch (this.properties.OP) {
          case "==":
          case "!=":
            switch (i = !0, typeof t) {
              case "object":
                var s = Object.getOwnPropertyNames(t),
                    o = Object.getOwnPropertyNames(e);

                if (s.length != o.length) {
                  i = !1;
                  break;
                }

                for (var n = 0; n < s.length; n++) {
                  var r = s[n];

                  if (t[r] !== e[r]) {
                    i = !1;
                    break;
                  }
                }

                break;

              default:
                i = t == e;
            }

            "!=" == this.properties.OP && (i = !i);
        }
        this.setOutputData(0, i), this.setOutputData(1, !i);
      }, N.registerNodeType("basic/CompareValues", D);
    }(this), function (t) {
      function e() {
        this.size = [60, 30], this.addInput("event", d.ACTION);
      }

      function i() {
        this.size = [60, 30], this.addInput("if", ""), this.addOutput("true", d.EVENT), this.addOutput("change", d.EVENT), this.addOutput("false", d.EVENT), this.properties = {
          only_on_change: !0
        }, this.prev = 0;
      }

      function s() {
        var t = this;
        this.addInput("", d.ACTION), this.addInput("", d.ACTION), this.addInput("", d.ACTION), this.addOutput("", d.EVENT), this.addOutput("", d.EVENT), this.addOutput("", d.EVENT), this.addWidget("button", "+", null, function () {
          t.addInput("", d.ACTION), t.addOutput("", d.EVENT);
        }), this.size = [90, 70], this.flags = {
          horizontal: !0,
          render_box: !1
        };
      }

      function o() {
        var t = this;
        this.properties = {
          index: 0
        }, this.addInput("index", "number"), this.addInput("step", d.ACTION), this.addInput("reset", d.ACTION), this.addOutput("index", "number"), this.addOutput("", d.EVENT), this.addOutput("", d.EVENT), this.addOutput("", d.EVENT, {
          removable: !0
        }), this.addWidget("button", "+", null, function () {
          t.addOutput("", d.EVENT, {
            removable: !0
          });
        }), this.size = [120, 120], this.flags = {
          render_box: !1
        };
      }

      function n() {
        this.size = [60, 30], this.addInput("event", d.ACTION), this.addOutput("event", d.EVENT), this.properties = {
          equal_to: "",
          has_property: "",
          property_equal_to: ""
        };
      }

      function r() {
        this.addInput("in", d.ACTION), this.addInput("cond", "boolean"), this.addOutput("true", d.EVENT), this.addOutput("false", d.EVENT), this.size = [120, 60], this._value = !1;
      }

      function a() {
        this.addInput("inc", d.ACTION), this.addInput("dec", d.ACTION), this.addInput("reset", d.ACTION), this.addOutput("change", d.EVENT), this.addOutput("num", "number"), this.addProperty("doCountExecution", !1, "boolean", {
          name: "Count Executions"
        }), this.addWidget("toggle", "Count Exec.", this.properties.doCountExecution, "doCountExecution"), this.num = 0;
      }

      function u() {
        this.size = [60, 30], this.addProperty("time_in_ms", 1e3), this.addInput("event", d.ACTION), this.addOutput("on_time", d.EVENT), this._pending = [];
      }

      function h() {
        this.addProperty("interval", 1e3), this.addProperty("event", "tick"), this.addOutput("on_tick", d.EVENT), this.time = 0, this.last_interval = 1e3, this.triggered = !1;
      }

      function p() {
        this.addInput("go", d.ACTION), this.addInput("green", d.ACTION), this.addInput("red", d.ACTION), this.addOutput("continue", d.EVENT), this.addOutput("blocked", d.EVENT), this.addOutput("is_green", "boolean"), this._ready = !1, this.properties = {};
        var t = this;
        this.addWidget("button", "reset", "", function () {
          t._ready = !1;
        });
      }

      function l() {
        this.addInput("data", 0), this.addInput("assign", d.ACTION), this.addOutput("data", 0), this._last_value = null, this.properties = {
          data: null,
          serialize: !0
        };
        var t = this;
        this.addWidget("button", "store", "", function () {
          t.properties.data = t._last_value;
        });
      }

      var d = t.LiteGraph;
      e.title = "Log Event", e.desc = "Log event in console", e.prototype.onAction = function (t, e, i) {
        console.log(t, e);
      }, d.registerNodeType("events/log", e), i.title = "TriggerEvent", i.desc = "Triggers event if input evaluates to true", i.prototype.onExecute = function (t, e) {
        var i = this.getInputData(0),
            s = i != this.prev;
        0 === this.prev && (s = !1);
        var o = s && this.properties.only_on_change || !s && !this.properties.only_on_change;
        i && o && this.triggerSlot(0, t, null, e), !i && o && this.triggerSlot(2, t, null, e), s && this.triggerSlot(1, t, null, e), this.prev = i;
      }, d.registerNodeType("events/trigger", i), s.title = "Sequence", s.desc = "Triggers a sequence of events when an event arrives", s.prototype.getTitle = function () {
        return "";
      }, s.prototype.onAction = function (t, e, i) {
        if (this.outputs) {
          i = i || {};

          for (var s = 0; s < this.outputs.length; ++s) {
            this.outputs[s];
            i.action_call ? i.action_call = i.action_call + "_seq_" + s : i.action_call = this.id + "_" + (t || "action") + "_seq_" + s + "_" + Math.floor(9999 * Math.random()), this.triggerSlot(s, e, null, i);
          }
        }
      }, d.registerNodeType("events/sequence", s), o.title = "Stepper", o.desc = "Trigger events sequentially when an tick arrives", o.prototype.onDrawBackground = function (t) {
        if (!this.flags.collapsed) {
          var e = this.properties.index || 0;
          t.fillStyle = "#AFB";
          var i = this.size[0],
              s = (e + 1) * d.NODE_SLOT_HEIGHT + 4;
          t.beginPath(), t.moveTo(i - 30, s), t.lineTo(i - 30, s + d.NODE_SLOT_HEIGHT), t.lineTo(i - 15, s + .5 * d.NODE_SLOT_HEIGHT), t.fill();
        }
      }, o.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && (t = Math.floor(t), t = Math.clamp(t, 0, this.outputs ? this.outputs.length - 2 : 0), t != this.properties.index && (this.properties.index = t, this.triggerSlot(t + 1))), this.setOutputData(0, this.properties.index);
      }, o.prototype.onAction = function (t, e) {
        if ("reset" == t) this.properties.index = 0;else if ("step" == t) {
          this.triggerSlot(this.properties.index + 1, e);
          var i = this.outputs ? this.outputs.length - 1 : 0;
          this.properties.index = (this.properties.index + 1) % i;
        }
      }, d.registerNodeType("events/stepper", o), n.title = "Filter Event", n.desc = "Blocks events that do not match the filter", n.prototype.onAction = function (t, e, i) {
        if (null != e && (!this.properties.equal_to || this.properties.equal_to == e)) {
          if (this.properties.has_property) {
            var s = e[this.properties.has_property];
            if (null == s) return;
            if (this.properties.property_equal_to && this.properties.property_equal_to != s) return;
          }

          this.triggerSlot(0, e, null, i);
        }
      }, d.registerNodeType("events/filter", n), r.title = "Branch", r.desc = "If condition is true, outputs triggers true, otherwise false", r.prototype.onExecute = function () {
        this._value = this.getInputData(1);
      }, r.prototype.onAction = function (t, e, i) {
        this._value = this.getInputData(1), this.triggerSlot(this._value ? 0 : 1, e, null, i);
      }, d.registerNodeType("events/branch", r), a.title = "Counter", a.desc = "Counts events", a.prototype.getTitle = function () {
        return this.flags.collapsed ? String(this.num) : this.title;
      }, a.prototype.onAction = function (t, e, i) {
        var s = this.num;
        "inc" == t ? this.num += 1 : "dec" == t ? this.num -= 1 : "reset" == t && (this.num = 0), this.num != s && this.trigger("change", this.num);
      }, a.prototype.onDrawBackground = function (t) {
        this.flags.collapsed || (t.fillStyle = "#AAA", t.font = "20px Arial", t.textAlign = "center", t.fillText(this.num, .5 * this.size[0], .5 * this.size[1]));
      }, a.prototype.onExecute = function () {
        this.properties.doCountExecution && (this.num += 1), this.setOutputData(1, this.num);
      }, d.registerNodeType("events/counter", a), u.title = "Delay", u.desc = "Delays one event", u.prototype.onAction = function (t, e, i) {
        var s = this.properties.time_in_ms;
        s <= 0 ? this.trigger(null, e, i) : this._pending.push([s, e]);
      }, u.prototype.onExecute = function (t, e) {
        var i = 1e3 * this.graph.elapsed_time;
        this.isInputConnected(1) && (this.properties.time_in_ms = this.getInputData(1));

        for (var s = 0; s < this._pending.length; ++s) {
          var o = this._pending[s];
          o[0] -= i, o[0] > 0 || (this._pending.splice(s, 1), --s, this.trigger(null, o[1], e));
        }
      }, u.prototype.onGetInputs = function () {
        return [["event", d.ACTION], ["time_in_ms", "number"]];
      }, d.registerNodeType("events/delay", u), h.title = "Timer", h.desc = "Sends an event every N milliseconds", h.prototype.onStart = function () {
        this.time = 0;
      }, h.prototype.getTitle = function () {
        return "Timer: " + this.last_interval.toString() + "ms";
      }, h.on_color = "#AAA", h.off_color = "#222", h.prototype.onDrawBackground = function () {
        this.boxcolor = this.triggered ? h.on_color : h.off_color, this.triggered = !1;
      }, h.prototype.onExecute = function () {
        var t = 1e3 * this.graph.elapsed_time,
            e = 0 == this.time;
        this.time += t, this.last_interval = Math.max(1, 0 | this.getInputOrProperty("interval")), e || !(this.time < this.last_interval || isNaN(this.last_interval)) ? (this.triggered = !0, this.time = this.time % this.last_interval, this.trigger("on_tick", this.properties.event), this.inputs && this.inputs.length > 1 && this.inputs[1] && this.setOutputData(1, !0)) : this.inputs && this.inputs.length > 1 && this.inputs[1] && this.setOutputData(1, !1);
      }, h.prototype.onGetInputs = function () {
        return [["interval", "number"]];
      }, h.prototype.onGetOutputs = function () {
        return [["tick", "boolean"]];
      }, d.registerNodeType("events/timer", h), p.title = "Semaphore Event", p.desc = "Until both events are not triggered, it doesnt continue.", p.prototype.onExecute = function () {
        this.setOutputData(1, this._ready), this.boxcolor = this._ready ? "#9F9" : "#FA5";
      }, p.prototype.onAction = function (t, e) {
        "go" == t ? this.triggerSlot(this._ready ? 0 : 1) : "green" == t ? this._ready = !0 : "red" == t && (this._ready = !1);
      }, d.registerNodeType("events/semaphore", p), l.title = "Data Store", l.desc = "Stores data and only changes when event is received", l.prototype.onExecute = function () {
        this._last_value = this.getInputData(0), this.setOutputData(0, this.properties.data);
      }, l.prototype.onAction = function (t, e, i) {
        this.properties.data = this._last_value;
      }, l.prototype.onSerialize = function (t) {
        null != t.data && (0 == this.properties.serialize || t.data.constructor !== String && t.data.constructor !== Number && t.data.constructor !== Boolean && t.data.constructor !== Array && t.data.constructor !== Object) && (t.data = null);
      }, d.registerNodeType("basic/data_store", l);
    }(this), function (t) {
      function e() {
        this.addOutput("", l.EVENT), this.addOutput("", "boolean"), this.addProperty("text", "click me"), this.addProperty("font_size", 30), this.addProperty("message", ""), this.size = [164, 84], this.clicked = !1;
      }

      function i() {
        this.addInput("", "boolean"), this.addInput("e", l.ACTION), this.addOutput("v", "boolean"), this.addOutput("e", l.EVENT), this.properties = {
          font: "",
          value: !1
        }, this.size = [160, 44];
      }

      function s() {
        this.addOutput("", "number"), this.size = [80, 60], this.properties = {
          min: -1e3,
          max: 1e3,
          value: 1,
          step: 1
        }, this.old_y = -1, this._remainder = 0, this._precision = 0, this.mouse_captured = !1;
      }

      function o() {
        this.addOutput("", "string"), this.addOutput("change", l.EVENT), this.size = [80, 60], this.properties = {
          value: "A",
          values: "A;B;C"
        }, this.old_y = -1, this.mouse_captured = !1, this._values = this.properties.values.split(";");
        var t = this;
        this.widgets_up = !0, this.widget = this.addWidget("combo", "", this.properties.value, function (e) {
          t.properties.value = e, t.triggerSlot(1, e);
        }, {
          property: "value",
          values: this._values
        });
      }

      function n() {
        this.addOutput("", "number"), this.size = [64, 84], this.properties = {
          min: 0,
          max: 1,
          value: .5,
          color: "#7AF",
          precision: 2
        }, this.value = -1;
      }

      function r() {
        this.addOutput("", "number"), this.properties = {
          value: .5,
          min: 0,
          max: 1,
          text: "V"
        };
        var t = this;
        this.size = [140, 40], this.slider = this.addWidget("slider", "V", this.properties.value, function (e) {
          t.properties.value = e;
        }, this.properties), this.widgets_up = !0;
      }

      function a() {
        this.size = [160, 26], this.addOutput("", "number"), this.properties = {
          color: "#7AF",
          min: 0,
          max: 1,
          value: .5
        }, this.value = -1;
      }

      function u() {
        this.size = [160, 26], this.addInput("", "number"), this.properties = {
          min: 0,
          max: 1,
          value: 0,
          color: "#AAF"
        };
      }

      function h() {
        this.addInputs("", 0), this.properties = {
          value: "...",
          font: "Arial",
          fontsize: 18,
          color: "#AAA",
          align: "left",
          glowSize: 0,
          decimals: 1
        };
      }

      function p() {
        this.size = [200, 100], this.properties = {
          borderColor: "#ffffff",
          bgcolorTop: "#f0f0f0",
          bgcolorBottom: "#e0e0e0",
          shadowSize: 2,
          borderRadius: 3
        };
      }

      var l = t.LiteGraph;
      e.title = "Button", e.desc = "Triggers an event", e.font = "Arial", e.prototype.onDrawForeground = function (t) {
        if (!this.flags.collapsed) {
          var i = 10;

          if (t.fillStyle = "black", t.fillRect(i + 1, i + 1, this.size[0] - 2 * i, this.size[1] - 2 * i), t.fillStyle = "#AAF", t.fillRect(i - 1, i - 1, this.size[0] - 2 * i, this.size[1] - 2 * i), t.fillStyle = this.clicked ? "white" : this.mouseOver ? "#668" : "#334", t.fillRect(i, i, this.size[0] - 2 * i, this.size[1] - 2 * i), this.properties.text || 0 === this.properties.text) {
            var s = this.properties.font_size || 30;
            t.textAlign = "center", t.fillStyle = this.clicked ? "black" : "white", t.font = s + "px " + e.font, t.fillText(this.properties.text, .5 * this.size[0], .5 * this.size[1] + .3 * s), t.textAlign = "left";
          }
        }
      }, e.prototype.onMouseDown = function (t, e) {
        if (e[0] > 1 && e[1] > 1 && e[0] < this.size[0] - 2 && e[1] < this.size[1] - 2) return this.clicked = !0, this.setOutputData(1, this.clicked), this.triggerSlot(0, this.properties.message), !0;
      }, e.prototype.onExecute = function () {
        this.setOutputData(1, this.clicked);
      }, e.prototype.onMouseUp = function (t) {
        this.clicked = !1;
      }, l.registerNodeType("widget/button", e), i.title = "Toggle", i.desc = "Toggles between true or false", i.prototype.onDrawForeground = function (t) {
        if (!this.flags.collapsed) {
          var e = .5 * this.size[1],
              i = .25,
              s = .8 * this.size[1];
          t.font = this.properties.font || (.8 * e).toFixed(0) + "px Arial";
          var o = t.measureText(this.title).width,
              n = .5 * (this.size[0] - (o + e));
          t.fillStyle = "#AAA", t.fillRect(n, s - e, e, e), t.fillStyle = this.properties.value ? "#AEF" : "#000", t.fillRect(n + e * i, s - e + e * i, e * (1 - 2 * i), e * (1 - 2 * i)), t.textAlign = "left", t.fillStyle = "#AAA", t.fillText(this.title, 1.2 * e + n, .85 * s), t.textAlign = "left";
        }
      }, i.prototype.onAction = function (t) {
        this.properties.value = !this.properties.value, this.trigger("e", this.properties.value);
      }, i.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && (this.properties.value = t), this.setOutputData(0, this.properties.value);
      }, i.prototype.onMouseDown = function (t, e) {
        if (e[0] > 1 && e[1] > 1 && e[0] < this.size[0] - 2 && e[1] < this.size[1] - 2) return this.properties.value = !this.properties.value, this.graph._version++, this.trigger("e", this.properties.value), !0;
      }, l.registerNodeType("widget/toggle", i), s.title = "Number", s.desc = "Widget to select number value", s.pixels_threshold = 10, s.markers_color = "#666", s.prototype.onDrawForeground = function (t) {
        var e = .5 * this.size[0],
            i = this.size[1];
        i > 30 ? (t.fillStyle = s.markers_color, t.beginPath(), t.moveTo(e, .1 * i), t.lineTo(e + .1 * i, .2 * i), t.lineTo(e + -.1 * i, .2 * i), t.fill(), t.beginPath(), t.moveTo(e, .9 * i), t.lineTo(e + .1 * i, .8 * i), t.lineTo(e + -.1 * i, .8 * i), t.fill(), t.font = (.7 * i).toFixed(1) + "px Arial") : t.font = (.8 * i).toFixed(1) + "px Arial", t.textAlign = "center", t.font = (.7 * i).toFixed(1) + "px Arial", t.fillStyle = "#EEE", t.fillText(this.properties.value.toFixed(this._precision), e, .75 * i);
      }, s.prototype.onExecute = function () {
        this.setOutputData(0, this.properties.value);
      }, s.prototype.onPropertyChanged = function (t, e) {
        var i = (this.properties.step + "").split(".");
        this._precision = i.length > 1 ? i[1].length : 0;
      }, s.prototype.onMouseDown = function (t, e) {
        if (!(e[1] < 0)) return this.old_y = t.canvasY, this.captureInput(!0), this.mouse_captured = !0, !0;
      }, s.prototype.onMouseMove = function (t) {
        if (this.mouse_captured) {
          var e = this.old_y - t.canvasY;
          t.shiftKey && (e *= 10), (t.metaKey || t.altKey) && (e *= .1), this.old_y = t.canvasY;
          var i = this._remainder + e / s.pixels_threshold;
          this._remainder = i % 1, i |= 0;
          var o = Math.clamp(this.properties.value + i * this.properties.step, this.properties.min, this.properties.max);
          this.properties.value = o, this.graph._version++, this.setDirtyCanvas(!0);
        }
      }, s.prototype.onMouseUp = function (t, e) {
        if (t.click_time < 200) {
          var i = e[1] > .5 * this.size[1] ? -1 : 1;
          this.properties.value = Math.clamp(this.properties.value + i * this.properties.step, this.properties.min, this.properties.max), this.graph._version++, this.setDirtyCanvas(!0);
        }

        this.mouse_captured && (this.mouse_captured = !1, this.captureInput(!1));
      }, l.registerNodeType("widget/number", s), o.title = "Combo", o.desc = "Widget to select from a list", o.prototype.onExecute = function () {
        this.setOutputData(0, this.properties.value);
      }, o.prototype.onPropertyChanged = function (t, e) {
        "values" == t ? (this._values = e.split(";"), this.widget.options.values = this._values) : "value" == t && (this.widget.value = e);
      }, l.registerNodeType("widget/combo", o), n.title = "Knob", n.desc = "Circular controller", n.size = [80, 100], n.prototype.onDrawForeground = function (t) {
        if (!this.flags.collapsed) {
          -1 == this.value && (this.value = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min));
          var e = .5 * this.size[0],
              i = .5 * this.size[1],
              s = .5 * Math.min(this.size[0], this.size[1]) - 5;
          Math.floor(.05 * s);
          t.globalAlpha = 1, t.save(), t.translate(e, i), t.rotate(.75 * Math.PI), t.fillStyle = "rgba(0,0,0,0.5)", t.beginPath(), t.moveTo(0, 0), t.arc(0, 0, s, 0, 1.5 * Math.PI), t.fill(), t.strokeStyle = "black", t.fillStyle = this.properties.color, t.lineWidth = 2, t.beginPath(), t.moveTo(0, 0), t.arc(0, 0, s - 4, 0, 1.5 * Math.PI * Math.max(.01, this.value)), t.closePath(), t.fill(), t.lineWidth = 1, t.globalAlpha = 1, t.restore(), t.fillStyle = "black", t.beginPath(), t.arc(e, i, .75 * s, 0, 2 * Math.PI, !0), t.fill(), t.fillStyle = this.mouseOver ? "white" : this.properties.color, t.beginPath();
          var o = this.value * Math.PI * 1.5 + .75 * Math.PI;
          t.arc(e + Math.cos(o) * s * .65, i + Math.sin(o) * s * .65, .05 * s, 0, 2 * Math.PI, !0), t.fill(), t.fillStyle = this.mouseOver ? "white" : "#AAA", t.font = Math.floor(.5 * s) + "px Arial", t.textAlign = "center", t.fillText(this.properties.value.toFixed(this.properties.precision), e, i + .15 * s);
        }
      }, n.prototype.onExecute = function () {
        this.setOutputData(0, this.properties.value), this.boxcolor = l.colorToString([this.value, this.value, this.value]);
      }, n.prototype.onMouseDown = function (t) {
        return this.center = [.5 * this.size[0], .5 * this.size[1] + 20], this.radius = .5 * this.size[0], !(t.canvasY - this.pos[1] < 20 || l.distance([t.canvasX, t.canvasY], [this.pos[0] + this.center[0], this.pos[1] + this.center[1]]) > this.radius) && (this.oldmouse = [t.canvasX - this.pos[0], t.canvasY - this.pos[1]], this.captureInput(!0), !0);
      }, n.prototype.onMouseMove = function (t) {
        if (this.oldmouse) {
          var e = [t.canvasX - this.pos[0], t.canvasY - this.pos[1]],
              i = this.value;
          i -= .01 * (e[1] - this.oldmouse[1]), i > 1 ? i = 1 : i < 0 && (i = 0), this.value = i, this.properties.value = this.properties.min + (this.properties.max - this.properties.min) * this.value, this.oldmouse = e, this.setDirtyCanvas(!0);
        }
      }, n.prototype.onMouseUp = function (t) {
        this.oldmouse && (this.oldmouse = null, this.captureInput(!1));
      }, n.prototype.onPropertyChanged = function (t, e) {
        if ("min" == t || "max" == t || "value" == t) return this.properties[t] = parseFloat(e), !0;
      }, l.registerNodeType("widget/knob", n), r.title = "Inner Slider", r.prototype.onPropertyChanged = function (t, e) {
        "value" == t && (this.slider.value = e);
      }, r.prototype.onExecute = function () {
        this.setOutputData(0, this.properties.value);
      }, l.registerNodeType("widget/internal_slider", r), a.title = "H.Slider", a.desc = "Linear slider controller", a.prototype.onDrawForeground = function (t) {
        -1 == this.value && (this.value = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min)), t.globalAlpha = 1, t.lineWidth = 1, t.fillStyle = "#000", t.fillRect(2, 2, this.size[0] - 4, this.size[1] - 4), t.fillStyle = this.properties.color, t.beginPath(), t.rect(4, 4, (this.size[0] - 8) * this.value, this.size[1] - 8), t.fill();
      }, a.prototype.onExecute = function () {
        this.properties.value = this.properties.min + (this.properties.max - this.properties.min) * this.value, this.setOutputData(0, this.properties.value), this.boxcolor = l.colorToString([this.value, this.value, this.value]);
      }, a.prototype.onMouseDown = function (t) {
        return !(t.canvasY - this.pos[1] < 0) && (this.oldmouse = [t.canvasX - this.pos[0], t.canvasY - this.pos[1]], this.captureInput(!0), !0);
      }, a.prototype.onMouseMove = function (t) {
        if (this.oldmouse) {
          var e = [t.canvasX - this.pos[0], t.canvasY - this.pos[1]],
              i = this.value,
              s = e[0] - this.oldmouse[0];
          i += s / this.size[0], i > 1 ? i = 1 : i < 0 && (i = 0), this.value = i, this.oldmouse = e, this.setDirtyCanvas(!0);
        }
      }, a.prototype.onMouseUp = function (t) {
        this.oldmouse = null, this.captureInput(!1);
      }, a.prototype.onMouseLeave = function (t) {}, l.registerNodeType("widget/hslider", a), u.title = "Progress", u.desc = "Shows data in linear progress", u.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && (this.properties.value = t);
      }, u.prototype.onDrawForeground = function (t) {
        t.lineWidth = 1, t.fillStyle = this.properties.color;
        var e = (this.properties.value - this.properties.min) / (this.properties.max - this.properties.min);
        e = Math.min(1, e), e = Math.max(0, e), t.fillRect(2, 2, (this.size[0] - 4) * e, this.size[1] - 4);
      }, l.registerNodeType("widget/progress", u), h.title = "Text", h.desc = "Shows the input value", h.widgets = [{
        name: "resize",
        text: "Resize box",
        type: "button"
      }, {
        name: "led_text",
        text: "LED",
        type: "minibutton"
      }, {
        name: "normal_text",
        text: "Normal",
        type: "minibutton"
      }], h.prototype.onDrawForeground = function (t) {
        t.fillStyle = this.properties.color;
        var e = this.properties.value;
        this.properties.glowSize ? (t.shadowColor = this.properties.color, t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = this.properties.glowSize) : t.shadowColor = "transparent";
        var i = this.properties.fontsize;
        if (t.textAlign = this.properties.align, t.font = i.toString() + "px " + this.properties.font, this.str = "number" == typeof e ? e.toFixed(this.properties.decimals) : e, "string" == typeof this.str) for (var s = this.str.replace(/[\r\n]/g, "\\n").split("\\n"), o = 0; o < s.length; o++) t.fillText(s[o], "left" == this.properties.align ? 15 : this.size[0] - 15, -.15 * i + i * (parseInt(o) + 1));
        t.shadowColor = "transparent", this.last_ctx = t, t.textAlign = "left";
      }, h.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && (this.properties.value = t);
      }, h.prototype.resize = function () {
        if (this.last_ctx) {
          var t = this.str.split("\\n");
          this.last_ctx.font = this.properties.fontsize + "px " + this.properties.font;

          for (var e = 0, i = 0; i < t.length; i++) {
            var s = this.last_ctx.measureText(t[i]).width;
            e < s && (e = s);
          }

          this.size[0] = e + 20, this.size[1] = 4 + t.length * this.properties.fontsize, this.setDirtyCanvas(!0);
        }
      }, h.prototype.onPropertyChanged = function (t, e) {
        return this.properties[t] = e, this.str = "number" == typeof e ? e.toFixed(3) : e, !0;
      }, l.registerNodeType("widget/text", h), p.title = "Panel", p.desc = "Non interactive panel", p.widgets = [{
        name: "update",
        text: "Update",
        type: "button"
      }], p.prototype.createGradient = function (t) {
        "" != this.properties.bgcolorTop && "" != this.properties.bgcolorBottom ? (this.lineargradient = t.createLinearGradient(0, 0, 0, this.size[1]), this.lineargradient.addColorStop(0, this.properties.bgcolorTop), this.lineargradient.addColorStop(1, this.properties.bgcolorBottom)) : this.lineargradient = 0;
      }, p.prototype.onDrawForeground = function (t) {
        this.flags.collapsed || (null == this.lineargradient && this.createGradient(t), this.lineargradient && (t.lineWidth = 1, t.strokeStyle = this.properties.borderColor, t.fillStyle = this.lineargradient, this.properties.shadowSize ? (t.shadowColor = "#000", t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = this.properties.shadowSize) : t.shadowColor = "transparent", t.roundRect(0, 0, this.size[0] - 1, this.size[1] - 1, this.properties.shadowSize), t.fill(), t.shadowColor = "transparent", t.stroke()));
      }, l.registerNodeType("widget/panel", p);
    }(this), function (t) {
      function e() {
        this.addOutput("left_x_axis", "number"), this.addOutput("left_y_axis", "number"), this.addOutput("button_pressed", i.EVENT), this.properties = {
          gamepad_index: 0,
          threshold: .1
        }, this._left_axis = new Float32Array(2), this._right_axis = new Float32Array(2), this._triggers = new Float32Array(2), this._previous_buttons = new Uint8Array(17), this._current_buttons = new Uint8Array(17);
      }

      var i = t.LiteGraph;
      e.title = "Gamepad", e.desc = "gets the input of the gamepad", e.CENTER = 0, e.LEFT = 1, e.RIGHT = 2, e.UP = 4, e.DOWN = 8, e.zero = new Float32Array(2), e.buttons = ["a", "b", "x", "y", "lb", "rb", "lt", "rt", "back", "start", "ls", "rs", "home"], e.prototype.onExecute = function () {
        var t = this.getGamepad(),
            i = this.properties.threshold || 0;
        if (t && (this._left_axis[0] = Math.abs(t.xbox.axes.lx) > i ? t.xbox.axes.lx : 0, this._left_axis[1] = Math.abs(t.xbox.axes.ly) > i ? t.xbox.axes.ly : 0, this._right_axis[0] = Math.abs(t.xbox.axes.rx) > i ? t.xbox.axes.rx : 0, this._right_axis[1] = Math.abs(t.xbox.axes.ry) > i ? t.xbox.axes.ry : 0, this._triggers[0] = Math.abs(t.xbox.axes.ltrigger) > i ? t.xbox.axes.ltrigger : 0, this._triggers[1] = Math.abs(t.xbox.axes.rtrigger) > i ? t.xbox.axes.rtrigger : 0), this.outputs) for (var s = 0; s < this.outputs.length; s++) {
          var o = this.outputs[s];

          if (o.links && o.links.length) {
            var n = null;
            if (t) switch (o.name) {
              case "left_axis":
                n = this._left_axis;
                break;

              case "right_axis":
                n = this._right_axis;
                break;

              case "left_x_axis":
                n = this._left_axis[0];
                break;

              case "left_y_axis":
                n = this._left_axis[1];
                break;

              case "right_x_axis":
                n = this._right_axis[0];
                break;

              case "right_y_axis":
                n = this._right_axis[1];
                break;

              case "trigger_left":
                n = this._triggers[0];
                break;

              case "trigger_right":
                n = this._triggers[1];
                break;

              case "a_button":
                n = t.xbox.buttons.a ? 1 : 0;
                break;

              case "b_button":
                n = t.xbox.buttons.b ? 1 : 0;
                break;

              case "x_button":
                n = t.xbox.buttons.x ? 1 : 0;
                break;

              case "y_button":
                n = t.xbox.buttons.y ? 1 : 0;
                break;

              case "lb_button":
                n = t.xbox.buttons.lb ? 1 : 0;
                break;

              case "rb_button":
                n = t.xbox.buttons.rb ? 1 : 0;
                break;

              case "ls_button":
                n = t.xbox.buttons.ls ? 1 : 0;
                break;

              case "rs_button":
                n = t.xbox.buttons.rs ? 1 : 0;
                break;

              case "hat_left":
                n = t.xbox.hatmap & e.LEFT;
                break;

              case "hat_right":
                n = t.xbox.hatmap & e.RIGHT;
                break;

              case "hat_up":
                n = t.xbox.hatmap & e.UP;
                break;

              case "hat_down":
                n = t.xbox.hatmap & e.DOWN;
                break;

              case "hat":
                n = t.xbox.hatmap;
                break;

              case "start_button":
                n = t.xbox.buttons.start ? 1 : 0;
                break;

              case "back_button":
                n = t.xbox.buttons.back ? 1 : 0;
                break;

              case "button_pressed":
                for (var r = 0; r < this._current_buttons.length; ++r) this._current_buttons[r] && !this._previous_buttons[r] && this.triggerSlot(s, e.buttons[r]);

            } else switch (o.name) {
              case "button_pressed":
                break;

              case "left_axis":
              case "right_axis":
                n = e.zero;
                break;

              default:
                n = 0;
            }
            this.setOutputData(s, n);
          }
        }
      }, e.mapping = {
        a: 0,
        b: 1,
        x: 2,
        y: 3,
        lb: 4,
        rb: 5,
        lt: 6,
        rt: 7,
        back: 8,
        start: 9,
        ls: 10,
        rs: 11
      }, e.mapping_array = ["a", "b", "x", "y", "lb", "rb", "lt", "rt", "back", "start", "ls", "rs"], e.prototype.getGamepad = function () {
        var t = navigator.getGamepads || navigator.webkitGetGamepads || navigator.mozGetGamepads;
        if (!t) return null;
        var i = t.call(navigator),
            s = null;

        this._previous_buttons.set(this._current_buttons);

        for (var o = this.properties.gamepad_index; o < 4; o++) if (i[o]) {
          s = i[o];
          var n = this.xbox_mapping;
          n || (n = this.xbox_mapping = {
            axes: [],
            buttons: {},
            hat: "",
            hatmap: e.CENTER
          }), n.axes.lx = s.axes[0], n.axes.ly = s.axes[1], n.axes.rx = s.axes[2], n.axes.ry = s.axes[3], n.axes.ltrigger = s.buttons[6].value, n.axes.rtrigger = s.buttons[7].value, n.hat = "", n.hatmap = e.CENTER;

          for (var r = 0; r < s.buttons.length; r++) if (this._current_buttons[r] = s.buttons[r].pressed, r < 12) n.buttons[e.mapping_array[r]] = s.buttons[r].pressed, s.buttons[r].was_pressed && this.trigger(e.mapping_array[r] + "_button_event");else switch (r) {
            case 12:
              s.buttons[r].pressed && (n.hat += "up", n.hatmap |= e.UP);
              break;

            case 13:
              s.buttons[r].pressed && (n.hat += "down", n.hatmap |= e.DOWN);
              break;

            case 14:
              s.buttons[r].pressed && (n.hat += "left", n.hatmap |= e.LEFT);
              break;

            case 15:
              s.buttons[r].pressed && (n.hat += "right", n.hatmap |= e.RIGHT);
              break;

            case 16:
              n.buttons.home = s.buttons[r].pressed;
          }

          return s.xbox = n, s;
        }
      }, e.prototype.onDrawBackground = function (t) {
        if (!this.flags.collapsed) {
          var e = this._left_axis,
              i = this._right_axis;
          t.strokeStyle = "#88A", t.strokeRect(.5 * (e[0] + 1) * this.size[0] - 4, .5 * (e[1] + 1) * this.size[1] - 4, 8, 8), t.strokeStyle = "#8A8", t.strokeRect(.5 * (i[0] + 1) * this.size[0] - 4, .5 * (i[1] + 1) * this.size[1] - 4, 8, 8);
          var s = this.size[1] / this._current_buttons.length;
          t.fillStyle = "#AEB";

          for (var o = 0; o < this._current_buttons.length; ++o) this._current_buttons[o] && t.fillRect(0, s * o, 6, s);
        }
      }, e.prototype.onGetOutputs = function () {
        return [["left_axis", "vec2"], ["right_axis", "vec2"], ["left_x_axis", "number"], ["left_y_axis", "number"], ["right_x_axis", "number"], ["right_y_axis", "number"], ["trigger_left", "number"], ["trigger_right", "number"], ["a_button", "number"], ["b_button", "number"], ["x_button", "number"], ["y_button", "number"], ["lb_button", "number"], ["rb_button", "number"], ["ls_button", "number"], ["rs_button", "number"], ["start_button", "number"], ["back_button", "number"], ["a_button_event", i.EVENT], ["b_button_event", i.EVENT], ["x_button_event", i.EVENT], ["y_button_event", i.EVENT], ["lb_button_event", i.EVENT], ["rb_button_event", i.EVENT], ["ls_button_event", i.EVENT], ["rs_button_event", i.EVENT], ["start_button_event", i.EVENT], ["back_button_event", i.EVENT], ["hat_left", "number"], ["hat_right", "number"], ["hat_up", "number"], ["hat_down", "number"], ["hat", "number"], ["button_pressed", i.EVENT]];
      }, i.registerNodeType("input/gamepad", e);
    }(this), function (t) {
      function e() {
        this.addInput("in", 0), this.addOutput("out", 0), this.size = [80, 30];
      }

      function i() {
        this.addInput("in"), this.addOutput("out"), this.size = [80, 30];
      }

      function s() {
        this.addInput("in"), this.addOutput("out");
      }

      function o() {
        this.addInput("in", "number", {
          locked: !0
        }), this.addOutput("out", "number", {
          locked: !0
        }), this.addOutput("clamped", "number", {
          locked: !0
        }), this.addProperty("in", 0), this.addProperty("in_min", 0), this.addProperty("in_max", 1), this.addProperty("out_min", 0), this.addProperty("out_max", 1), this.size = [120, 50];
      }

      function n() {
        this.addOutput("value", "number"), this.addProperty("min", 0), this.addProperty("max", 1), this.size = [80, 30];
      }

      function r() {
        this.addInput("in", "number"), this.addOutput("out", "number"), this.addProperty("min", 0), this.addProperty("max", 1), this.addProperty("smooth", !0), this.addProperty("seed", 0), this.addProperty("octaves", 1), this.addProperty("persistence", .8), this.addProperty("speed", 1), this.size = [90, 30];
      }

      function a() {
        this.addOutput("out", "number"), this.addProperty("min_time", 1), this.addProperty("max_time", 2), this.addProperty("duration", .2), this.size = [90, 30], this._remaining_time = 0, this._blink_time = 0;
      }

      function u() {
        this.addInput("in", "number"), this.addOutput("out", "number"), this.size = [80, 30], this.addProperty("min", 0), this.addProperty("max", 1);
      }

      function h() {
        this.properties = {
          f: .5
        }, this.addInput("A", "number"), this.addInput("B", "number"), this.addOutput("out", "number");
      }

      function p() {
        this.addInput("in", "number"), this.addOutput("out", "number"), this.size = [80, 30];
      }

      function l() {
        this.addInput("in", "number"), this.addOutput("out", "number"), this.size = [80, 30];
      }

      function d() {
        this.addInput("in", "number"), this.addOutput("out", "number"), this.size = [80, 30];
      }

      function c() {
        this.addInput("in", "number"), this.addOutput("out", "number"), this.size = [80, 30], this.properties = {
          A: 0,
          B: 1
        };
      }

      function _() {
        this.addInput("in", "number", {
          label: ""
        }), this.addOutput("out", "number", {
          label: ""
        }), this.size = [80, 30], this.addProperty("factor", 1);
      }

      function g() {
        this.addInput("v", "boolean"), this.addInput("A"), this.addInput("B"), this.addOutput("out");
      }

      function f() {
        this.addInput("in", "number"), this.addOutput("out", "number"), this.size = [80, 30], this.addProperty("samples", 10), this._values = new Float32Array(10), this._current = 0;
      }

      function v() {
        this.addInput("in", "number"), this.addOutput("out", "number"), this.addProperty("factor", .1), this.size = [80, 30], this._value = null;
      }

      function m() {
        this.addInput("A", "number,array,object"), this.addInput("B", "number"), this.addOutput("=", "number"), this.addProperty("A", 1), this.addProperty("B", 1), this.addProperty("OP", "+", "enum", {
          values: m.values
        }), this._func = function (t, e) {
          return t + e;
        }, this._result = [];
      }

      function y() {
        this.addInput("A", "number"), this.addInput("B", "number"), this.addOutput("A==B", "boolean"), this.addOutput("A!=B", "boolean"), this.addProperty("A", 0), this.addProperty("B", 0);
      }

      function x() {
        this.addInput("A", "number"), this.addInput("B", "number"), this.addOutput("true", "boolean"), this.addOutput("false", "boolean"), this.addProperty("A", 1), this.addProperty("B", 1), this.addProperty("OP", ">", "enum", {
          values: x.values
        }), this.addWidget("combo", "Cond.", this.properties.OP, {
          property: "OP",
          values: x.values
        }), this.size = [80, 60];
      }

      function b() {
        this.addInput("in", 0), this.addInput("cond", "boolean"), this.addOutput("true", 0), this.addOutput("false", 0), this.size = [80, 60];
      }

      function T() {
        this.addInput("inc", "number"), this.addOutput("total", "number"), this.addProperty("increment", 1), this.addProperty("value", 0);
      }

      function E() {
        this.addInput("v", "number"), this.addOutput("sin", "number"), this.addProperty("amplitude", 1), this.addProperty("offset", 0), this.bgImageUrl = "nodes/imgs/icon-sin.png";
      }

      function w() {
        this.addInput("x", "number"), this.addInput("y", "number"), this.addOutput("", "number"), this.properties = {
          x: 1,
          y: 1,
          formula: "x+y"
        }, this.code_widget = this.addWidget("text", "F(x,y)", this.properties.formula, function (t, e, i) {
          i.properties.formula = t;
        }), this.addWidget("toggle", "allow", A.allow_scripts, function (t) {
          A.allow_scripts = t;
        }), this._func = null;
      }

      function O() {
        this.addInput("vec2", "vec2"), this.addOutput("x", "number"), this.addOutput("y", "number");
      }

      function I() {
        this.addInputs([["x", "number"], ["y", "number"]]), this.addOutput("vec2", "vec2"), this.properties = {
          x: 0,
          y: 0
        }, this._data = new Float32Array(2);
      }

      function D() {
        this.addInput("vec3", "vec3"), this.addOutput("x", "number"), this.addOutput("y", "number"), this.addOutput("z", "number");
      }

      function N() {
        this.addInputs([["x", "number"], ["y", "number"], ["z", "number"]]), this.addOutput("vec3", "vec3"), this.properties = {
          x: 0,
          y: 0,
          z: 0
        }, this._data = new Float32Array(3);
      }

      function S() {
        this.addInput("vec4", "vec4"), this.addOutput("x", "number"), this.addOutput("y", "number"), this.addOutput("z", "number"), this.addOutput("w", "number");
      }

      function C() {
        this.addInputs([["x", "number"], ["y", "number"], ["z", "number"], ["w", "number"]]), this.addOutput("vec4", "vec4"), this.properties = {
          x: 0,
          y: 0,
          z: 0,
          w: 0
        }, this._data = new Float32Array(4);
      }

      var A = t.LiteGraph;
      e.title = "Converter", e.desc = "type A to type B", e.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (null != t && this.outputs) for (var e = 0; e < this.outputs.length; e++) {
          var i = this.outputs[e];

          if (i.links && i.links.length) {
            var s = null;

            switch (i.name) {
              case "number":
                s = t.length ? t[0] : parseFloat(t);
                break;

              case "vec2":
              case "vec3":
              case "vec4":
                s = null;
                var o = 1;

                switch (i.name) {
                  case "vec2":
                    o = 2;
                    break;

                  case "vec3":
                    o = 3;
                    break;

                  case "vec4":
                    o = 4;
                }

                s = new Float32Array(o);
                if (t.length) for (var n = 0; n < t.length && n < s.length; n++) s[n] = t[n];else s[0] = parseFloat(t);
            }

            this.setOutputData(e, s);
          }
        }
      }, e.prototype.onGetOutputs = function () {
        return [["number", "number"], ["vec2", "vec2"], ["vec3", "vec3"], ["vec4", "vec4"]];
      }, A.registerNodeType("math/converter", e), i.title = "Bypass", i.desc = "removes the type", i.prototype.onExecute = function () {
        var t = this.getInputData(0);
        this.setOutputData(0, t);
      }, A.registerNodeType("math/bypass", i), s.title = "to Number", s.desc = "Cast to number", s.prototype.onExecute = function () {
        var t = this.getInputData(0);
        this.setOutputData(0, Number(t));
      }, A.registerNodeType("math/to_number", s), o.title = "Range", o.desc = "Convert a number from one range to another", o.prototype.getTitle = function () {
        return this.flags.collapsed ? (this._last_v || 0).toFixed(2) : this.title;
      }, o.prototype.onExecute = function () {
        if (this.inputs) for (var t = 0; t < this.inputs.length; t++) {
          var e = this.inputs[t],
              i = this.getInputData(t);
          void 0 !== i && (this.properties[e.name] = i);
        }
        i = this.properties.in;
        null != i && i.constructor === Number || (i = 0);
        var s = this.properties.in_min,
            o = this.properties.in_max,
            n = this.properties.out_min,
            r = this.properties.out_max;
        this._last_v = (i - s) / (o - s) * (r - n) + n, this.setOutputData(0, this._last_v), this.setOutputData(1, Math.clamp(this._last_v, n, r));
      }, o.prototype.onDrawBackground = function (t) {
        this._last_v ? this.outputs[0].label = this._last_v.toFixed(3) : this.outputs[0].label = "?";
      }, o.prototype.onGetInputs = function () {
        return [["in_min", "number"], ["in_max", "number"], ["out_min", "number"], ["out_max", "number"]];
      }, A.registerNodeType("math/range", o), n.title = "Rand", n.desc = "Random number", n.prototype.onExecute = function () {
        if (this.inputs) for (var t = 0; t < this.inputs.length; t++) {
          var e = this.inputs[t],
              i = this.getInputData(t);
          void 0 !== i && (this.properties[e.name] = i);
        }
        var s = this.properties.min,
            o = this.properties.max;
        this._last_v = Math.random() * (o - s) + s, this.setOutputData(0, this._last_v);
      }, n.prototype.onDrawBackground = function (t) {
        this.outputs[0].label = (this._last_v || 0).toFixed(3);
      }, n.prototype.onGetInputs = function () {
        return [["min", "number"], ["max", "number"]];
      }, A.registerNodeType("math/rand", n), r.title = "Noise", r.desc = "Random number with temporal continuity", r.data = null, r.getValue = function (t, e) {
        if (!r.data) {
          r.data = new Float32Array(1024);

          for (var i = 0; i < r.data.length; ++i) r.data[i] = Math.random();
        }

        t %= 1024, t < 0 && (t += 1024);
        var s = Math.floor(t),
            o = (t = t - s, r.data[s]),
            n = r.data[1023 == s ? 0 : s + 1];
        return e && (t = t * t * t * (t * (6 * t - 15) + 10)), o * (1 - t) + n * t;
      }, r.prototype.onExecute = function () {
        var t = this.getInputData(0) || 0,
            e = this.properties.octaves || 1,
            i = 0,
            s = 1,
            o = this.properties.seed || 0;
        t += o;

        for (var n = this.properties.speed || 1, a = 0, u = 0; u < e && (i += r.getValue(t * (1 + u) * n, this.properties.smooth) * s, a += s, s *= this.properties.persistence, !(s < .001)); ++u);

        i /= a;
        var h = this.properties.min,
            p = this.properties.max;
        this._last_v = i * (p - h) + h, this.setOutputData(0, this._last_v);
      }, r.prototype.onDrawBackground = function (t) {
        this.outputs[0].label = (this._last_v || 0).toFixed(3);
      }, A.registerNodeType("math/noise", r), a.title = "Spikes", a.desc = "spike every random time", a.prototype.onExecute = function () {
        var t = this.graph.elapsed_time;
        this._remaining_time -= t, this._blink_time -= t;
        var e = 0;

        if (this._blink_time > 0) {
          var i = this._blink_time / this.properties.duration;
          e = 1 / (Math.pow(8 * i - 4, 4) + 1);
        }

        this._remaining_time < 0 ? (this._remaining_time = Math.random() * (this.properties.max_time - this.properties.min_time) + this.properties.min_time, this._blink_time = this.properties.duration, this.boxcolor = "#FFF") : this.boxcolor = "#000", this.setOutputData(0, e);
      }, A.registerNodeType("math/spikes", a), u.title = "Clamp", u.desc = "Clamp number between min and max", u.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && (t = Math.max(this.properties.min, t), t = Math.min(this.properties.max, t), this.setOutputData(0, t));
      }, u.prototype.getCode = function (t) {
        var e = "";
        return this.isInputConnected(0) && (e += "clamp({{0}}," + this.properties.min + "," + this.properties.max + ")"), e;
      }, A.registerNodeType("math/clamp", u), h.title = "Lerp", h.desc = "Linear Interpolation", h.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null == t && (t = 0);
        var e = this.getInputData(1);
        null == e && (e = 0);
        var i = this.properties.f,
            s = this.getInputData(2);
        void 0 !== s && (i = s), this.setOutputData(0, t * (1 - i) + e * i);
      }, h.prototype.onGetInputs = function () {
        return [["f", "number"]];
      }, A.registerNodeType("math/lerp", h), p.title = "Abs", p.desc = "Absolute", p.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && this.setOutputData(0, Math.abs(t));
      }, A.registerNodeType("math/abs", p), l.title = "Floor", l.desc = "Floor number to remove fractional part", l.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && this.setOutputData(0, Math.floor(t));
      }, A.registerNodeType("math/floor", l), d.title = "Frac", d.desc = "Returns fractional part", d.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && this.setOutputData(0, t % 1);
      }, A.registerNodeType("math/frac", d), c.title = "Smoothstep", c.desc = "Smoothstep", c.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (void 0 !== t) {
          var e = this.properties.A,
              i = this.properties.B;
          t = Math.clamp((t - e) / (i - e), 0, 1), t = t * t * (3 - 2 * t), this.setOutputData(0, t);
        }
      }, A.registerNodeType("math/smoothstep", c), _.title = "Scale", _.desc = "v * factor", _.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && this.setOutputData(0, t * this.properties.factor);
      }, A.registerNodeType("math/scale", _), g.title = "Gate", g.desc = "if v is true, then outputs A, otherwise B", g.prototype.onExecute = function () {
        var t = this.getInputData(0);
        this.setOutputData(0, this.getInputData(t ? 1 : 2));
      }, A.registerNodeType("math/gate", g), f.title = "Average", f.desc = "Average Filter", f.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null == t && (t = 0);
        var e = this._values.length;
        this._values[this._current % e] = t, this._current += 1, this._current > e && (this._current = 0);

        for (var i = 0, s = 0; s < e; ++s) i += this._values[s];

        this.setOutputData(0, i / e);
      }, f.prototype.onPropertyChanged = function (t, e) {
        e < 1 && (e = 1), this.properties.samples = Math.round(e);
        var i = this._values;
        this._values = new Float32Array(this.properties.samples), i.length <= this._values.length ? this._values.set(i) : this._values.set(i.subarray(0, this._values.length));
      }, A.registerNodeType("math/average", f), v.title = "TendTo", v.desc = "moves the output value always closer to the input", v.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null == t && (t = 0);
        var e = this.properties.factor;
        null == this._value ? this._value = t : this._value = this._value * (1 - e) + t * e, this.setOutputData(0, this._value);
      }, A.registerNodeType("math/tendTo", v), m.values = ["+", "-", "*", "/", "%", "^", "max", "min"], m.title = "Operation", m.desc = "Easy math operators", m["@OP"] = {
        type: "enum",
        title: "operation",
        values: m.values
      }, m.size = [100, 60], m.prototype.getTitle = function () {
        return "max" == this.properties.OP || "min" == this.properties.OP ? this.properties.OP + "(A,B)" : "A " + this.properties.OP + " B";
      }, m.prototype.setValue = function (t) {
        "string" == typeof t && (t = parseFloat(t)), this.properties.value = t;
      }, m.prototype.onPropertyChanged = function (t, e) {
        if ("OP" == t) switch (this.properties.OP) {
          case "+":
            this._func = function (t, e) {
              return t + e;
            };

            break;

          case "-":
            this._func = function (t, e) {
              return t - e;
            };

            break;

          case "x":
          case "X":
          case "*":
            this._func = function (t, e) {
              return t * e;
            };

            break;

          case "/":
            this._func = function (t, e) {
              return t / e;
            };

            break;

          case "%":
            this._func = function (t, e) {
              return t % e;
            };

            break;

          case "^":
            this._func = function (t, e) {
              return Math.pow(t, e);
            };

            break;

          case "max":
            this._func = function (t, e) {
              return Math.max(t, e);
            };

            break;

          case "min":
            this._func = function (t, e) {
              return Math.min(t, e);
            };

            break;

          default:
            console.warn("Unknown operation: " + this.properties.OP), this._func = function (t) {
              return t;
            };
        }
      }, m.prototype.onExecute = function () {
        var t,
            e = this.getInputData(0),
            i = this.getInputData(1);
        if (null != e ? e.constructor === Number && (this.properties.A = e) : e = this.properties.A, null != i ? this.properties.B = i : i = this.properties.B, e.constructor === Number) t = 0, t = this._func(e, i);else if (e.constructor === Array) {
          t = this._result, t.length = e.length;

          for (var s = 0; s < e.length; ++s) t[s] = this._func(e[s], i);
        } else for (var s in t = {}, e) t[s] = this._func(e[s], i);
        this.setOutputData(0, t);
      }, m.prototype.onDrawBackground = function (t) {
        this.flags.collapsed || (t.font = "40px Arial", t.fillStyle = "#666", t.textAlign = "center", t.fillText(this.properties.OP, .5 * this.size[0], .5 * (this.size[1] + A.NODE_TITLE_HEIGHT)), t.textAlign = "left");
      }, A.registerNodeType("math/operation", m), A.registerSearchboxExtra("math/operation", "MAX", {
        properties: {
          OP: "max"
        },
        title: "MAX()"
      }), A.registerSearchboxExtra("math/operation", "MIN", {
        properties: {
          OP: "min"
        },
        title: "MIN()"
      }), y.title = "Compare", y.desc = "compares between two values", y.prototype.onExecute = function () {
        var t = this.getInputData(0),
            e = this.getInputData(1);
        void 0 !== t ? this.properties.A = t : t = this.properties.A, void 0 !== e ? this.properties.B = e : e = this.properties.B;

        for (var i = 0, s = this.outputs.length; i < s; ++i) {
          var o = this.outputs[i];

          if (o.links && o.links.length) {
            var n;

            switch (o.name) {
              case "A==B":
                n = t == e;
                break;

              case "A!=B":
                n = t != e;
                break;

              case "A>B":
                n = t > e;
                break;

              case "A<B":
                n = t < e;
                break;

              case "A<=B":
                n = t <= e;
                break;

              case "A>=B":
                n = t >= e;
            }

            this.setOutputData(i, n);
          }
        }
      }, y.prototype.onGetOutputs = function () {
        return [["A==B", "boolean"], ["A!=B", "boolean"], ["A>B", "boolean"], ["A<B", "boolean"], ["A>=B", "boolean"], ["A<=B", "boolean"]];
      }, A.registerNodeType("math/compare", y), A.registerSearchboxExtra("math/compare", "==", {
        outputs: [["A==B", "boolean"]],
        title: "A==B"
      }), A.registerSearchboxExtra("math/compare", "!=", {
        outputs: [["A!=B", "boolean"]],
        title: "A!=B"
      }), A.registerSearchboxExtra("math/compare", ">", {
        outputs: [["A>B", "boolean"]],
        title: "A>B"
      }), A.registerSearchboxExtra("math/compare", "<", {
        outputs: [["A<B", "boolean"]],
        title: "A<B"
      }), A.registerSearchboxExtra("math/compare", ">=", {
        outputs: [["A>=B", "boolean"]],
        title: "A>=B"
      }), A.registerSearchboxExtra("math/compare", "<=", {
        outputs: [["A<=B", "boolean"]],
        title: "A<=B"
      }), x.values = [">", "<", "==", "!=", "<=", ">=", "||", "&&"], x["@OP"] = {
        type: "enum",
        title: "operation",
        values: x.values
      }, x.title = "Condition", x.desc = "evaluates condition between A and B", x.prototype.getTitle = function () {
        return "A " + this.properties.OP + " B";
      }, x.prototype.onExecute = function () {
        var t = this.getInputData(0);
        void 0 === t ? t = this.properties.A : this.properties.A = t;
        var e = this.getInputData(1);
        void 0 === e ? e = this.properties.B : this.properties.B = e;
        var i = !0;

        switch (this.properties.OP) {
          case ">":
            i = t > e;
            break;

          case "<":
            i = t < e;
            break;

          case "==":
            i = t == e;
            break;

          case "!=":
            i = t != e;
            break;

          case "<=":
            i = t <= e;
            break;

          case ">=":
            i = t >= e;
            break;

          case "||":
            i = t || e;
            break;

          case "&&":
            i = t && e;
        }

        this.setOutputData(0, i), this.setOutputData(1, !i);
      }, A.registerNodeType("math/condition", x), b.title = "Branch", b.desc = "If condition is true, outputs IN in true, otherwise in false", b.prototype.onExecute = function () {
        var t = this.getInputData(0),
            e = this.getInputData(1);
        e ? (this.setOutputData(0, t), this.setOutputData(1, null)) : (this.setOutputData(0, null), this.setOutputData(1, t));
      }, A.registerNodeType("math/branch", b), T.title = "Accumulate", T.desc = "Increments a value every time", T.prototype.onExecute = function () {
        null === this.properties.value && (this.properties.value = 0);
        var t = this.getInputData(0);
        this.properties.value += null !== t ? t : this.properties.increment, this.setOutputData(0, this.properties.value);
      }, A.registerNodeType("math/accumulate", T), E.title = "Trigonometry", E.desc = "Sin Cos Tan", E.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null == t && (t = 0);
        var e = this.properties.amplitude,
            i = this.findInputSlot("amplitude");
        -1 != i && (e = this.getInputData(i));
        var s = this.properties.offset;
        i = this.findInputSlot("offset"), -1 != i && (s = this.getInputData(i));

        for (var o = 0, n = this.outputs.length; o < n; ++o) {
          var r,
              a = this.outputs[o];

          switch (a.name) {
            case "sin":
              r = Math.sin(t);
              break;

            case "cos":
              r = Math.cos(t);
              break;

            case "tan":
              r = Math.tan(t);
              break;

            case "asin":
              r = Math.asin(t);
              break;

            case "acos":
              r = Math.acos(t);
              break;

            case "atan":
              r = Math.atan(t);
          }

          this.setOutputData(o, e * r + s);
        }
      }, E.prototype.onGetInputs = function () {
        return [["v", "number"], ["amplitude", "number"], ["offset", "number"]];
      }, E.prototype.onGetOutputs = function () {
        return [["sin", "number"], ["cos", "number"], ["tan", "number"], ["asin", "number"], ["acos", "number"], ["atan", "number"]];
      }, A.registerNodeType("math/trigonometry", E), A.registerSearchboxExtra("math/trigonometry", "SIN()", {
        outputs: [["sin", "number"]],
        title: "SIN()"
      }), A.registerSearchboxExtra("math/trigonometry", "COS()", {
        outputs: [["cos", "number"]],
        title: "COS()"
      }), A.registerSearchboxExtra("math/trigonometry", "TAN()", {
        outputs: [["tan", "number"]],
        title: "TAN()"
      }), w.title = "Formula", w.desc = "Compute formula", w.size = [160, 100], f.prototype.onPropertyChanged = function (t, e) {
        "formula" == t && (this.code_widget.value = e);
      }, w.prototype.onExecute = function () {
        if (A.allow_scripts) {
          var t = this.getInputData(0),
              e = this.getInputData(1);
          null != t ? this.properties.x = t : t = this.properties.x, null != e ? this.properties.y = e : e = this.properties.y;
          var i;
          this.properties.formula;

          try {
            this._func && this._func_code == this.properties.formula || (this._func = new Function("x", "y", "TIME", "return " + this.properties.formula), this._func_code = this.properties.formula), i = this._func(t, e, this.graph.globaltime), this.boxcolor = null;
          } catch (t) {
            this.boxcolor = "red";
          }

          this.setOutputData(0, i);
        }
      }, w.prototype.getTitle = function () {
        return this._func_code || "Formula";
      }, w.prototype.onDrawBackground = function () {
        var t = this.properties.formula;
        this.outputs && this.outputs.length && (this.outputs[0].label = t);
      }, A.registerNodeType("math/formula", w), O.title = "Vec2->XY", O.desc = "vector 2 to components", O.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && (this.setOutputData(0, t[0]), this.setOutputData(1, t[1]));
      }, A.registerNodeType("math3d/vec2-to-xy", O), I.title = "XY->Vec2", I.desc = "components to vector2", I.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null == t && (t = this.properties.x);
        var e = this.getInputData(1);
        null == e && (e = this.properties.y);
        var i = this._data;
        i[0] = t, i[1] = e, this.setOutputData(0, i);
      }, A.registerNodeType("math3d/xy-to-vec2", I), D.title = "Vec3->XYZ", D.desc = "vector 3 to components", D.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && (this.setOutputData(0, t[0]), this.setOutputData(1, t[1]), this.setOutputData(2, t[2]));
      }, A.registerNodeType("math3d/vec3-to-xyz", D), N.title = "XYZ->Vec3", N.desc = "components to vector3", N.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null == t && (t = this.properties.x);
        var e = this.getInputData(1);
        null == e && (e = this.properties.y);
        var i = this.getInputData(2);
        null == i && (i = this.properties.z);
        var s = this._data;
        s[0] = t, s[1] = e, s[2] = i, this.setOutputData(0, s);
      }, A.registerNodeType("math3d/xyz-to-vec3", N), S.title = "Vec4->XYZW", S.desc = "vector 4 to components", S.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && (this.setOutputData(0, t[0]), this.setOutputData(1, t[1]), this.setOutputData(2, t[2]), this.setOutputData(3, t[3]));
      }, A.registerNodeType("math3d/vec4-to-xyzw", S), C.title = "XYZW->Vec4", C.desc = "components to vector4", C.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null == t && (t = this.properties.x);
        var e = this.getInputData(1);
        null == e && (e = this.properties.y);
        var i = this.getInputData(2);
        null == i && (i = this.properties.z);
        var s = this.getInputData(3);
        null == s && (s = this.properties.w);
        var o = this._data;
        o[0] = t, o[1] = e, o[2] = i, o[3] = s, this.setOutputData(0, o);
      }, A.registerNodeType("math3d/xyzw-to-vec4", C);
    }(this), function (t) {
      function e() {
        this.addInput("T", "vec3"), this.addInput("R", "vec3"), this.addInput("S", "vec3"), this.addOutput("mat4", "mat4"), this.properties = {
          T: [0, 0, 0],
          R: [0, 0, 0],
          S: [1, 1, 1],
          R_in_degrees: !0
        }, this._result = mat4.create(), this._must_update = !0;
      }

      function i() {
        this.addInput("A", "number,vec3"), this.addInput("B", "number,vec3"), this.addOutput("=", "number,vec3"), this.addProperty("OP", "+", "enum", {
          values: i.values
        }), this._result = vec3.create();
      }

      function s() {
        this.addInput("in", "vec3"), this.addInput("f", "number"), this.addOutput("out", "vec3"), this.properties = {
          f: 1
        }, this._data = new Float32Array(3);
      }

      function o() {
        this.addInput("in", "vec3"), this.addOutput("out", "number");
      }

      function n() {
        this.addInput("in", "vec3"), this.addOutput("out", "vec3"), this._data = new Float32Array(3);
      }

      function r() {
        this.addInput("A", "vec3"), this.addInput("B", "vec3"), this.addInput("f", "vec3"), this.addOutput("out", "vec3"), this.properties = {
          f: .5
        }, this._data = new Float32Array(3);
      }

      function a() {
        this.addInput("A", "vec3"), this.addInput("B", "vec3"), this.addOutput("out", "number");
      }

      var u = t.LiteGraph;

      if (e.title = "mat4", e.temp_quat = new Float32Array([0, 0, 0, 1]), e.temp_mat4 = new Float32Array(16), e.temp_vec3 = new Float32Array(3), e.prototype.onPropertyChanged = function (t, e) {
        this._must_update = !0;
      }, e.prototype.onExecute = function () {
        var t = this._result,
            i = e.temp_quat,
            s = e.temp_mat4,
            o = e.temp_vec3,
            n = this.getInputData(0),
            r = this.getInputData(1),
            a = this.getInputData(2);
        (this._must_update || n || r || a) && (n = n || this.properties.T, r = r || this.properties.R, a = a || this.properties.S, mat4.identity(t), mat4.translate(t, t, n), this.properties.R_in_degrees ? (o.set(r), vec3.scale(o, o, DEG2RAD), quat.fromEuler(i, o)) : quat.fromEuler(i, r), mat4.fromQuat(s, i), mat4.multiply(t, t, s), mat4.scale(t, t, a)), this.setOutputData(0, t);
      }, u.registerNodeType("math3d/mat4", e), i.values = ["+", "-", "*", "/", "%", "^", "max", "min", "dot", "cross"], u.registerSearchboxExtra("math3d/operation", "CROSS()", {
        properties: {
          OP: "cross"
        },
        title: "CROSS()"
      }), u.registerSearchboxExtra("math3d/operation", "DOT()", {
        properties: {
          OP: "dot"
        },
        title: "DOT()"
      }), i.title = "Operation", i.desc = "Easy math 3D operators", i["@OP"] = {
        type: "enum",
        title: "operation",
        values: i.values
      }, i.size = [100, 60], i.prototype.getTitle = function () {
        return "max" == this.properties.OP || "min" == this.properties.OP ? this.properties.OP + "(A,B)" : "A " + this.properties.OP + " B";
      }, i.prototype.onExecute = function () {
        var t = this.getInputData(0),
            e = this.getInputData(1);

        if (null != t && null != e) {
          t.constructor === Number && (t = [t, t, t]), e.constructor === Number && (e = [e, e, e]);
          var i = this._result;

          switch (this.properties.OP) {
            case "+":
              i = vec3.add(i, t, e);
              break;

            case "-":
              i = vec3.sub(i, t, e);
              break;

            case "x":
            case "X":
            case "*":
              i = vec3.mul(i, t, e);
              break;

            case "/":
              i = vec3.div(i, t, e);
              break;

            case "%":
              i[0] = t[0] % e[0], i[1] = t[1] % e[1], i[2] = t[2] % e[2];
              break;

            case "^":
              i[0] = Math.pow(t[0], e[0]), i[1] = Math.pow(t[1], e[1]), i[2] = Math.pow(t[2], e[2]);
              break;

            case "max":
              i[0] = Math.max(t[0], e[0]), i[1] = Math.max(t[1], e[1]), i[2] = Math.max(t[2], e[2]);
              break;

            case "min":
              i[0] = Math.min(t[0], e[0]), i[1] = Math.min(t[1], e[1]), i[2] = Math.min(t[2], e[2]);

            case "dot":
              i = vec3.dot(t, e);
              break;

            case "cross":
              vec3.cross(i, t, e);
              break;

            default:
              console.warn("Unknown operation: " + this.properties.OP);
          }

          this.setOutputData(0, i);
        }
      }, i.prototype.onDrawBackground = function (t) {
        this.flags.collapsed || (t.font = "40px Arial", t.fillStyle = "#666", t.textAlign = "center", t.fillText(this.properties.OP, .5 * this.size[0], .5 * (this.size[1] + u.NODE_TITLE_HEIGHT)), t.textAlign = "left");
      }, u.registerNodeType("math3d/operation", i), s.title = "vec3_scale", s.desc = "scales the components of a vec3", s.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (null != t) {
          var e = this.getInputData(1);
          null == e && (e = this.properties.f);
          var i = this._data;
          i[0] = t[0] * e, i[1] = t[1] * e, i[2] = t[2] * e, this.setOutputData(0, i);
        }
      }, u.registerNodeType("math3d/vec3-scale", s), o.title = "vec3_length", o.desc = "returns the module of a vector", o.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (null != t) {
          var e = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
          this.setOutputData(0, e);
        }
      }, u.registerNodeType("math3d/vec3-length", o), n.title = "vec3_normalize", n.desc = "returns the vector normalized", n.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (null != t) {
          var e = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]),
              i = this._data;
          i[0] = t[0] / e, i[1] = t[1] / e, i[2] = t[2] / e, this.setOutputData(0, i);
        }
      }, u.registerNodeType("math3d/vec3-normalize", n), r.title = "vec3_lerp", r.desc = "returns the interpolated vector", r.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (null != t) {
          var e = this.getInputData(1);

          if (null != e) {
            var i = this.getInputOrProperty("f"),
                s = this._data;
            s[0] = t[0] * (1 - i) + e[0] * i, s[1] = t[1] * (1 - i) + e[1] * i, s[2] = t[2] * (1 - i) + e[2] * i, this.setOutputData(0, s);
          }
        }
      }, u.registerNodeType("math3d/vec3-lerp", r), a.title = "vec3_dot", a.desc = "returns the dot product", a.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (null != t) {
          var e = this.getInputData(1);

          if (null != e) {
            var i = t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
            this.setOutputData(0, i);
          }
        }
      }, u.registerNodeType("math3d/vec3-dot", a), t.glMatrix) {
        function h() {
          this.addOutput("quat", "quat"), this.properties = {
            x: 0,
            y: 0,
            z: 0,
            w: 1,
            normalize: !1
          }, this._value = quat.create();
        }

        function p() {
          this.addInputs([["degrees", "number"], ["axis", "vec3"]]), this.addOutput("quat", "quat"), this.properties = {
            angle: 90,
            axis: vec3.fromValues(0, 1, 0)
          }, this._value = quat.create();
        }

        function l() {
          this.addInput("euler", "vec3"), this.addOutput("quat", "quat"), this.properties = {
            euler: [0, 0, 0],
            use_yaw_pitch_roll: !1
          }, this._degs = vec3.create(), this._value = quat.create();
        }

        function d() {
          this.addInput(["quat", "quat"]), this.addOutput("euler", "vec3"), this._value = vec3.create();
        }

        function c() {
          this.addInputs([["vec3", "vec3"], ["quat", "quat"]]), this.addOutput("result", "vec3"), this.properties = {
            vec: [0, 0, 1]
          };
        }

        function _() {
          this.addInputs([["A", "quat"], ["B", "quat"]]), this.addOutput("A*B", "quat"), this._value = quat.create();
        }

        function g() {
          this.addInputs([["A", "quat"], ["B", "quat"], ["factor", "number"]]), this.addOutput("slerp", "quat"), this.addProperty("factor", .5), this._value = quat.create();
        }

        function f() {
          this.addInput("vec3", "vec3"), this.addOutput("remap", "vec3"), this.addOutput("clamped", "vec3"), this.properties = {
            clamp: !0,
            range_min: [-1, -1, 0],
            range_max: [1, 1, 0],
            target_min: [-1, -1, 0],
            target_max: [1, 1, 0]
          }, this._value = vec3.create(), this._clamped = vec3.create();
        }

        h.title = "Quaternion", h.desc = "quaternion", h.prototype.onExecute = function () {
          this._value[0] = this.getInputOrProperty("x"), this._value[1] = this.getInputOrProperty("y"), this._value[2] = this.getInputOrProperty("z"), this._value[3] = this.getInputOrProperty("w"), this.properties.normalize && quat.normalize(this._value, this._value), this.setOutputData(0, this._value);
        }, h.prototype.onGetInputs = function () {
          return [["x", "number"], ["y", "number"], ["z", "number"], ["w", "number"]];
        }, u.registerNodeType("math3d/quaternion", h), p.title = "Rotation", p.desc = "quaternion rotation", p.prototype.onExecute = function () {
          var t = this.getInputData(0);
          null == t && (t = this.properties.angle);
          var e = this.getInputData(1);
          null == e && (e = this.properties.axis);
          var i = quat.setAxisAngle(this._value, e, .0174532925 * t);
          this.setOutputData(0, i);
        }, u.registerNodeType("math3d/rotation", p), l.title = "Euler->Quat", l.desc = "Converts euler angles (in degrees) to quaternion", l.prototype.onExecute = function () {
          var t = this.getInputData(0);
          null == t && (t = this.properties.euler), vec3.scale(this._degs, t, DEG2RAD), this.properties.use_yaw_pitch_roll && (this._degs = [this._degs[2], this._degs[0], this._degs[1]]);
          var e = quat.fromEuler(this._value, this._degs);
          this.setOutputData(0, e);
        }, u.registerNodeType("math3d/euler_to_quat", l), d.title = "Euler->Quat", d.desc = "Converts rotX,rotY,rotZ in degrees to quat", d.prototype.onExecute = function () {
          var t = this.getInputData(0);

          if (t) {
            quat.toEuler(this._value, t);
            vec3.scale(this._value, this._value, DEG2RAD), this.setOutputData(0, this._value);
          }
        }, u.registerNodeType("math3d/quat_to_euler", d), c.title = "Rot. Vec3", c.desc = "rotate a point", c.prototype.onExecute = function () {
          var t = this.getInputData(0);
          null == t && (t = this.properties.vec);
          var e = this.getInputData(1);
          null == e ? this.setOutputData(t) : this.setOutputData(0, vec3.transformQuat(vec3.create(), t, e));
        }, u.registerNodeType("math3d/rotate_vec3", c), _.title = "Mult. Quat", _.desc = "rotate quaternion", _.prototype.onExecute = function () {
          var t = this.getInputData(0);

          if (null != t) {
            var e = this.getInputData(1);

            if (null != e) {
              var i = quat.multiply(this._value, t, e);
              this.setOutputData(0, i);
            }
          }
        }, u.registerNodeType("math3d/mult-quat", _), g.title = "Quat Slerp", g.desc = "quaternion spherical interpolation", g.prototype.onExecute = function () {
          var t = this.getInputData(0);

          if (null != t) {
            var e = this.getInputData(1);

            if (null != e) {
              var i = this.properties.factor;
              null != this.getInputData(2) && (i = this.getInputData(2));
              var s = quat.slerp(this._value, t, e, i);
              this.setOutputData(0, s);
            }
          }
        }, u.registerNodeType("math3d/quat-slerp", g), f.title = "Remap Range", f.desc = "remap a 3D range", f.prototype.onExecute = function () {
          var t = this.getInputData(0);
          t && this._value.set(t);

          for (var e = this.properties.range_min, i = this.properties.range_max, s = this.properties.target_min, o = this.properties.target_max, n = 0; n < 3; ++n) {
            var r = i[n] - e[n];

            if (this._clamped[n] = Math.clamp(this._value[n], e[n], i[n]), 0 != r) {
              var a = (this._value[n] - e[n]) / r;
              this.properties.clamp && (a = Math.clamp(a, 0, 1));
              var u = o[n] - s[n];
              this._value[n] = s[n] + a * u;
            } else this._value[n] = .5 * (s[n] + o[n]);
          }

          this.setOutputData(0, this._value), this.setOutputData(1, this._clamped);
        }, u.registerNodeType("math3d/remap_range", f);
      } else u.debug && console.warn("No glmatrix found, some Math3D nodes may not work");
    }(this), function (t) {
      function e(t) {
        if (t && t.constructor === Object) try {
          return JSON.stringify(t);
        } catch (e) {
          return String(t);
        }
        return String(t);
      }

      function i(t, e) {
        return t == e;
      }

      function s(t, e) {
        return void 0 === t ? e : void 0 === e ? t : t + e;
      }

      function o(t, e) {
        return void 0 !== t && void 0 !== e && -1 != t.indexOf(e);
      }

      function n(t) {
        return null != t && t.constructor === String ? t.toUpperCase() : t;
      }

      function r(t, e) {
        if (null == e && (e = this.properties.separator), null == t) return [];
        if (t.constructor === String) return t.split(e || " ");

        if (t.constructor === Array) {
          for (var i = [], s = 0; s < t.length; ++s) "string" == typeof t[s] && (i[s] = t[s].split(e || " "));

          return i;
        }

        return null;
      }

      function a(t) {
        return null != t && t.constructor === Number ? t.toFixed(this.properties.precision) : t;
      }

      function u() {
        this.addInput("", "string"), this.addOutput("table", "table"), this.addOutput("rows", "number"), this.addProperty("value", ""), this.addProperty("separator", ","), this._table = null;
      }

      var h = t.LiteGraph;
      h.wrapFunctionAsNode("string/toString", e, [""], "string"), h.wrapFunctionAsNode("string/compare", i, ["string", "string"], "boolean"), h.wrapFunctionAsNode("string/concatenate", s, ["string", "string"], "string"), h.wrapFunctionAsNode("string/contains", o, ["string", "string"], "boolean"), h.wrapFunctionAsNode("string/toUpperCase", n, ["string"], "string"), h.wrapFunctionAsNode("string/split", r, ["string,array", "string"], "array", {
        separator: ","
      }), h.wrapFunctionAsNode("string/toFixed", a, ["number"], "string", {
        precision: 0
      }), u.title = "toTable", u.desc = "Splits a string to table", u.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          var e = this.properties.separator || ",";
          t == this._str && e == this._last_separator || (this._last_separator = e, this._str = t, this._table = t.split("\n").map(function (t) {
            return t.trim().split(e);
          })), this.setOutputData(0, this._table), this.setOutputData(1, this._table ? this._table.length : 0);
        }
      }, h.registerNodeType("string/toTable", u);
    }(this), function (t) {
      function e() {
        this.addInput("sel", "number"), this.addInput("A"), this.addInput("B"), this.addInput("C"), this.addInput("D"), this.addOutput("out"), this.selected = 0;
      }

      function i() {
        this.properties = {
          sequence: "A,B,C"
        }, this.addInput("index", "number"), this.addInput("seq"), this.addOutput("out"), this.index = 0, this.values = this.properties.sequence.split(",");
      }

      function s() {
        this.properties = {}, this.addInput("a", "boolean"), this.addInput("b", "boolean"), this.addOutput("out", "boolean");
      }

      function o() {
        this.properties = {}, this.addInput("a", "boolean"), this.addInput("b", "boolean"), this.addOutput("out", "boolean");
      }

      function n() {
        this.properties = {}, this.addInput("in", "boolean"), this.addOutput("out", "boolean");
      }

      function r() {
        this.properties = {}, this.addInput("a", "boolean"), this.addInput("b", "boolean"), this.addOutput("out", "boolean");
      }

      function a() {
        this.properties = {}, this.addInput("onTrigger", u.ACTION), this.addInput("condition", "boolean"), this.addOutput("true", u.EVENT), this.addOutput("false", u.EVENT), this.mode = u.ON_TRIGGER;
      }

      var u = t.LiteGraph;
      e.title = "Selector", e.desc = "selects an output", e.prototype.onDrawBackground = function (t) {
        if (!this.flags.collapsed) {
          t.fillStyle = "#AFB";
          var e = (this.selected + 1) * u.NODE_SLOT_HEIGHT + 6;
          t.beginPath(), t.moveTo(50, e), t.lineTo(50, e + u.NODE_SLOT_HEIGHT), t.lineTo(34, e + .5 * u.NODE_SLOT_HEIGHT), t.fill();
        }
      }, e.prototype.onExecute = function () {
        var t = this.getInputData(0);
        null != t && t.constructor === Number || (t = 0), this.selected = t = Math.round(t) % (this.inputs.length - 1);
        var e = this.getInputData(t + 1);
        void 0 !== e && this.setOutputData(0, e);
      }, e.prototype.onGetInputs = function () {
        return [["E", 0], ["F", 0], ["G", 0], ["H", 0]];
      }, u.registerNodeType("logic/selector", e), i.title = "Sequence", i.desc = "select one element from a sequence from a string", i.prototype.onPropertyChanged = function (t, e) {
        "sequence" == t && (this.values = e.split(","));
      }, i.prototype.onExecute = function () {
        var t = this.getInputData(1);
        t && t != this.current_sequence && (this.values = t.split(","), this.current_sequence = t);
        var e = this.getInputData(0);
        null == e && (e = 0), this.index = e = Math.round(e) % this.values.length, this.setOutputData(0, this.values[e]);
      }, u.registerNodeType("logic/sequence", i), s.title = "AND", s.desc = "Return true if all inputs are true", s.prototype.onExecute = function () {
        for (inX in ret = !0, this.inputs) if (!this.getInputData(inX)) {
          ret = !1;
          break;
        }

        this.setOutputData(0, ret);
      }, s.prototype.onGetInputs = function () {
        return [["and", "boolean"]];
      }, u.registerNodeType("logic/AND", s), o.title = "OR", o.desc = "Return true if at least one input is true", o.prototype.onExecute = function () {
        for (inX in ret = !1, this.inputs) if (this.getInputData(inX)) {
          ret = !0;
          break;
        }

        this.setOutputData(0, ret);
      }, o.prototype.onGetInputs = function () {
        return [["or", "boolean"]];
      }, u.registerNodeType("logic/OR", o), n.title = "NOT", n.desc = "Return the logical negation", n.prototype.onExecute = function () {
        var t = !this.getInputData(0);
        this.setOutputData(0, t);
      }, u.registerNodeType("logic/NOT", n), r.title = "bool == bool", r.desc = "Compare for logical equality", r.prototype.onExecute = function () {
        for (inX in last = null, ret = !0, this.inputs) if (null === last) last = this.getInputData(inX);else if (last != this.getInputData(inX)) {
          ret = !1;
          break;
        }

        this.setOutputData(0, ret);
      }, r.prototype.onGetInputs = function () {
        return [["bool", "boolean"]];
      }, u.registerNodeType("logic/CompareBool", r), a.title = "Branch", a.desc = "Branch execution on condition", a.prototype.onExecute = function (t, e) {
        var i = this.getInputData(1);
        i ? this.triggerSlot(0) : this.triggerSlot(1);
      }, u.registerNodeType("logic/IF", a);
    }(this), function (t) {
      function e() {
        this.addInput("A", "Number"), this.addInput("B", "Number"), this.addInput("C", "Number"), this.addInput("D", "Number"), this.values = [[], [], [], []], this.properties = {
          scale: 2
        };
      }

      function i() {
        this.addOutput("frame", "image"), this.properties = {
          url: ""
        };
      }

      function s() {
        this.addInput("f", "number"), this.addOutput("Color", "color"), this.properties = {
          colorA: "#444444",
          colorB: "#44AAFF",
          colorC: "#44FFAA",
          colorD: "#FFFFFF"
        };
      }

      function o() {
        this.addInput("", "image,canvas"), this.size = [200, 200];
      }

      function n() {
        this.addInputs([["img1", "image"], ["img2", "image"], ["fade", "number"]]), this.addOutput("", "image"), this.properties = {
          fade: .5,
          width: 512,
          height: 512
        };
      }

      function r() {
        this.addInput("", "image"), this.addOutput("", "image"), this.properties = {
          width: 256,
          height: 256,
          x: 0,
          y: 0,
          scale: 1
        }, this.size = [50, 20];
      }

      function a() {
        this.addInput("clear", d.ACTION), this.addOutput("", "canvas"), this.properties = {
          width: 512,
          height: 512,
          autoclear: !0
        }, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d");
      }

      function u() {
        this.addInput("canvas", "canvas"), this.addInput("img", "image,canvas"), this.addInput("x", "number"), this.addInput("y", "number"), this.properties = {
          x: 0,
          y: 0,
          opacity: 1
        };
      }

      function h() {
        this.addInput("canvas", "canvas"), this.addInput("x", "number"), this.addInput("y", "number"), this.addInput("w", "number"), this.addInput("h", "number"), this.properties = {
          x: 0,
          y: 0,
          w: 10,
          h: 10,
          color: "white",
          opacity: 1
        };
      }

      function p() {
        this.addInput("t", "number"), this.addOutputs([["frame", "image"], ["t", "number"], ["d", "number"]]), this.properties = {
          url: "",
          use_proxy: !0
        };
      }

      function l() {
        this.addOutput("Webcam", "image"), this.properties = {
          filterFacingMode: !1,
          facingMode: "user"
        }, this.boxcolor = "black", this.frame = 0;
      }

      var d = t.LiteGraph;
      e.title = "Plot", e.desc = "Plots data over time", e.colors = ["#FFF", "#F99", "#9F9", "#99F"], e.prototype.onExecute = function (t) {
        if (!this.flags.collapsed) for (var e = this.size, i = 0; i < 4; ++i) {
          var s = this.getInputData(i);

          if (null != s) {
            var o = this.values[i];
            o.push(s), o.length > e[0] && o.shift();
          }
        }
      }, e.prototype.onDrawBackground = function (t) {
        if (!this.flags.collapsed) {
          var i = this.size,
              s = .5 * i[1] / this.properties.scale,
              o = e.colors,
              n = .5 * i[1];
          if (t.fillStyle = "#000", t.fillRect(0, 0, i[0], i[1]), t.strokeStyle = "#555", t.beginPath(), t.moveTo(0, n), t.lineTo(i[0], n), t.stroke(), this.inputs) for (var r = 0; r < 4; ++r) {
            var a = this.values[r];

            if (this.inputs[r] && this.inputs[r].link) {
              t.strokeStyle = o[r], t.beginPath();
              var u = a[0] * s * -1 + n;
              t.moveTo(0, Math.clamp(u, 0, i[1]));

              for (var h = 1; h < a.length && h < i[0]; ++h) {
                u = a[h] * s * -1 + n;
                t.lineTo(h, Math.clamp(u, 0, i[1]));
              }

              t.stroke();
            }
          }
        }
      }, d.registerNodeType("graphics/plot", e), i.title = "Image", i.desc = "Image loader", i.widgets = [{
        name: "load",
        text: "Load",
        type: "button"
      }], i.supported_extensions = ["jpg", "jpeg", "png", "gif"], i.prototype.onAdded = function () {
        "" != this.properties.url && null == this.img && this.loadImage(this.properties.url);
      }, i.prototype.onDrawBackground = function (t) {
        this.flags.collapsed || this.img && this.size[0] > 5 && this.size[1] > 5 && this.img.width && t.drawImage(this.img, 0, 0, this.size[0], this.size[1]);
      }, i.prototype.onExecute = function () {
        this.img || (this.boxcolor = "#000"), this.img && this.img.width ? this.setOutputData(0, this.img) : this.setOutputData(0, null), this.img && this.img.dirty && (this.img.dirty = !1);
      }, i.prototype.onPropertyChanged = function (t, e) {
        return this.properties[t] = e, "url" == t && "" != e && this.loadImage(e), !0;
      }, i.prototype.loadImage = function (t, e) {
        if ("" != t) {
          this.img = document.createElement("img"), "http" == t.substr(0, 4) && d.proxy && (t = d.proxy + t.substr(t.indexOf(":") + 3)), this.img.src = t, this.boxcolor = "#F95";
          var i = this;
          this.img.onload = function () {
            e && e(this), console.log("Image loaded, size: " + i.img.width + "x" + i.img.height), this.dirty = !0, i.boxcolor = "#9F9", i.setDirtyCanvas(!0);
          }, this.img.onerror = function () {
            console.log("error loading the image:" + t);
          };
        } else this.img = null;
      }, i.prototype.onWidget = function (t, e) {
        "load" == e.name && this.loadImage(this.properties.url);
      }, i.prototype.onDropFile = function (t) {
        var e = this;
        this._url && URL.revokeObjectURL(this._url), this._url = URL.createObjectURL(t), this.properties.url = this._url, this.loadImage(this._url, function (t) {
          e.size[1] = t.height / t.width * e.size[0];
        });
      }, d.registerNodeType("graphics/image", i), s.title = "Palette", s.desc = "Generates a color", s.prototype.onExecute = function () {
        var t = [];
        null != this.properties.colorA && t.push(hex2num(this.properties.colorA)), null != this.properties.colorB && t.push(hex2num(this.properties.colorB)), null != this.properties.colorC && t.push(hex2num(this.properties.colorC)), null != this.properties.colorD && t.push(hex2num(this.properties.colorD));
        var e = this.getInputData(0);

        if (null == e && (e = .5), e > 1 ? e = 1 : e < 0 && (e = 0), 0 != t.length) {
          var i = [0, 0, 0];
          if (0 == e) i = t[0];else if (1 == e) i = t[t.length - 1];else {
            var s = (t.length - 1) * e,
                o = t[Math.floor(s)],
                n = t[Math.floor(s) + 1],
                r = s - Math.floor(s);
            i[0] = o[0] * (1 - r) + n[0] * r, i[1] = o[1] * (1 - r) + n[1] * r, i[2] = o[2] * (1 - r) + n[2] * r;
          }

          for (var a = 0; a < i.length; a++) i[a] /= 255;

          this.boxcolor = colorToString(i), this.setOutputData(0, i);
        }
      }, d.registerNodeType("color/palette", s), o.title = "Frame", o.desc = "Frame viewerew", o.widgets = [{
        name: "resize",
        text: "Resize box",
        type: "button"
      }, {
        name: "view",
        text: "View Image",
        type: "button"
      }], o.prototype.onDrawBackground = function (t) {
        this.frame && !this.flags.collapsed && t.drawImage(this.frame, 0, 0, this.size[0], this.size[1]);
      }, o.prototype.onExecute = function () {
        this.frame = this.getInputData(0), this.setDirtyCanvas(!0);
      }, o.prototype.onWidget = function (t, e) {
        if ("resize" == e.name && this.frame) {
          var i = this.frame.width,
              s = this.frame.height;
          i || null == this.frame.videoWidth || (i = this.frame.videoWidth, s = this.frame.videoHeight), i && s && (this.size = [i, s]), this.setDirtyCanvas(!0, !0);
        } else "view" == e.name && this.show();
      }, o.prototype.show = function () {
        showElement && this.frame && showElement(this.frame);
      }, d.registerNodeType("graphics/frame", o), n.title = "Image fade", n.desc = "Fades between images", n.widgets = [{
        name: "resizeA",
        text: "Resize to A",
        type: "button"
      }, {
        name: "resizeB",
        text: "Resize to B",
        type: "button"
      }], n.prototype.onAdded = function () {
        this.createCanvas();
        var t = this.canvas.getContext("2d");
        t.fillStyle = "#000", t.fillRect(0, 0, this.properties.width, this.properties.height);
      }, n.prototype.createCanvas = function () {
        this.canvas = document.createElement("canvas"), this.canvas.width = this.properties.width, this.canvas.height = this.properties.height;
      }, n.prototype.onExecute = function () {
        var t = this.canvas.getContext("2d");
        this.canvas.width = this.canvas.width;
        var e = this.getInputData(0);
        null != e && t.drawImage(e, 0, 0, this.canvas.width, this.canvas.height);
        var i = this.getInputData(2);
        null == i ? i = this.properties.fade : this.properties.fade = i, t.globalAlpha = i;
        var s = this.getInputData(1);
        null != s && t.drawImage(s, 0, 0, this.canvas.width, this.canvas.height), t.globalAlpha = 1, this.setOutputData(0, this.canvas), this.setDirtyCanvas(!0);
      }, d.registerNodeType("graphics/imagefade", n), r.title = "Crop", r.desc = "Crop Image", r.prototype.onAdded = function () {
        this.createCanvas();
      }, r.prototype.createCanvas = function () {
        this.canvas = document.createElement("canvas"), this.canvas.width = this.properties.width, this.canvas.height = this.properties.height;
      }, r.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (t) if (t.width) {
          var e = this.canvas.getContext("2d");
          e.drawImage(t, -this.properties.x, -this.properties.y, t.width * this.properties.scale, t.height * this.properties.scale), this.setOutputData(0, this.canvas);
        } else this.setOutputData(0, null);
      }, r.prototype.onDrawBackground = function (t) {
        this.flags.collapsed || this.canvas && t.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.size[0], this.size[1]);
      }, r.prototype.onPropertyChanged = function (t, e) {
        return this.properties[t] = e, "scale" == t ? (this.properties[t] = parseFloat(e), 0 == this.properties[t] && (console.error("Error in scale"), this.properties[t] = 1)) : this.properties[t] = parseInt(e), this.createCanvas(), !0;
      }, d.registerNodeType("graphics/cropImage", r), a.title = "Canvas", a.desc = "Canvas to render stuff", a.prototype.onExecute = function () {
        var t = this.canvas,
            e = 0 | this.properties.width,
            i = 0 | this.properties.height;
        t.width != e && (t.width = e), t.height != i && (t.height = i), this.properties.autoclear && this.ctx.clearRect(0, 0, t.width, t.height), this.setOutputData(0, t);
      }, a.prototype.onAction = function (t, e) {
        "clear" == t && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }, d.registerNodeType("graphics/canvas", a), u.title = "DrawImage", u.desc = "Draws image into a canvas", u.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          var e = this.getInputOrProperty("img");

          if (e) {
            var i = this.getInputOrProperty("x"),
                s = this.getInputOrProperty("y"),
                o = t.getContext("2d");
            o.drawImage(e, i, s);
          }
        }
      }, d.registerNodeType("graphics/drawImage", u), h.title = "DrawRectangle", h.desc = "Draws rectangle in canvas", h.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          var e = this.getInputOrProperty("x"),
              i = this.getInputOrProperty("y"),
              s = this.getInputOrProperty("w"),
              o = this.getInputOrProperty("h"),
              n = t.getContext("2d");
          n.fillRect(e, i, s, o);
        }
      }, d.registerNodeType("graphics/drawRectangle", h), p.title = "Video", p.desc = "Video playback", p.widgets = [{
        name: "play",
        text: "PLAY",
        type: "minibutton"
      }, {
        name: "stop",
        text: "STOP",
        type: "minibutton"
      }, {
        name: "demo",
        text: "Demo video",
        type: "button"
      }, {
        name: "mute",
        text: "Mute video",
        type: "button"
      }], p.prototype.onExecute = function () {
        if (this.properties.url && (this.properties.url != this._video_url && this.loadVideo(this.properties.url), this._video && 0 != this._video.width)) {
          var t = this.getInputData(0);
          t && t >= 0 && t <= 1 && (this._video.currentTime = t * this._video.duration, this._video.pause()), this._video.dirty = !0, this.setOutputData(0, this._video), this.setOutputData(1, this._video.currentTime), this.setOutputData(2, this._video.duration), this.setDirtyCanvas(!0);
        }
      }, p.prototype.onStart = function () {
        this.play();
      }, p.prototype.onStop = function () {
        this.stop();
      }, p.prototype.loadVideo = function (t) {
        this._video_url = t;
        var e = t.substr(0, 10).indexOf(":"),
            i = "";
        -1 != e && (i = t.substr(0, e));
        var s = "";
        i && (s = t.substr(0, t.indexOf("/", i.length + 3)), s = s.substr(i.length + 3)), this.properties.use_proxy && i && d.proxy && s != location.host && (t = d.proxy + t.substr(t.indexOf(":") + 3)), this._video = document.createElement("video"), this._video.src = t, this._video.type = "type=video/mp4", this._video.muted = !0, this._video.autoplay = !0;
        var o = this;
        this._video.addEventListener("loadedmetadata", function (t) {
          console.log("Duration: " + this.duration + " seconds"), console.log("Size: " + this.videoWidth + "," + this.videoHeight), o.setDirtyCanvas(!0), this.width = this.videoWidth, this.height = this.videoHeight;
        }), this._video.addEventListener("progress", function (t) {
          console.log("video loading...");
        }), this._video.addEventListener("error", function (t) {
          if (console.error("Error loading video: " + this.src), this.error) switch (this.error.code) {
            case this.error.MEDIA_ERR_ABORTED:
              console.error("You stopped the video.");
              break;

            case this.error.MEDIA_ERR_NETWORK:
              console.error("Network error - please try again later.");
              break;

            case this.error.MEDIA_ERR_DECODE:
              console.error("Video is broken..");
              break;

            case this.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              console.error("Sorry, your browser can't play this video.");
          }
        }), this._video.addEventListener("ended", function (t) {
          console.log("Video Ended."), this.play();
        });
      }, p.prototype.onPropertyChanged = function (t, e) {
        return this.properties[t] = e, "url" == t && "" != e && this.loadVideo(e), !0;
      }, p.prototype.play = function () {
        this._video && this._video.videoWidth && this._video.play();
      }, p.prototype.playPause = function () {
        this._video && (this._video.paused ? this.play() : this.pause());
      }, p.prototype.stop = function () {
        this._video && (this._video.pause(), this._video.currentTime = 0);
      }, p.prototype.pause = function () {
        this._video && (console.log("Video paused"), this._video.pause());
      }, p.prototype.onWidget = function (t, e) {}, d.registerNodeType("graphics/video", p), l.title = "Webcam", l.desc = "Webcam image", l.is_webcam_open = !1, l.prototype.openStream = function () {
        function t(t) {
          console.log("Webcam rejected", t), i._webcam_stream = !1, l.is_webcam_open = !1, i.boxcolor = "red", i.trigger("stream_error");
        }

        if (navigator.mediaDevices.getUserMedia) {
          this._waiting_confirmation = !0;
          var e = {
            audio: !1,
            video: !this.properties.filterFacingMode || {
              facingMode: this.properties.facingMode
            }
          };
          navigator.mediaDevices.getUserMedia(e).then(this.streamReady.bind(this)).catch(t);
          var i = this;
        } else console.log("getUserMedia() is not supported in your browser, use chrome and enable WebRTC from about://flags");
      }, l.prototype.closeStream = function () {
        if (this._webcam_stream) {
          var t = this._webcam_stream.getTracks();

          if (t.length) for (var e = 0; e < t.length; ++e) t[e].stop();
          l.is_webcam_open = !1, this._webcam_stream = null, this._video = null, this.boxcolor = "black", this.trigger("stream_closed");
        }
      }, l.prototype.onPropertyChanged = function (t, e) {
        "facingMode" == t && (this.properties.facingMode = e, this.closeStream(), this.openStream());
      }, l.prototype.onRemoved = function () {
        this.closeStream();
      }, l.prototype.streamReady = function (t) {
        this._webcam_stream = t, this.boxcolor = "green";
        var e = this._video;
        e || (e = document.createElement("video"), e.autoplay = !0, e.srcObject = t, this._video = e, e.onloadedmetadata = function (t) {
          console.log(t), l.is_webcam_open = !0;
        }), this.trigger("stream_ready", e);
      }, l.prototype.onExecute = function () {
        if (null != this._webcam_stream || this._waiting_confirmation || this.openStream(), this._video && this._video.videoWidth) {
          this._video.frame = ++this.frame, this._video.width = this._video.videoWidth, this._video.height = this._video.videoHeight, this.setOutputData(0, this._video);

          for (var t = 1; t < this.outputs.length; ++t) if (this.outputs[t]) switch (this.outputs[t].name) {
            case "width":
              this.setOutputData(t, this._video.videoWidth);
              break;

            case "height":
              this.setOutputData(t, this._video.videoHeight);
          }
        }
      }, l.prototype.getExtraMenuOptions = function (t) {
        var e = this,
            i = e.properties.show ? "Hide Frame" : "Show Frame";
        return [{
          content: i,
          callback: function () {
            e.properties.show = !e.properties.show;
          }
        }];
      }, l.prototype.onDrawBackground = function (t) {
        this.flags.collapsed || this.size[1] <= 20 || !this.properties.show || this._video && (t.save(), t.drawImage(this._video, 0, 0, this.size[0], this.size[1]), t.restore());
      }, l.prototype.onGetOutputs = function () {
        return [["width", "number"], ["height", "number"], ["stream_ready", d.EVENT], ["stream_closed", d.EVENT], ["stream_error", d.EVENT]];
      }, d.registerNodeType("graphics/webcam", l);
    }(this), function (t) {
      function e() {
        this.addOutput("tex", "Texture"), this.addOutput("name", "string"), this.properties = {
          name: "",
          filter: !0
        }, this.size = [e.image_preview_size, e.image_preview_size];
      }

      function i() {
        this.addInput("Texture", "Texture"), this.properties = {
          flipY: !1
        }, this.size = [e.image_preview_size, e.image_preview_size];
      }

      function s() {
        this.addInput("Texture", "Texture"), this.addOutput("tex", "Texture"), this.addOutput("name", "string"), this.properties = {
          name: "",
          generate_mipmaps: !1
        };
      }

      function o() {
        this.addInput("Texture", "Texture"), this.addInput("TextureB", "Texture"), this.addInput("value", "number"), this.addOutput("Texture", "Texture"), this.help = "<p>pixelcode must be vec3, uvcode must be vec2, is optional</p>\t\t<p><strong>uv:</strong> tex. coords</p><p><strong>color:</strong> texture <strong>colorB:</strong> textureB</p><p><strong>time:</strong> scene time <strong>value:</strong> input value</p><p>For multiline you must type: result = ...</p>", this.properties = {
          value: 1,
          pixelcode: "color + colorB * value",
          uvcode: "",
          precision: e.DEFAULT
        }, this.has_error = !1;
      }

      function n() {
        this.addOutput("out", "Texture"), this.properties = {
          code: "",
          u_value: 1,
          u_color: [1, 1, 1, 1],
          width: 512,
          height: 512,
          precision: e.DEFAULT
        }, this.properties.code = n.pixel_shader, this._uniforms = {
          u_value: 1,
          u_color: vec4.create(),
          in_texture: 0,
          texSize: vec4.create(),
          time: 0
        };
      }

      function r() {
        this.addInput("in", "Texture"), this.addInput("scale", "vec2"), this.addInput("offset", "vec2"), this.addOutput("out", "Texture"), this.properties = {
          offset: vec2.fromValues(0, 0),
          scale: vec2.fromValues(1, 1),
          precision: e.DEFAULT
        };
      }

      function a() {
        this.addInput("in", "Texture"), this.addInput("warp", "Texture"), this.addInput("factor", "number"), this.addOutput("out", "Texture"), this.properties = {
          factor: .01,
          scale: [1, 1],
          offset: [0, 0],
          precision: e.DEFAULT
        }, this._uniforms = {
          u_texture: 0,
          u_textureB: 1,
          u_factor: 1,
          u_scale: vec2.create(),
          u_offset: vec2.create()
        };
      }

      function u() {
        this.addInput("Texture", "Texture"), this.properties = {
          additive: !1,
          antialiasing: !1,
          filter: !0,
          disable_alpha: !1,
          gamma: 1,
          viewport: [0, 0, 1, 1]
        }, this.size[0] = 130;
      }

      function h() {
        this.addInput("Texture", "Texture"), this.addOutput("", "Texture"), this.properties = {
          size: 0,
          generate_mipmaps: !1,
          precision: e.DEFAULT
        };
      }

      function p() {
        this.addInput("Texture", "Texture"), this.addOutput("", "Texture"), this.properties = {
          iterations: 1,
          generate_mipmaps: !1,
          precision: e.DEFAULT
        };
      }

      function l() {
        this.addInput("Texture", "Texture"), this.addOutput("", "Texture"), this.properties = {
          size: [512, 512],
          generate_mipmaps: !1,
          precision: e.DEFAULT
        };
      }

      function d() {
        this.addInput("Texture", "Texture"), this.addOutput("tex", "Texture"), this.addOutput("avg", "vec4"), this.addOutput("lum", "number"), this.properties = {
          use_previous_frame: !0,
          high_quality: !1
        }, this._uniforms = {
          u_texture: 0,
          u_mipmap_offset: 0
        }, this._luminance = new Float32Array(4);
      }

      function c() {
        this.addInput("Texture", "Texture"), this.addOutput("min_t", "Texture"), this.addOutput("max_t", "Texture"), this.addOutput("min", "vec4"), this.addOutput("max", "vec4"), this.properties = {
          mode: "max",
          use_previous_frame: !0
        }, this._uniforms = {
          u_texture: 0
        }, this._max = new Float32Array(4), this._min = new Float32Array(4), this._textures_chain = [];
      }

      function _() {
        this.addInput("in", "Texture"), this.addInput("factor", "Number"), this.addOutput("out", "Texture"), this.properties = {
          factor: .5
        }, this._uniforms = {
          u_texture: 0,
          u_textureB: 1,
          u_factor: this.properties.factor
        };
      }

      function g() {
        this.addInput("in", "Texture"), this.addOutput("avg", "Texture"), this.addOutput("array", "Texture"), this.properties = {
          samples: 64,
          frames_interval: 1
        }, this._uniforms = {
          u_texture: 0,
          u_textureB: 1,
          u_samples: this.properties.samples,
          u_isamples: 1 / this.properties.samples
        }, this.frame = 0;
      }

      function f() {
        this.addInput("Image", "image"), this.addOutput("", "Texture"), this.properties = {};
      }

      function v() {
        this.addInput("Texture", "Texture"), this.addInput("LUT", "Texture"), this.addInput("Intensity", "number"), this.addOutput("", "Texture"), this.properties = {
          enabled: !0,
          intensity: 1,
          precision: e.DEFAULT,
          texture: null
        }, v._shader || (v._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, v.pixel_shader));
      }

      function m() {
        this.addInput("Texture", "Texture"), this.addInput("Atlas", "Texture"), this.addOutput("", "Texture"), this.properties = {
          enabled: !0,
          num_row_symbols: 4,
          symbol_size: 16,
          brightness: 1,
          colorize: !1,
          filter: !1,
          invert: !1,
          precision: e.DEFAULT,
          generate_mipmaps: !1,
          texture: null
        }, m._shader || (m._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, m.pixel_shader)), this._uniforms = {
          u_texture: 0,
          u_textureB: 1,
          u_row_simbols: 4,
          u_simbol_size: 16,
          u_res: vec2.create()
        };
      }

      function y() {
        this.addInput("Texture", "Texture"), this.addOutput("R", "Texture"), this.addOutput("G", "Texture"), this.addOutput("B", "Texture"), this.addOutput("A", "Texture"), y._shader || (y._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, y.pixel_shader));
      }

      function x() {
        this.addInput("R", "Texture"), this.addInput("G", "Texture"), this.addInput("B", "Texture"), this.addInput("A", "Texture"), this.addOutput("Texture", "Texture"), this.properties = {
          precision: e.DEFAULT,
          R: 1,
          G: 1,
          B: 1,
          A: 1
        }, this._color = vec4.create(), this._uniforms = {
          u_textureR: 0,
          u_textureG: 1,
          u_textureB: 2,
          u_textureA: 3,
          u_color: this._color
        };
      }

      function b() {
        this.addOutput("Texture", "Texture"), this._tex_color = vec4.create(), this.properties = {
          color: vec4.create(),
          precision: e.DEFAULT
        };
      }

      function T() {
        this.addInput("A", "color"), this.addInput("B", "color"), this.addOutput("Texture", "Texture"), this.properties = {
          angle: 0,
          scale: 1,
          A: [0, 0, 0],
          B: [1, 1, 1],
          texture_size: 32
        }, T._shader || (T._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, T.pixel_shader)), this._uniforms = {
          u_angle: 0,
          u_colorA: vec3.create(),
          u_colorB: vec3.create()
        };
      }

      function E() {
        this.addInput("A", "Texture"), this.addInput("B", "Texture"), this.addInput("Mixer", "Texture"), this.addOutput("Texture", "Texture"), this.properties = {
          factor: .5,
          size_from_biggest: !0,
          invert: !1,
          precision: e.DEFAULT
        }, this._uniforms = {
          u_textureA: 0,
          u_textureB: 1,
          u_textureMix: 2,
          u_mix: vec4.create()
        };
      }

      function w() {
        this.addInput("Tex.", "Texture"), this.addOutput("Edges", "Texture"), this.properties = {
          invert: !0,
          threshold: !1,
          factor: 1,
          precision: e.DEFAULT
        }, w._shader || (w._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, w.pixel_shader));
      }

      function O() {
        this.addInput("Texture", "Texture"), this.addInput("Distance", "number"), this.addInput("Range", "number"), this.addOutput("Texture", "Texture"), this.properties = {
          distance: 100,
          range: 50,
          only_depth: !1,
          high_precision: !1
        }, this._uniforms = {
          u_texture: 0,
          u_distance: 100,
          u_range: 50,
          u_camera_planes: null
        };
      }

      function I() {
        this.addInput("Texture", "Texture"), this.addOutput("Texture", "Texture"), this.properties = {
          precision: e.DEFAULT,
          invert: !1
        }, this._uniforms = {
          u_texture: 0,
          u_camera_planes: null,
          u_ires: vec2.create()
        };
      }

      function D() {
        this.addInput("Texture", "Texture"), this.addInput("Iterations", "number"), this.addInput("Intensity", "number"), this.addOutput("Blurred", "Texture"), this.properties = {
          intensity: 1,
          iterations: 1,
          preserve_aspect: !1,
          scale: [1, 1],
          precision: e.DEFAULT
        };
      }

      function N() {
        this.intensity = .5, this.persistence = .6, this.iterations = 8, this.threshold = .8, this.scale = 1, this.dirt_texture = null, this.dirt_factor = .5, this._textures = [], this._uniforms = {
          u_intensity: 1,
          u_texture: 0,
          u_glow_texture: 1,
          u_threshold: 0,
          u_texel_size: vec2.create()
        };
      }

      function S() {
        this.addInput("in", "Texture"), this.addInput("dirt", "Texture"), this.addOutput("out", "Texture"), this.addOutput("glow", "Texture"), this.properties = {
          enabled: !0,
          intensity: 1,
          persistence: .99,
          iterations: 16,
          threshold: 0,
          scale: 1,
          dirt_factor: .5,
          precision: e.DEFAULT
        }, this.fx = new N();
      }

      function C() {
        this.addInput("Texture", "Texture"), this.addOutput("Filtered", "Texture"), this.properties = {
          intensity: 1,
          radius: 5
        };
      }

      function A() {
        this.addInput("Texture", "Texture"), this.addOutput("Filtered", "Texture"), this.properties = {
          sigma: 1.4,
          k: 1.6,
          p: 21.7,
          epsilon: 79,
          phi: .017
        };
      }

      function L() {
        this.addOutput("Webcam", "Texture"), this.properties = {
          texture_name: "",
          facingMode: "user"
        }, this.boxcolor = "black", this.version = 0;
      }

      function k() {
        this.addInput("in", "Texture"), this.addInput("f", "number"), this.addOutput("out", "Texture"), this.properties = {
          enabled: !0,
          factor: 1,
          precision: e.LOW
        }, this._uniforms = {
          u_texture: 0,
          u_factor: 1
        };
      }

      function R() {
        this.addInput("in", ""), this.properties = {
          precision: e.LOW,
          width: 0,
          height: 0,
          channels: 1
        }, this.addOutput("out", "Texture");
      }

      function P() {
        this.addInput("in", "Texture"), this.addOutput("out", "Texture"), this.properties = {
          precision: e.LOW,
          split_channels: !1
        }, this._values = new Uint8Array(1024), this._values.fill(255), this._curve_texture = null, this._uniforms = {
          u_texture: 0,
          u_curve: 1,
          u_range: 1
        }, this._must_update = !0, this._points = {
          RGB: [[0, 0], [1, 1]],
          R: [[0, 0], [1, 1]],
          G: [[0, 0], [1, 1]],
          B: [[0, 0], [1, 1]]
        }, this.curve_editor = null, this.addWidget("toggle", "Split Channels", !1, "split_channels"), this.addWidget("combo", "Channel", "RGB", {
          values: ["RGB", "R", "G", "B"]
        }), this.curve_offset = 68, this.size = [240, 160];
      }

      function M() {
        this.addInput("in", "Texture"), this.addInput("exp", "number"), this.addOutput("out", "Texture"), this.properties = {
          exposition: 1,
          precision: e.LOW
        }, this._uniforms = {
          u_texture: 0,
          u_exposition: 1
        };
      }

      function G() {
        this.addInput("in", "Texture"), this.addInput("avg", "number,Texture"), this.addOutput("out", "Texture"), this.properties = {
          enabled: !0,
          scale: 1,
          gamma: 1,
          average_lum: 1,
          lum_white: 1,
          precision: e.LOW
        }, this._uniforms = {
          u_texture: 0,
          u_lumwhite2: 1,
          u_igamma: 1,
          u_scale: 1,
          u_average_lum: 1
        };
      }

      function z() {
        this.addOutput("out", "Texture"), this.properties = {
          width: 512,
          height: 512,
          seed: 0,
          persistence: .1,
          octaves: 8,
          scale: 1,
          offset: [0, 0],
          amplitude: 1,
          precision: e.DEFAULT
        }, this._key = 0, this._texture = null, this._uniforms = {
          u_persistence: .1,
          u_seed: 0,
          u_offset: vec2.create(),
          u_scale: 1,
          u_viewport: vec2.create()
        };
      }

      function F() {
        this.addInput("v"), this.addOutput("out", "Texture"), this.properties = {
          code: F.default_code,
          width: 512,
          height: 512,
          clear: !0,
          precision: e.DEFAULT,
          use_html_canvas: !1
        }, this._func = null, this._temp_texture = null, this.compileCode();
      }

      function B() {
        this.addInput("in", "Texture"), this.addOutput("out", "Texture"), this.properties = {
          key_color: vec3.fromValues(0, 1, 0),
          threshold: .8,
          slope: .2,
          precision: e.DEFAULT
        };
      }

      function H() {
        this.addInput("in", "texture"), this.addInput("yaw", "number"), this.addOutput("out", "texture"), this.properties = {
          yaw: 0
        };
      }

      var U = t.LiteGraph,
          V = t.LGraphCanvas;
      t.LGraphTexture = null, "undefined" != typeof GL && (V.link_type_colors.Texture = "#987", t.LGraphTexture = e, e.title = "Texture", e.desc = "Texture", e.widgets_info = {
        name: {
          widget: "texture"
        },
        filter: {
          widget: "checkbox"
        }
      }, e.loadTextureCallback = null, e.image_preview_size = 256, e.UNDEFINED = 0, e.PASS_THROUGH = 1, e.COPY = 2, e.LOW = 3, e.HIGH = 4, e.REUSE = 5, e.DEFAULT = 2, e.MODE_VALUES = {
        undefined: e.UNDEFINED,
        "pass through": e.PASS_THROUGH,
        copy: e.COPY,
        low: e.LOW,
        high: e.HIGH,
        reuse: e.REUSE,
        default: e.DEFAULT
      }, e.getTexturesContainer = function () {
        return gl.textures;
      }, e.loadTexture = function (t, i) {
        i = i || {};
        var s = t;
        "http://" == s.substr(0, 7) && U.proxy && (s = U.proxy + s.substr(7));
        var o = e.getTexturesContainer(),
            n = o[t] = GL.Texture.fromURL(s, i);
        return n;
      }, e.getTexture = function (t) {
        var e = this.getTexturesContainer();
        if (!e) throw "Cannot load texture, container of textures not found";
        var i = e[t];
        return !i && t && ":" != t[0] ? this.loadTexture(t) : i;
      }, e.getTargetTexture = function (t, i, s) {
        if (!t) throw "LGraphTexture.getTargetTexture expects a reference texture";
        var o = null;

        switch (s) {
          case e.LOW:
            o = gl.UNSIGNED_BYTE;
            break;

          case e.HIGH:
            o = gl.HIGH_PRECISION_FORMAT;
            break;

          case e.REUSE:
            return t;

          case e.COPY:
          default:
            o = t ? t.type : gl.UNSIGNED_BYTE;
        }

        return i && i.width == t.width && i.height == t.height && i.type == o && i.format == t.format || (i = new GL.Texture(t.width, t.height, {
          type: o,
          format: t.format,
          filter: gl.LINEAR
        })), i;
      }, e.getTextureType = function (t, i) {
        var s = i ? i.type : gl.UNSIGNED_BYTE;

        switch (t) {
          case e.HIGH:
            s = gl.HIGH_PRECISION_FORMAT;
            break;

          case e.LOW:
            s = gl.UNSIGNED_BYTE;
        }

        return s;
      }, e.getWhiteTexture = function () {
        if (this._white_texture) return this._white_texture;
        var t = this._white_texture = GL.Texture.fromMemory(1, 1, [255, 255, 255, 255], {
          format: gl.RGBA,
          wrap: gl.REPEAT,
          filter: gl.NEAREST
        });
        return t;
      }, e.getNoiseTexture = function () {
        if (this._noise_texture) return this._noise_texture;

        for (var t = new Uint8Array(1048576), e = 0; e < 1048576; ++e) t[e] = 255 * Math.random();

        var i = GL.Texture.fromMemory(512, 512, t, {
          format: gl.RGBA,
          wrap: gl.REPEAT,
          filter: gl.NEAREST
        });
        return this._noise_texture = i, i;
      }, e.prototype.onDropFile = function (t, e, i) {
        if (t) {
          var s = null;
          if ("string" == typeof t) s = GL.Texture.fromURL(t);else if (-1 != e.toLowerCase().indexOf(".dds")) s = GL.Texture.fromDDSInMemory(t);else {
            var o = new Blob([i]),
                n = URL.createObjectURL(o);
            s = GL.Texture.fromURL(n);
          }
          this._drop_texture = s, this.properties.name = e;
        } else this._drop_texture = null, this.properties.name = "";
      }, e.prototype.getExtraMenuOptions = function (t) {
        var e = this;
        if (this._drop_texture) return [{
          content: "Clear",
          callback: function () {
            e._drop_texture = null, e.properties.name = "";
          }
        }];
      }, e.prototype.onExecute = function () {
        var t = null;
        if (this.isOutputConnected(1) && (t = this.getInputData(0)), !t && this._drop_texture && (t = this._drop_texture), !t && this.properties.name && (t = e.getTexture(this.properties.name)), !t) return this.setOutputData(0, null), void this.setOutputData(1, "");
        this._last_tex = t, !1 === this.properties.filter ? t.setParameter(gl.TEXTURE_MAG_FILTER, gl.NEAREST) : t.setParameter(gl.TEXTURE_MAG_FILTER, gl.LINEAR), this.setOutputData(0, t), this.setOutputData(1, t.fullpath || t.filename);

        for (var i = 2; i < this.outputs.length; i++) {
          var s = this.outputs[i];

          if (s) {
            var o = null;
            "width" == s.name ? o = t.width : "height" == s.name ? o = t.height : "aspect" == s.name && (o = t.width / t.height), this.setOutputData(i, o);
          }
        }
      }, e.prototype.onResourceRenamed = function (t, e) {
        this.properties.name == t && (this.properties.name = e);
      }, e.prototype.onDrawBackground = function (t) {
        if (!(this.flags.collapsed || this.size[1] <= 20)) if (this._drop_texture && t.webgl) t.drawImage(this._drop_texture, 0, 0, this.size[0], this.size[1]);else {
          if (this._last_preview_tex != this._last_tex) if (t.webgl) this._canvas = this._last_tex;else {
            var i = e.generateLowResTexturePreview(this._last_tex);
            if (!i) return;
            this._last_preview_tex = this._last_tex, this._canvas = cloneCanvas(i);
          }
          this._canvas && (t.save(), t.webgl || (t.translate(0, this.size[1]), t.scale(1, -1)), t.drawImage(this._canvas, 0, 0, this.size[0], this.size[1]), t.restore());
        }
      }, e.generateLowResTexturePreview = function (t) {
        if (!t) return null;
        var i = e.image_preview_size,
            s = t;
        if (t.format == gl.DEPTH_COMPONENT) return null;
        (t.width > i || t.height > i) && (s = this._preview_temp_tex, this._preview_temp_tex || (s = new GL.Texture(i, i, {
          minFilter: gl.NEAREST
        }), this._preview_temp_tex = s), t.copyTo(s), t = s);
        var o = this._preview_canvas;
        return o || (o = createCanvas(i, i), this._preview_canvas = o), s && s.toCanvas(o), o;
      }, e.prototype.getResources = function (t) {
        return this.properties.name && (t[this.properties.name] = GL.Texture), t;
      }, e.prototype.onGetInputs = function () {
        return [["in", "Texture"]];
      }, e.prototype.onGetOutputs = function () {
        return [["width", "number"], ["height", "number"], ["aspect", "number"]];
      }, e.replaceCode = function (t, e) {
        return t.replace(/\{\{[a-zA-Z0-9_]*\}\}/g, function (t) {
          return t = t.replace(/[\{\}]/g, ""), e[t] || "";
        });
      }, U.registerNodeType("texture/texture", e), i.title = "Preview", i.desc = "Show a texture in the graph canvas", i.allow_preview = !1, i.prototype.onDrawBackground = function (t) {
        if (!this.flags.collapsed && (t.webgl || i.allow_preview)) {
          var s = this.getInputData(0);

          if (s) {
            var o = null;
            o = !s.handle && t.webgl ? s : e.generateLowResTexturePreview(s), t.save(), this.properties.flipY && (t.translate(0, this.size[1]), t.scale(1, -1)), t.drawImage(o, 0, 0, this.size[0], this.size[1]), t.restore();
          }
        }
      }, U.registerNodeType("texture/preview", i), s.title = "Save", s.desc = "Save a texture in the repository", s.prototype.getPreviewTexture = function () {
        return this._texture;
      }, s.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          if (this.properties.generate_mipmaps && (t.bind(0), t.setParameter(gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR), gl.generateMipmap(t.texture_type), t.unbind(0)), this.properties.name) if (e.storeTexture) e.storeTexture(this.properties.name, t);else {
            var i = e.getTexturesContainer();
            i[this.properties.name] = t;
          }
          this._texture = t, this.setOutputData(0, t), this.setOutputData(1, this.properties.name);
        }
      }, U.registerNodeType("texture/save", s), o.widgets_info = {
        uvcode: {
          widget: "code"
        },
        pixelcode: {
          widget: "code"
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, o.title = "Operation", o.desc = "Texture shader operation", o.presets = {}, o.prototype.getExtraMenuOptions = function (t) {
        var e = this,
            i = e.properties.show ? "Hide Texture" : "Show Texture";
        return [{
          content: i,
          callback: function () {
            e.properties.show = !e.properties.show;
          }
        }];
      }, o.prototype.onPropertyChanged = function () {
        this.has_error = !1;
      }, o.prototype.onDrawBackground = function (t) {
        this.flags.collapsed || this.size[1] <= 20 || !this.properties.show || this._tex && this._tex.gl == t && (t.save(), t.drawImage(this._tex, 0, 0, this.size[0], this.size[1]), t.restore());
      }, o.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (this.isOutputConnected(0)) if (this.properties.precision !== e.PASS_THROUGH) {
          var i = this.getInputData(1);

          if (this.properties.uvcode || this.properties.pixelcode) {
            var s = 512,
                n = 512;
            t ? (s = t.width, n = t.height) : i && (s = i.width, n = i.height), i || (i = GL.Texture.getWhiteTexture());
            var r = e.getTextureType(this.properties.precision, t);
            t || this._tex ? this._tex = e.getTargetTexture(t || this._tex, this._tex, this.properties.precision) : this._tex = new GL.Texture(s, n, {
              type: r,
              format: gl.RGBA,
              filter: gl.LINEAR
            });
            var a = "";
            this.properties.uvcode && (a = "uv = " + this.properties.uvcode, -1 != this.properties.uvcode.indexOf(";") && (a = this.properties.uvcode));
            var u = "";
            this.properties.pixelcode && (u = "result = " + this.properties.pixelcode, -1 != this.properties.pixelcode.indexOf(";") && (u = this.properties.pixelcode));
            var h = this._shader;

            if (!(this.has_error || h && this._shader_code == a + "|" + u)) {
              var p = e.replaceCode(o.pixel_shader, {
                UV_CODE: a,
                PIXEL_CODE: u
              });

              try {
                h = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, p), this.boxcolor = "#00FF00";
              } catch (t) {
                return GL.Shader.dumpErrorToConsole(t, Shader.SCREEN_VERTEX_SHADER, p), this.boxcolor = "#FF0000", void (this.has_error = !0);
              }

              this._shader = h, this._shader_code = a + "|" + u;
            }

            if (this._shader) {
              var l = this.getInputData(2);
              null != l ? this.properties.value = l : l = parseFloat(this.properties.value);
              var d = this.graph.getTime();
              this._tex.drawTo(function () {
                gl.disable(gl.DEPTH_TEST), gl.disable(gl.CULL_FACE), gl.disable(gl.BLEND), t && t.bind(0), i && i.bind(1);
                var e = Mesh.getScreenQuad();
                h.uniforms({
                  u_texture: 0,
                  u_textureB: 1,
                  value: l,
                  texSize: [s, n, 1 / s, 1 / n],
                  time: d
                }).draw(e);
              }), this.setOutputData(0, this._tex);
            }
          }
        } else this.setOutputData(0, t);
      }, o.pixel_shader = "precision highp float;\n\t\t\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tvarying vec2 v_coord;\n\t\tuniform vec4 texSize;\n\t\tuniform float time;\n\t\tuniform float value;\n\t\t\n\t\tvoid main() {\n\t\t\tvec2 uv = v_coord;\n\t\t\t{{UV_CODE}};\n\t\t\tvec4 color4 = texture2D(u_texture, uv);\n\t\t\tvec3 color = color4.rgb;\n\t\t\tvec4 color4B = texture2D(u_textureB, uv);\n\t\t\tvec3 colorB = color4B.rgb;\n\t\t\tvec3 result = color;\n\t\t\tfloat alpha = 1.0;\n\t\t\t{{PIXEL_CODE}};\n\t\t\tgl_FragColor = vec4(result, alpha);\n\t\t}\n\t\t", o.registerPreset = function (t, e) {
        o.presets[t] = e;
      }, o.registerPreset("", ""), o.registerPreset("bypass", "color"), o.registerPreset("add", "color + colorB * value"), o.registerPreset("substract", "(color - colorB) * value"), o.registerPreset("mate", "mix( color, colorB, color4B.a * value)"), o.registerPreset("invert", "vec3(1.0) - color"), o.registerPreset("multiply", "color * colorB * value"), o.registerPreset("divide", "(color / colorB) / value"), o.registerPreset("difference", "abs(color - colorB) * value"), o.registerPreset("max", "max(color, colorB) * value"), o.registerPreset("min", "min(color, colorB) * value"), o.registerPreset("displace", "texture2D(u_texture, uv + (colorB.xy - vec2(0.5)) * value).xyz"), o.registerPreset("grayscale", "vec3(color.x + color.y + color.z) * value / 3.0"), o.registerPreset("saturation", "mix( vec3(color.x + color.y + color.z) / 3.0, color, value )"), o.registerPreset("normalmap", "\n\t\tfloat z0 = texture2D(u_texture, uv + vec2(-texSize.z, -texSize.w) ).x;\n\t\tfloat z1 = texture2D(u_texture, uv + vec2(0.0, -texSize.w) ).x;\n\t\tfloat z2 = texture2D(u_texture, uv + vec2(texSize.z, -texSize.w) ).x;\n\t\tfloat z3 = texture2D(u_texture, uv + vec2(-texSize.z, 0.0) ).x;\n\t\tfloat z4 = color.x;\n\t\tfloat z5 = texture2D(u_texture, uv + vec2(texSize.z, 0.0) ).x;\n\t\tfloat z6 = texture2D(u_texture, uv + vec2(-texSize.z, texSize.w) ).x;\n\t\tfloat z7 = texture2D(u_texture, uv + vec2(0.0, texSize.w) ).x;\n\t\tfloat z8 = texture2D(u_texture, uv + vec2(texSize.z, texSize.w) ).x;\n\t\tvec3 normal = vec3( z2 + 2.0*z4 + z7 - z0 - 2.0*z3 - z5, z5 + 2.0*z6 + z7 -z0 - 2.0*z1 - z2, 1.0 );\n\t\tnormal.xy *= value;\n\t\tresult.xyz = normalize(normal) * 0.5 + vec3(0.5);\n\t"), o.registerPreset("threshold", "vec3(color.x > colorB.x * value ? 1.0 : 0.0,color.y > colorB.y * value ? 1.0 : 0.0,color.z > colorB.z * value ? 1.0 : 0.0)"), o.prototype.onInspect = function (t) {
        var e = this;
        t.addCombo("Presets", "", {
          values: Object.keys(o.presets),
          callback: function (i) {
            var s = o.presets[i];
            s && (e.setProperty("pixelcode", s), e.title = i, t.refresh());
          }
        });
      }, U.registerNodeType("texture/operation", o), n.title = "Shader", n.desc = "Texture shader", n.widgets_info = {
        code: {
          type: "code",
          lang: "glsl"
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, n.prototype.onPropertyChanged = function (t, e) {
        if ("code" == t) {
          var i = this.getShader();

          if (i) {
            var s = i.uniformInfo;
            if (this.inputs) for (var o = {}, n = 0; n < this.inputs.length; ++n) {
              var r = this.getInputInfo(n);
              r && (!s[r.name] || o[r.name] ? (this.removeInput(n), n--) : o[r.name] = !0);
            }

            for (var n in s) {
              r = i.uniformInfo[n];

              if (null !== r.loc && "time" != n) {
                var a = "number";
                if (this._shader.samplers[n]) a = "texture";else switch (r.size) {
                  case 1:
                    a = "number";
                    break;

                  case 2:
                    a = "vec2";
                    break;

                  case 3:
                    a = "vec3";
                    break;

                  case 4:
                    a = "vec4";
                    break;

                  case 9:
                    a = "mat3";
                    break;

                  case 16:
                    a = "mat4";
                    break;

                  default:
                    continue;
                }
                var u = this.findInputSlot(n);

                if (-1 != u) {
                  var h = this.getInputInfo(u);

                  if (h) {
                    if (h.type == a) continue;
                    this.removeInput(u, a), this.addInput(n, a);
                  } else this.addInput(n, a);
                } else this.addInput(n, a);
              }
            }
          }
        }
      }, n.prototype.getShader = function () {
        return this._shader && this._shader_code == this.properties.code ? this._shader : (this._shader_code = this.properties.code, this._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, this.properties.code), this._shader ? (this.boxcolor = "green", this._shader) : (this.boxcolor = "red", null));
      }, n.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getShader();

          if (t) {
            var i = 0,
                s = null;
            if (this.inputs) for (var o = 0; o < this.inputs.length; ++o) {
              var n = this.getInputInfo(o),
                  r = this.getInputData(o);
              null != r && (r.constructor === GL.Texture && (r.bind(i), s || (s = r), r = i, i++), t.setUniform(n.name, r));
            }
            var a = this._uniforms,
                u = e.getTextureType(this.properties.precision, s),
                h = 0 | this.properties.width,
                p = 0 | this.properties.height;
            0 == h && (h = s ? s.width : gl.canvas.width), 0 == p && (p = s ? s.height : gl.canvas.height), a.texSize[0] = h, a.texSize[1] = p, a.texSize[2] = 1 / h, a.texSize[3] = 1 / p, a.time = this.graph.getTime(), a.u_value = this.properties.u_value, a.u_color.set(this.properties.u_color), this._tex && this._tex.type == u && this._tex.width == h && this._tex.height == p || (this._tex = new GL.Texture(h, p, {
              type: u,
              format: gl.RGBA,
              filter: gl.LINEAR
            }));
            var l = this._tex;
            l.drawTo(function () {
              t.uniforms(a).draw(GL.Mesh.getScreenQuad());
            }), this.setOutputData(0, this._tex);
          }
        }
      }, n.pixel_shader = "precision highp float;\n\nvarying vec2 v_coord;\nuniform float time; //time in seconds\nuniform vec4 texSize; //tex resolution\nuniform float u_value;\nuniform vec4 u_color;\n\nvoid main() {\n\tvec2 uv = v_coord;\n\tvec3 color = vec3(0.0);\n\t//your code here\n\tcolor.xy=uv;\n\n\tgl_FragColor = vec4(color, 1.0);\n}\n", U.registerNodeType("texture/shader", n), r.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, r.title = "Scale/Offset", r.desc = "Applies an scaling and offseting", r.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (this.isOutputConnected(0) && t) if (this.properties.precision !== e.PASS_THROUGH) {
          var i = t.width,
              s = t.height,
              o = this.precision === e.LOW ? gl.UNSIGNED_BYTE : gl.HIGH_PRECISION_FORMAT;
          this.precision === e.DEFAULT && (o = t.type), this._tex && this._tex.width == i && this._tex.height == s && this._tex.type == o || (this._tex = new GL.Texture(i, s, {
            type: o,
            format: gl.RGBA,
            filter: gl.LINEAR
          }));
          var n = this._shader;
          n || (n = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, r.pixel_shader));
          var a = this.getInputData(1);
          a ? (this.properties.scale[0] = a[0], this.properties.scale[1] = a[1]) : a = this.properties.scale;
          var u = this.getInputData(2);
          u ? (this.properties.offset[0] = u[0], this.properties.offset[1] = u[1]) : u = this.properties.offset, this._tex.drawTo(function () {
            gl.disable(gl.DEPTH_TEST), gl.disable(gl.CULL_FACE), gl.disable(gl.BLEND), t.bind(0);
            var e = Mesh.getScreenQuad();
            n.uniforms({
              u_texture: 0,
              u_scale: a,
              u_offset: u
            }).draw(e);
          }), this.setOutputData(0, this._tex);
        } else this.setOutputData(0, t);
      }, r.pixel_shader = "precision highp float;\n\t\t\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tvarying vec2 v_coord;\n\t\tuniform vec2 u_scale;\n\t\tuniform vec2 u_offset;\n\t\t\n\t\tvoid main() {\n\t\t\tvec2 uv = v_coord;\n\t\t\tuv = uv / u_scale - u_offset;\n\t\t\tgl_FragColor = texture2D(u_texture, uv);\n\t\t}\n\t\t", U.registerNodeType("texture/scaleOffset", r), a.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, a.title = "Warp", a.desc = "Texture warp operation", a.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (this.isOutputConnected(0)) if (this.properties.precision !== e.PASS_THROUGH) {
          var i = this.getInputData(1),
              s = 512,
              o = 512;
          gl.UNSIGNED_BYTE;
          t ? (s = t.width, o = t.height, t.type) : i && (s = i.width, o = i.height, i.type), t || this._tex ? this._tex = e.getTargetTexture(t || this._tex, this._tex, this.properties.precision) : this._tex = new GL.Texture(s, o, {
            type: this.precision === e.LOW ? gl.UNSIGNED_BYTE : gl.HIGH_PRECISION_FORMAT,
            format: gl.RGBA,
            filter: gl.LINEAR
          });
          var n = this._shader;
          n || (n = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, a.pixel_shader));
          var r = this.getInputData(2);
          null != r ? this.properties.factor = r : r = parseFloat(this.properties.factor);
          var u = this._uniforms;
          u.u_factor = r, u.u_scale.set(this.properties.scale), u.u_offset.set(this.properties.offset), this._tex.drawTo(function () {
            gl.disable(gl.DEPTH_TEST), gl.disable(gl.CULL_FACE), gl.disable(gl.BLEND), t && t.bind(0), i && i.bind(1);
            var e = Mesh.getScreenQuad();
            n.uniforms(u).draw(e);
          }), this.setOutputData(0, this._tex);
        } else this.setOutputData(0, t);
      }, a.pixel_shader = "precision highp float;\n\t\t\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tvarying vec2 v_coord;\n\t\tuniform float u_factor;\n\t\tuniform vec2 u_scale;\n\t\tuniform vec2 u_offset;\n\t\t\n\t\tvoid main() {\n\t\t\tvec2 uv = v_coord;\n\t\t\tuv += ( texture2D(u_textureB, uv).rg - vec2(0.5)) * u_factor * u_scale + u_offset;\n\t\t\tgl_FragColor = texture2D(u_texture, uv);\n\t\t}\n\t\t", U.registerNodeType("texture/warp", a), u.title = "to Viewport", u.desc = "Texture to viewport", u._prev_viewport = new Float32Array(4), u.prototype.onDrawBackground = function (t) {
        if (!(this.flags.collapsed || this.size[1] <= 40)) {
          var e = this.getInputData(0);
          e && t.drawImage(t == gl ? e : gl.canvas, 10, 30, this.size[0] - 20, this.size[1] - 40);
        }
      }, u.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          this.properties.disable_alpha ? gl.disable(gl.BLEND) : (gl.enable(gl.BLEND), this.properties.additive ? gl.blendFunc(gl.SRC_ALPHA, gl.ONE) : gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)), gl.disable(gl.DEPTH_TEST);
          var e = this.properties.gamma || 1;
          this.isInputConnected(1) && (e = this.getInputData(1)), t.setParameter(gl.TEXTURE_MAG_FILTER, this.properties.filter ? gl.LINEAR : gl.NEAREST);
          var i = u._prev_viewport;
          i.set(gl.viewport_data);
          var s = this.properties.viewport;
          gl.viewport(i[0] + i[2] * s[0], i[1] + i[3] * s[1], i[2] * s[2], i[3] * s[3]);
          gl.getViewport();

          if (this.properties.antialiasing) {
            u._shader || (u._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, u.aa_pixel_shader));
            var o = Mesh.getScreenQuad();
            t.bind(0), u._shader.uniforms({
              u_texture: 0,
              uViewportSize: [t.width, t.height],
              u_igamma: 1 / e,
              inverseVP: [1 / t.width, 1 / t.height]
            }).draw(o);
          } else 1 != e ? (u._gamma_shader || (u._gamma_shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, u.gamma_pixel_shader)), t.toViewport(u._gamma_shader, {
            u_texture: 0,
            u_igamma: 1 / e
          })) : t.toViewport();

          gl.viewport(i[0], i[1], i[2], i[3]);
        }
      }, u.prototype.onGetInputs = function () {
        return [["gamma", "number"]];
      }, u.aa_pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 uViewportSize;\n\t\tuniform vec2 inverseVP;\n\t\tuniform float u_igamma;\n\t\t#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n\t\t#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n\t\t#define FXAA_SPAN_MAX     8.0\n\t\t\n\t\t/* from mitsuhiko/webgl-meincraft based on the code on geeks3d.com */\n\t\tvec4 applyFXAA(sampler2D tex, vec2 fragCoord)\n\t\t{\n\t\t\tvec4 color = vec4(0.0);\n\t\t\t/*vec2 inverseVP = vec2(1.0 / uViewportSize.x, 1.0 / uViewportSize.y);*/\n\t\t\tvec3 rgbNW = texture2D(tex, (fragCoord + vec2(-1.0, -1.0)) * inverseVP).xyz;\n\t\t\tvec3 rgbNE = texture2D(tex, (fragCoord + vec2(1.0, -1.0)) * inverseVP).xyz;\n\t\t\tvec3 rgbSW = texture2D(tex, (fragCoord + vec2(-1.0, 1.0)) * inverseVP).xyz;\n\t\t\tvec3 rgbSE = texture2D(tex, (fragCoord + vec2(1.0, 1.0)) * inverseVP).xyz;\n\t\t\tvec3 rgbM  = texture2D(tex, fragCoord  * inverseVP).xyz;\n\t\t\tvec3 luma = vec3(0.299, 0.587, 0.114);\n\t\t\tfloat lumaNW = dot(rgbNW, luma);\n\t\t\tfloat lumaNE = dot(rgbNE, luma);\n\t\t\tfloat lumaSW = dot(rgbSW, luma);\n\t\t\tfloat lumaSE = dot(rgbSE, luma);\n\t\t\tfloat lumaM  = dot(rgbM,  luma);\n\t\t\tfloat lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n\t\t\tfloat lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\t\t\t\n\t\t\tvec2 dir;\n\t\t\tdir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n\t\t\tdir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\t\t\t\n\t\t\tfloat dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\t\t\t\n\t\t\tfloat rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n\t\t\tdir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) * inverseVP;\n\t\t\t\n\t\t\tvec3 rgbA = 0.5 * (texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz + \n\t\t\t\ttexture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n\t\t\tvec3 rgbB = rgbA * 0.5 + 0.25 * (texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz + \n\t\t\t\ttexture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\t\t\t\n\t\t\t//return vec4(rgbA,1.0);\n\t\t\tfloat lumaB = dot(rgbB, luma);\n\t\t\tif ((lumaB < lumaMin) || (lumaB > lumaMax))\n\t\t\t\tcolor = vec4(rgbA, 1.0);\n\t\t\telse\n\t\t\t\tcolor = vec4(rgbB, 1.0);\n\t\t\tif(u_igamma != 1.0)\n\t\t\t\tcolor.xyz = pow( color.xyz, vec3(u_igamma) );\n\t\t\treturn color;\n\t\t}\n\t\t\n\t\tvoid main() {\n\t\t   gl_FragColor = applyFXAA( u_texture, v_coord * uViewportSize) ;\n\t\t}\n\t\t", u.gamma_pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_igamma;\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D( u_texture, v_coord);\n\t\t\tcolor.xyz = pow(color.xyz, vec3(u_igamma) );\n\t\t   gl_FragColor = color;\n\t\t}\n\t\t", U.registerNodeType("texture/toviewport", u), h.title = "Copy", h.desc = "Copy Texture", h.widgets_info = {
        size: {
          widget: "combo",
          values: [0, 32, 64, 128, 256, 512, 1024, 2048]
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, h.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if ((t || this._temp_texture) && this.isOutputConnected(0)) {
          if (t) {
            var i = t.width,
                s = t.height;
            0 != this.properties.size && (i = this.properties.size, s = this.properties.size);
            var o = this._temp_texture,
                n = t.type;

            if (this.properties.precision === e.LOW ? n = gl.UNSIGNED_BYTE : this.properties.precision === e.HIGH && (n = gl.HIGH_PRECISION_FORMAT), !o || o.width != i || o.height != s || o.type != n) {
              var r = gl.LINEAR;
              this.properties.generate_mipmaps && isPowerOfTwo(i) && isPowerOfTwo(s) && (r = gl.LINEAR_MIPMAP_LINEAR), this._temp_texture = new GL.Texture(i, s, {
                type: n,
                format: gl.RGBA,
                minFilter: r,
                magFilter: gl.LINEAR
              });
            }

            t.copyTo(this._temp_texture), this.properties.generate_mipmaps && (this._temp_texture.bind(0), gl.generateMipmap(this._temp_texture.texture_type), this._temp_texture.unbind(0));
          }

          this.setOutputData(0, this._temp_texture);
        }
      }, U.registerNodeType("texture/copy", h), p.title = "Downsample", p.desc = "Downsample Texture", p.widgets_info = {
        iterations: {
          type: "number",
          step: 1,
          precision: 0,
          min: 0
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, p.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if ((t || this._temp_texture) && this.isOutputConnected(0) && t && t.texture_type === GL.TEXTURE_2D) if (this.properties.iterations < 1) this.setOutputData(0, t);else {
          var i = p._shader;
          i || (p._shader = i = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, p.pixel_shader));
          var s = 0 | t.width,
              o = 0 | t.height,
              n = t.type;
          this.properties.precision === e.LOW ? n = gl.UNSIGNED_BYTE : this.properties.precision === e.HIGH && (n = gl.HIGH_PRECISION_FORMAT);
          var r = this.properties.iterations || 1,
              a = t,
              u = null,
              h = [],
              l = {
            type: n,
            format: t.format
          },
              d = vec2.create(),
              c = {
            u_offset: d
          };
          this._texture && GL.Texture.releaseTemporary(this._texture);

          for (var _ = 0; _ < r && (d[0] = 1 / s, d[1] = 1 / o, s = s >> 1 || 0, o = o >> 1 || 0, u = GL.Texture.getTemporary(s, o, l), h.push(u), a.setParameter(GL.TEXTURE_MAG_FILTER, GL.NEAREST), a.copyTo(u, i, c), 1 != s || 1 != o); ++_) a = u;

          this._texture = h.pop();

          for (_ = 0; _ < h.length; ++_) GL.Texture.releaseTemporary(h[_]);

          this.properties.generate_mipmaps && (this._texture.bind(0), gl.generateMipmap(this._texture.texture_type), this._texture.unbind(0)), this.setOutputData(0, this._texture);
        }
      }, p.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 u_offset;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D(u_texture, v_coord );\n\t\t\tcolor += texture2D(u_texture, v_coord + vec2( u_offset.x, 0.0 ) );\n\t\t\tcolor += texture2D(u_texture, v_coord + vec2( 0.0, u_offset.y ) );\n\t\t\tcolor += texture2D(u_texture, v_coord + vec2( u_offset.x, u_offset.y ) );\n\t\t   gl_FragColor = color * 0.25;\n\t\t}\n\t\t", U.registerNodeType("texture/downsample", p), l.title = "Resize", l.desc = "Resize Texture", l.widgets_info = {
        iterations: {
          type: "number",
          step: 1,
          precision: 0,
          min: 0
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, l.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if ((t || this._temp_texture) && this.isOutputConnected(0) && t && t.texture_type === GL.TEXTURE_2D) {
          var i = 0 | this.properties.size[0],
              s = 0 | this.properties.size[1];
          0 == i && (i = t.width), 0 == s && (s = t.height);
          var o = t.type;
          this.properties.precision === e.LOW ? o = gl.UNSIGNED_BYTE : this.properties.precision === e.HIGH && (o = gl.HIGH_PRECISION_FORMAT), this._texture && this._texture.width == i && this._texture.height == s && this._texture.type == o || (this._texture = new GL.Texture(i, s, {
            type: o
          })), t.copyTo(this._texture), this.properties.generate_mipmaps && (this._texture.bind(0), gl.generateMipmap(this._texture.texture_type), this._texture.unbind(0)), this.setOutputData(0, this._texture);
        }
      }, U.registerNodeType("texture/resize", l), d.title = "Average", d.desc = "Compute a partial average (32 random samples) of a texture and stores it as a 1x1 pixel texture.\n If high_quality is true, then it generates the mipmaps first and reads from the lower one.", d.prototype.onExecute = function () {
        this.properties.use_previous_frame || this.updateAverage();
        var t = this._luminance;
        this.setOutputData(0, this._temp_texture), this.setOutputData(1, t), this.setOutputData(2, (t[0] + t[1] + t[2]) / 3);
      }, d.prototype.onPreRenderExecute = function () {
        this.updateAverage();
      }, d.prototype.updateAverage = function () {
        var t = this.getInputData(0);

        if (t && (this.isOutputConnected(0) || this.isOutputConnected(1) || this.isOutputConnected(2))) {
          if (!d._shader) {
            d._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, d.pixel_shader);

            for (var e = new Float32Array(16), i = 0; i < e.length; ++i) e[i] = Math.random();

            d._shader.uniforms({
              u_samples_a: e.subarray(0, 16),
              u_samples_b: e.subarray(16, 32)
            });
          }

          var s = this._temp_texture,
              o = gl.UNSIGNED_BYTE;
          t.type != o && (o = gl.FLOAT), s && s.type == o || (this._temp_texture = new GL.Texture(1, 1, {
            type: o,
            format: gl.RGBA,
            filter: gl.NEAREST
          })), this._uniforms.u_mipmap_offset = 0, this.properties.high_quality && (this._temp_pot2_texture && this._temp_pot2_texture.type == o || (this._temp_pot2_texture = new GL.Texture(512, 512, {
            type: o,
            format: gl.RGBA,
            minFilter: gl.LINEAR_MIPMAP_LINEAR,
            magFilter: gl.LINEAR
          })), t.copyTo(this._temp_pot2_texture), t = this._temp_pot2_texture, t.bind(0), gl.generateMipmap(GL.TEXTURE_2D), this._uniforms.u_mipmap_offset = 9);
          var n = d._shader,
              r = this._uniforms;

          if (r.u_mipmap_offset = this.properties.mipmap_offset, gl.disable(gl.DEPTH_TEST), gl.disable(gl.BLEND), this._temp_texture.drawTo(function () {
            t.toViewport(n, r);
          }), this.isOutputConnected(1) || this.isOutputConnected(2)) {
            var a = this._temp_texture.getPixels();

            if (a) {
              var u = this._luminance;
              o = this._temp_texture.type;
              u.set(a), o == gl.UNSIGNED_BYTE ? vec4.scale(u, u, 1 / 255) : o == GL.HALF_FLOAT || GL.HALF_FLOAT_OES;
            }
          }
        }
      }, d.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform mat4 u_samples_a;\n\t\tuniform mat4 u_samples_b;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_mipmap_offset;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = vec4(0.0);\n\t\t\t//random average\n\t\t\tfor(int i = 0; i < 4; ++i)\n\t\t\t\tfor(int j = 0; j < 4; ++j)\n\t\t\t\t{\n\t\t\t\t\tcolor += texture2D(u_texture, vec2( u_samples_a[i][j], u_samples_b[i][j] ), u_mipmap_offset );\n\t\t\t\t\tcolor += texture2D(u_texture, vec2( 1.0 - u_samples_a[i][j], 1.0 - u_samples_b[i][j] ), u_mipmap_offset );\n\t\t\t\t}\n\t\t   gl_FragColor = color * 0.03125;\n\t\t}\n\t\t", U.registerNodeType("texture/average", d), c.widgets_info = {
        mode: {
          widget: "combo",
          values: ["min", "max", "avg"]
        }
      }, c.title = "MinMax", c.desc = "Compute the scene min max", c.prototype.onExecute = function () {
        this.properties.use_previous_frame || this.update(), this.setOutputData(0, this._temp_texture), this.setOutputData(1, this._luminance);
      }, c.prototype.onPreRenderExecute = function () {
        this.update();
      }, c.prototype.update = function () {
        var t = this.getInputData(0);

        if (t && (this.isOutputConnected(0) || this.isOutputConnected(1))) {
          c._shader || (c._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, c.pixel_shader));
          this._temp_texture;
          var e = gl.UNSIGNED_BYTE;
          t.type != e && (e = gl.FLOAT);
          var i = 512;
          if (!this._textures_chain.length || this._textures_chain[0].type != e) for (; s && (this._textures_chain[s] = new GL.Texture(i, i, {
            type: e,
            format: gl.RGBA,
            filter: gl.NEAREST
          }), i >>= 2, s++, 1 != i););
          t.copyTo(this._textures_chain[0]);
          this._textures_chain[0];

          for (var s = 1; s <= this._textures_chain.length; ++s) {
            t = this._textures_chain[s];
            t;
          }

          var o = c._shader,
              n = this._uniforms;
          n.u_mipmap_offset = this.properties.mipmap_offset, gl.disable(gl.DEPTH_TEST), gl.disable(gl.BLEND), this._temp_texture.drawTo(function () {
            t.toViewport(o, n);
          });
        }
      }, c.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform mat4 u_samples_a;\n\t\tuniform mat4 u_samples_b;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_mipmap_offset;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = vec4(0.0);\n\t\t\t//random average\n\t\t\tfor(int i = 0; i < 4; ++i)\n\t\t\t\tfor(int j = 0; j < 4; ++j)\n\t\t\t\t{\n\t\t\t\t\tcolor += texture2D(u_texture, vec2( u_samples_a[i][j], u_samples_b[i][j] ), u_mipmap_offset );\n\t\t\t\t\tcolor += texture2D(u_texture, vec2( 1.0 - u_samples_a[i][j], 1.0 - u_samples_b[i][j] ), u_mipmap_offset );\n\t\t\t\t}\n\t\t   gl_FragColor = color * 0.03125;\n\t\t}\n\t\t", _.title = "Smooth", _.desc = "Smooth texture over time", _.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t && this.isOutputConnected(0)) {
          _._shader || (_._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, _.pixel_shader));
          var e = this._temp_texture;

          if (!e || e.type != t.type || e.width != t.width || e.height != t.height) {
            var i = {
              type: t.type,
              format: gl.RGBA,
              filter: gl.NEAREST
            };
            this._temp_texture = new GL.Texture(t.width, t.height, i), this._temp_texture2 = new GL.Texture(t.width, t.height, i), t.copyTo(this._temp_texture2);
          }

          var s = this._temp_texture,
              o = this._temp_texture2,
              n = _._shader,
              r = this._uniforms;
          r.u_factor = 1 - this.getInputOrProperty("factor"), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST), s.drawTo(function () {
            o.bind(1), t.toViewport(n, r);
          }), this.setOutputData(0, s), this._temp_texture = o, this._temp_texture2 = s;
        }
      }, _.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform float u_factor;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tgl_FragColor = mix( texture2D( u_texture, v_coord ), texture2D( u_textureB, v_coord ), u_factor );\n\t\t}\n\t\t", U.registerNodeType("texture/temporal_smooth", _), g.title = "Lineal Avg Smooth", g.desc = "Smooth texture linearly over time", g["@samples"] = {
        type: "number",
        min: 1,
        max: 64,
        step: 1,
        precision: 1
      }, g.prototype.getPreviewTexture = function () {
        return this._temp_texture2;
      }, g.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t && this.isOutputConnected(0)) {
          g._shader || (g._shader_copy = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, g.pixel_shader_copy), g._shader_avg = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, g.pixel_shader_avg));
          var e = Math.clamp(this.properties.samples, 0, 64),
              i = this.frame,
              s = this.properties.frames_interval;

          if (0 == s || i % s == 0) {
            var o = this._temp_texture;

            if (!o || o.type != t.type || o.width != e) {
              var n = {
                type: t.type,
                format: gl.RGBA,
                filter: gl.NEAREST
              };
              this._temp_texture = new GL.Texture(e, 1, n), this._temp_texture2 = new GL.Texture(e, 1, n), this._temp_texture_out = new GL.Texture(1, 1, n);
            }

            var r = this._temp_texture,
                a = this._temp_texture2,
                u = g._shader_copy,
                h = g._shader_avg,
                p = this._uniforms;
            p.u_samples = e, p.u_isamples = 1 / e, gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST), r.drawTo(function () {
              a.bind(1), t.toViewport(u, p);
            }), this._temp_texture_out.drawTo(function () {
              r.toViewport(h, p);
            }), this.setOutputData(0, this._temp_texture_out), this._temp_texture = a, this._temp_texture2 = r;
          } else this.setOutputData(0, this._temp_texture_out);

          this.setOutputData(1, this._temp_texture2), this.frame++;
        }
      }, g.pixel_shader_copy = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform float u_isamples;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tif( v_coord.x <= u_isamples )\n\t\t\t\tgl_FragColor = texture2D( u_texture, vec2(0.5) );\n\t\t\telse\n\t\t\t\tgl_FragColor = texture2D( u_textureB, v_coord - vec2(u_isamples,0.0) );\n\t\t}\n\t\t", g.pixel_shader_avg = "precision highp float;\n\t\tprecision highp float;\n\t\tuniform sampler2D u_texture;\n\t\tuniform int u_samples;\n\t\tuniform float u_isamples;\n\t\tvarying vec2 v_coord;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = vec4(0.0);\n\t\t\tfor(int i = 0; i < 64; ++i)\n\t\t\t{\n\t\t\t\tcolor += texture2D( u_texture, vec2( float(i)*u_isamples,0.0) );\n\t\t\t\tif(i == (u_samples - 1))\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\tgl_FragColor = color * u_isamples;\n\t\t}\n\t\t", U.registerNodeType("texture/linear_avg_smooth", g), f.title = "Image to Texture", f.desc = "Uploads an image to the GPU", f.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          var e = t.videoWidth || t.width,
              i = t.videoHeight || t.height;
          if (t.gltexture) this.setOutputData(0, t.gltexture);else {
            var s = this._temp_texture;
            s && s.width == e && s.height == i || (this._temp_texture = new GL.Texture(e, i, {
              format: gl.RGBA,
              filter: gl.LINEAR
            }));

            try {
              this._temp_texture.uploadImage(t);
            } catch (t) {
              return void console.error("image comes from an unsafe location, cannot be uploaded to webgl: " + t);
            }

            this.setOutputData(0, this._temp_texture);
          }
        }
      }, U.registerNodeType("texture/imageToTexture", f), v.widgets_info = {
        texture: {
          widget: "texture"
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, v.title = "LUT", v.desc = "Apply LUT to Texture", v.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0);

          if (this.properties.precision !== e.PASS_THROUGH && !1 !== this.properties.enabled) {
            if (t) {
              var i = this.getInputData(1);

              if (i || (i = e.getTexture(this.properties.texture)), i) {
                i.bind(0), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.bindTexture(gl.TEXTURE_2D, null);
                var s = this.properties.intensity;
                this.isInputConnected(2) && (this.properties.intensity = s = this.getInputData(2)), this._tex = e.getTargetTexture(t, this._tex, this.properties.precision), this._tex.drawTo(function () {
                  i.bind(1), t.toViewport(v._shader, {
                    u_texture: 0,
                    u_textureB: 1,
                    u_amount: s
                  });
                }), this.setOutputData(0, this._tex);
              } else this.setOutputData(0, t);
            }
          } else this.setOutputData(0, t);
        }
      }, v.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform float u_amount;\n\t\t\n\t\tvoid main() {\n\t\t\t lowp vec4 textureColor = clamp( texture2D(u_texture, v_coord), vec4(0.0), vec4(1.0) );\n\t\t\t mediump float blueColor = textureColor.b * 63.0;\n\t\t\t mediump vec2 quad1;\n\t\t\t quad1.y = floor(floor(blueColor) / 8.0);\n\t\t\t quad1.x = floor(blueColor) - (quad1.y * 8.0);\n\t\t\t mediump vec2 quad2;\n\t\t\t quad2.y = floor(ceil(blueColor) / 8.0);\n\t\t\t quad2.x = ceil(blueColor) - (quad2.y * 8.0);\n\t\t\t highp vec2 texPos1;\n\t\t\t texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);\n\t\t\t texPos1.y = 1.0 - ((quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g));\n\t\t\t highp vec2 texPos2;\n\t\t\t texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);\n\t\t\t texPos2.y = 1.0 - ((quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g));\n\t\t\t lowp vec4 newColor1 = texture2D(u_textureB, texPos1);\n\t\t\t lowp vec4 newColor2 = texture2D(u_textureB, texPos2);\n\t\t\t lowp vec4 newColor = mix(newColor1, newColor2, fract(blueColor));\n\t\t\t gl_FragColor = vec4( mix( textureColor.rgb, newColor.rgb, u_amount), textureColor.w);\n\t\t}\n\t\t", U.registerNodeType("texture/LUT", v), m.widgets_info = {
        texture: {
          widget: "texture"
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, m.title = "Encode", m.desc = "Apply a texture atlas to encode a texture", m.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0);

          if (this.properties.precision !== e.PASS_THROUGH && !1 !== this.properties.enabled) {
            if (t) {
              var i = this.getInputData(1);

              if (i || (i = e.getTexture(this.properties.texture)), i) {
                i.bind(0), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.properties.filter ? gl.LINEAR : gl.NEAREST), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.properties.filter ? gl.LINEAR : gl.NEAREST), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.bindTexture(gl.TEXTURE_2D, null);
                var s = this._uniforms;
                s.u_row_simbols = Math.floor(this.properties.num_row_symbols), s.u_symbol_size = this.properties.symbol_size, s.u_brightness = this.properties.brightness, s.u_invert = this.properties.invert ? 1 : 0, s.u_colorize = this.properties.colorize ? 1 : 0, this._tex = e.getTargetTexture(t, this._tex, this.properties.precision), s.u_res[0] = this._tex.width, s.u_res[1] = this._tex.height, this._tex.bind(0), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST), this._tex.drawTo(function () {
                  i.bind(1), t.toViewport(m._shader, s);
                }), this.properties.generate_mipmaps && (this._tex.bind(0), gl.generateMipmap(this._tex.texture_type), this._tex.unbind(0)), this.setOutputData(0, this._tex);
              } else this.setOutputData(0, t);
            }
          } else this.setOutputData(0, t);
        }
      }, m.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform float u_row_simbols;\n\t\tuniform float u_symbol_size;\n\t\tuniform float u_brightness;\n\t\tuniform float u_invert;\n\t\tuniform float u_colorize;\n\t\tuniform vec2 u_res;\n\t\t\n\t\tvoid main() {\n\t\t\tvec2 total_symbols = u_res / u_symbol_size;\n\t\t\tvec2 uv = floor(v_coord * total_symbols) / total_symbols; //pixelate \n\t\t\tvec2 local_uv = mod(v_coord * u_res, u_symbol_size) / u_symbol_size;\n\t\t\tlowp vec4 textureColor = texture2D(u_texture, uv );\n\t\t\tfloat lum = clamp(u_brightness * (textureColor.x + textureColor.y + textureColor.z)/3.0,0.0,1.0);\n\t\t\tif( u_invert == 1.0 ) lum = 1.0 - lum;\n\t\t\tfloat index = floor( lum * (u_row_simbols * u_row_simbols - 1.0));\n\t\t\tfloat col = mod( index, u_row_simbols );\n\t\t\tfloat row = u_row_simbols - floor( index / u_row_simbols ) - 1.0;\n\t\t\tvec2 simbol_uv = ( vec2( col, row ) + local_uv ) / u_row_simbols;\n\t\t\tvec4 color = texture2D( u_textureB, simbol_uv );\n\t\t\tif(u_colorize == 1.0)\n\t\t\t\tcolor *= textureColor;\n\t\t\tgl_FragColor = color;\n\t\t}\n\t\t", U.registerNodeType("texture/encode", m), y.title = "Texture to Channels", y.desc = "Split texture channels", y.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          this._channels || (this._channels = Array(4));

          for (var e = gl.RGB, i = 0, s = 0; s < 4; s++) this.isOutputConnected(s) ? (this._channels[s] && this._channels[s].width == t.width && this._channels[s].height == t.height && this._channels[s].type == t.type && this._channels[s].format == e || (this._channels[s] = new GL.Texture(t.width, t.height, {
            type: t.type,
            format: e,
            filter: gl.LINEAR
          })), i++) : this._channels[s] = null;

          if (i) {
            gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
            var o = Mesh.getScreenQuad(),
                n = y._shader,
                r = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

            for (s = 0; s < 4; s++) this._channels[s] && (this._channels[s].drawTo(function () {
              t.bind(0), n.uniforms({
                u_texture: 0,
                u_mask: r[s]
              }).draw(o);
            }), this.setOutputData(s, this._channels[s]));
          }
        }
      }, y.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec4 u_mask;\n\t\t\n\t\tvoid main() {\n\t\t   gl_FragColor = vec4( vec3( length( texture2D(u_texture, v_coord) * u_mask )), 1.0 );\n\t\t}\n\t\t", U.registerNodeType("texture/textureChannels", y), x.title = "Channels to Texture", x.desc = "Split texture channels", x.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, x.prototype.onExecute = function () {
        var t = e.getWhiteTexture(),
            i = this.getInputData(0) || t,
            s = this.getInputData(1) || t,
            o = this.getInputData(2) || t,
            n = this.getInputData(3) || t;
        gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
        var r = Mesh.getScreenQuad();
        x._shader || (x._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, x.pixel_shader));
        var a = x._shader,
            u = Math.max(i.width, s.width, o.width, n.width),
            h = Math.max(i.height, s.height, o.height, n.height),
            p = this.properties.precision == e.HIGH ? e.HIGH_PRECISION_FORMAT : gl.UNSIGNED_BYTE;
        this._texture && this._texture.width == u && this._texture.height == h && this._texture.type == p || (this._texture = new GL.Texture(u, h, {
          type: p,
          format: gl.RGBA,
          filter: gl.LINEAR
        }));
        var l = this._color;
        l[0] = this.properties.R, l[1] = this.properties.G, l[2] = this.properties.B, l[3] = this.properties.A;
        var d = this._uniforms;
        this._texture.drawTo(function () {
          i.bind(0), s.bind(1), o.bind(2), n.bind(3), a.uniforms(d).draw(r);
        }), this.setOutputData(0, this._texture);
      }, x.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_textureR;\n\t\tuniform sampler2D u_textureG;\n\t\tuniform sampler2D u_textureB;\n\t\tuniform sampler2D u_textureA;\n\t\tuniform vec4 u_color;\n\t\t\n\t\tvoid main() {\n\t\t   gl_FragColor = u_color * vec4( \t\t\t\t\ttexture2D(u_textureR, v_coord).r,\t\t\t\t\ttexture2D(u_textureG, v_coord).r,\t\t\t\t\ttexture2D(u_textureB, v_coord).r,\t\t\t\t\ttexture2D(u_textureA, v_coord).r);\n\t\t}\n\t\t", U.registerNodeType("texture/channelsTexture", x), b.title = "Color", b.desc = "Generates a 1x1 texture with a constant color", b.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, b.prototype.onDrawBackground = function (t) {
        var e = this.properties.color;
        t.fillStyle = "rgb(" + Math.floor(255 * Math.clamp(e[0], 0, 1)) + "," + Math.floor(255 * Math.clamp(e[1], 0, 1)) + "," + Math.floor(255 * Math.clamp(e[2], 0, 1)) + ")", this.flags.collapsed ? this.boxcolor = t.fillStyle : t.fillRect(0, 0, this.size[0], this.size[1]);
      }, b.prototype.onExecute = function () {
        var t = this.properties.precision == e.HIGH ? e.HIGH_PRECISION_FORMAT : gl.UNSIGNED_BYTE;
        this._tex && this._tex.type == t || (this._tex = new GL.Texture(1, 1, {
          format: gl.RGBA,
          type: t,
          minFilter: gl.NEAREST
        }));
        var i = this.properties.color;
        if (this.inputs) for (var s = 0; s < this.inputs.length; s++) {
          var o = this.inputs[s],
              n = this.getInputData(s);
          if (void 0 !== n) switch (o.name) {
            case "RGB":
            case "RGBA":
              i.set(n);
              break;

            case "R":
              i[0] = n;
              break;

            case "G":
              i[1] = n;
              break;

            case "B":
              i[2] = n;
              break;

            case "A":
              i[3] = n;
          }
        }
        vec4.sqrDist(this._tex_color, i) > .001 && (this._tex_color.set(i), this._tex.fill(i)), this.setOutputData(0, this._tex);
      }, b.prototype.onGetInputs = function () {
        return [["RGB", "vec3"], ["RGBA", "vec4"], ["R", "number"], ["G", "number"], ["B", "number"], ["A", "number"]];
      }, U.registerNodeType("texture/color", b), T.title = "Gradient", T.desc = "Generates a gradient", T["@A"] = {
        type: "color"
      }, T["@B"] = {
        type: "color"
      }, T["@texture_size"] = {
        type: "enum",
        values: [32, 64, 128, 256, 512]
      }, T.prototype.onExecute = function () {
        gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
        var t = GL.Mesh.getScreenQuad(),
            e = T._shader,
            i = this.getInputData(0);
        i || (i = this.properties.A);
        var s = this.getInputData(1);
        s || (s = this.properties.B);

        for (var o = 2; o < this.inputs.length; o++) {
          var n = this.inputs[o],
              r = this.getInputData(o);
          void 0 !== r && (this.properties[n.name] = r);
        }

        var a = this._uniforms;
        this._uniforms.u_angle = this.properties.angle * DEG2RAD, this._uniforms.u_scale = this.properties.scale, vec3.copy(a.u_colorA, i), vec3.copy(a.u_colorB, s);
        var u = parseInt(this.properties.texture_size);
        this._tex && this._tex.width == u || (this._tex = new GL.Texture(u, u, {
          format: gl.RGB,
          filter: gl.LINEAR
        })), this._tex.drawTo(function () {
          e.uniforms(a).draw(t);
        }), this.setOutputData(0, this._tex);
      }, T.prototype.onGetInputs = function () {
        return [["angle", "number"], ["scale", "number"]];
      }, T.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform float u_angle;\n\t\tuniform float u_scale;\n\t\tuniform vec3 u_colorA;\n\t\tuniform vec3 u_colorB;\n\t\t\n\t\tvec2 rotate(vec2 v, float angle)\n\t\t{\n\t\t\tvec2 result;\n\t\t\tfloat _cos = cos(angle);\n\t\t\tfloat _sin = sin(angle);\n\t\t\tresult.x = v.x * _cos - v.y * _sin;\n\t\t\tresult.y = v.x * _sin + v.y * _cos;\n\t\t\treturn result;\n\t\t}\n\t\tvoid main() {\n\t\t\tfloat f = (rotate(u_scale * (v_coord - vec2(0.5)), u_angle) + vec2(0.5)).x;\n\t\t\tvec3 color = mix(u_colorA,u_colorB,clamp(f,0.0,1.0));\n\t\t   gl_FragColor = vec4(color,1.0);\n\t\t}\n\t\t", U.registerNodeType("texture/gradient", T), E.title = "Mix", E.desc = "Generates a texture mixing two textures", E.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, E.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (this.isOutputConnected(0)) if (this.properties.precision !== e.PASS_THROUGH) {
          var i = this.getInputData(1);

          if (t && i) {
            var s = this.getInputData(2),
                o = this.getInputData(3);
            this._tex = e.getTargetTexture(this.properties.size_from_biggest && i.width > t.width ? i : t, this._tex, this.properties.precision), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
            var n = Mesh.getScreenQuad(),
                r = null,
                a = this._uniforms;
            if (s) r = E._shader_tex, r || (r = E._shader_tex = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, E.pixel_shader, {
              MIX_TEX: ""
            }));else {
              r = E._shader_factor, r || (r = E._shader_factor = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, E.pixel_shader));
              var u = null == o ? this.properties.factor : o;
              a.u_mix.set([u, u, u, u]);
            }
            var h = this.properties.invert;
            this._tex.drawTo(function () {
              t.bind(h ? 1 : 0), i.bind(h ? 0 : 1), s && s.bind(2), r.uniforms(a).draw(n);
            }), this.setOutputData(0, this._tex);
          }
        } else this.setOutputData(0, t);
      }, E.prototype.onGetInputs = function () {
        return [["factor", "number"]];
      }, E.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_textureA;\n\t\tuniform sampler2D u_textureB;\n\t\t#ifdef MIX_TEX\n\t\t\tuniform sampler2D u_textureMix;\n\t\t#else\n\t\t\tuniform vec4 u_mix;\n\t\t#endif\n\t\t\n\t\tvoid main() {\n\t\t\t#ifdef MIX_TEX\n\t\t\t   vec4 f = texture2D(u_textureMix, v_coord);\n\t\t\t#else\n\t\t\t   vec4 f = u_mix;\n\t\t\t#endif\n\t\t   gl_FragColor = mix( texture2D(u_textureA, v_coord), texture2D(u_textureB, v_coord), f );\n\t\t}\n\t\t", U.registerNodeType("texture/mix", E), w.title = "Edges", w.desc = "Detects edges", w.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, w.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0);

          if (this.properties.precision !== e.PASS_THROUGH) {
            if (t) {
              this._tex = e.getTargetTexture(t, this._tex, this.properties.precision), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
              var i = Mesh.getScreenQuad(),
                  s = w._shader,
                  o = this.properties.invert,
                  n = this.properties.factor,
                  r = this.properties.threshold ? 1 : 0;
              this._tex.drawTo(function () {
                t.bind(0), s.uniforms({
                  u_texture: 0,
                  u_isize: [1 / t.width, 1 / t.height],
                  u_factor: n,
                  u_threshold: r,
                  u_invert: o ? 1 : 0
                }).draw(i);
              }), this.setOutputData(0, this._tex);
            }
          } else this.setOutputData(0, t);
        }
      }, w.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 u_isize;\n\t\tuniform int u_invert;\n\t\tuniform float u_factor;\n\t\tuniform float u_threshold;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 center = texture2D(u_texture, v_coord);\n\t\t\tvec4 up = texture2D(u_texture, v_coord + u_isize * vec2(0.0,1.0) );\n\t\t\tvec4 down = texture2D(u_texture, v_coord + u_isize * vec2(0.0,-1.0) );\n\t\t\tvec4 left = texture2D(u_texture, v_coord + u_isize * vec2(1.0,0.0) );\n\t\t\tvec4 right = texture2D(u_texture, v_coord + u_isize * vec2(-1.0,0.0) );\n\t\t\tvec4 diff = abs(center - up) + abs(center - down) + abs(center - left) + abs(center - right);\n\t\t\tdiff *= u_factor;\n\t\t\tif(u_invert == 1)\n\t\t\t\tdiff.xyz = vec3(1.0) - diff.xyz;\n\t\t\tif( u_threshold == 0.0 )\n\t\t\t\tgl_FragColor = vec4( diff.xyz, center.a );\n\t\t\telse\n\t\t\t\tgl_FragColor = vec4( diff.x > 0.5 ? 1.0 : 0.0, diff.y > 0.5 ? 1.0 : 0.0, diff.z > 0.5 ? 1.0 : 0.0, center.a );\n\t\t}\n\t\t", U.registerNodeType("texture/edges", w), O.title = "Depth Range", O.desc = "Generates a texture with a depth range", O.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0);

          if (t) {
            var e = gl.UNSIGNED_BYTE;
            this.properties.high_precision && (e = gl.half_float_ext ? gl.HALF_FLOAT_OES : gl.FLOAT), this._temp_texture && this._temp_texture.type == e && this._temp_texture.width == t.width && this._temp_texture.height == t.height || (this._temp_texture = new GL.Texture(t.width, t.height, {
              type: e,
              format: gl.RGBA,
              filter: gl.LINEAR
            }));
            var i = this._uniforms,
                s = this.properties.distance;
            this.isInputConnected(1) && (s = this.getInputData(1), this.properties.distance = s);
            var o = this.properties.range;
            this.isInputConnected(2) && (o = this.getInputData(2), this.properties.range = o), i.u_distance = s, i.u_range = o, gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
            var n = Mesh.getScreenQuad();
            O._shader || (O._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, O.pixel_shader), O._shader_onlydepth = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, O.pixel_shader, {
              ONLY_DEPTH: ""
            }));
            var r = this.properties.only_depth ? O._shader_onlydepth : O._shader,
                a = null;
            a = t.near_far_planes ? t.near_far_planes : window.LS && LS.Renderer._main_camera ? LS.Renderer._main_camera._uniforms.u_camera_planes : [.1, 1e3], i.u_camera_planes = a, this._temp_texture.drawTo(function () {
              t.bind(0), r.uniforms(i).draw(n);
            }), this._temp_texture.near_far_planes = a, this.setOutputData(0, this._temp_texture);
          }
        }
      }, O.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 u_camera_planes;\n\t\tuniform float u_distance;\n\t\tuniform float u_range;\n\t\t\n\t\tfloat LinearDepth()\n\t\t{\n\t\t\tfloat zNear = u_camera_planes.x;\n\t\t\tfloat zFar = u_camera_planes.y;\n\t\t\tfloat depth = texture2D(u_texture, v_coord).x;\n\t\t\tdepth = depth * 2.0 - 1.0;\n\t\t\treturn zNear * (depth + 1.0) / (zFar + zNear - depth * (zFar - zNear));\n\t\t}\n\t\t\n\t\tvoid main() {\n\t\t\tfloat depth = LinearDepth();\n\t\t\t#ifdef ONLY_DEPTH\n\t\t\t   gl_FragColor = vec4(depth);\n\t\t\t#else\n\t\t\t\tfloat diff = abs(depth * u_camera_planes.y - u_distance);\n\t\t\t\tfloat dof = 1.0;\n\t\t\t\tif(diff <= u_range)\n\t\t\t\t\tdof = diff / u_range;\n\t\t\t   gl_FragColor = vec4(dof);\n\t\t\t#endif\n\t\t}\n\t\t", U.registerNodeType("texture/depth_range", O), I.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, I.title = "Linear Depth", I.desc = "Creates a color texture with linear depth", I.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0);

          if (t && (t.format == gl.DEPTH_COMPONENT || t.format == gl.DEPTH_STENCIL)) {
            var i = this.properties.precision == e.HIGH ? gl.HIGH_PRECISION_FORMAT : gl.UNSIGNED_BYTE;
            this._temp_texture && this._temp_texture.type == i && this._temp_texture.width == t.width && this._temp_texture.height == t.height || (this._temp_texture = new GL.Texture(t.width, t.height, {
              type: i,
              format: gl.RGB,
              filter: gl.LINEAR
            }));
            var s = this._uniforms;
            s.u_invert = this.properties.invert ? 1 : 0, gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
            var o = Mesh.getScreenQuad();
            I._shader || (I._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, I.pixel_shader));
            var n = I._shader,
                r = null;
            r = t.near_far_planes ? t.near_far_planes : window.LS && LS.Renderer._main_camera ? LS.Renderer._main_camera._uniforms.u_camera_planes : [.1, 1e3], s.u_camera_planes = r, s.u_ires.set([0, 0]), this._temp_texture.drawTo(function () {
              t.bind(0), n.uniforms(s).draw(o);
            }), this._temp_texture.near_far_planes = r, this.setOutputData(0, this._temp_texture);
          }
        }
      }, I.pixel_shader = "precision highp float;\n\t\tprecision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec2 u_camera_planes;\n\t\tuniform int u_invert;\n\t\tuniform vec2 u_ires;\n\t\t\n\t\tvoid main() {\n\t\t\tfloat zNear = u_camera_planes.x;\n\t\t\tfloat zFar = u_camera_planes.y;\n\t\t\tfloat depth = texture2D(u_texture, v_coord + u_ires*0.5).x * 2.0 - 1.0;\n\t\t\tfloat f = zNear * (depth + 1.0) / (zFar + zNear - depth * (zFar - zNear));\n\t\t\tif( u_invert == 1 )\n\t\t\t\tf = 1.0 - f;\n\t\t\tgl_FragColor = vec4(vec3(f),1.0);\n\t\t}\n\t\t", U.registerNodeType("texture/linear_depth", I), D.title = "Blur", D.desc = "Blur a texture", D.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, D.max_iterations = 20, D.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t && this.isOutputConnected(0)) {
          var e = this._final_texture;
          e && e.width == t.width && e.height == t.height && e.type == t.type || (e = this._final_texture = new GL.Texture(t.width, t.height, {
            type: t.type,
            format: gl.RGBA,
            filter: gl.LINEAR
          }));
          var i = this.properties.iterations;

          if (this.isInputConnected(1) && (i = this.getInputData(1), this.properties.iterations = i), i = Math.min(Math.floor(i), D.max_iterations), 0 != i) {
            var s = this.properties.intensity;
            this.isInputConnected(2) && (s = this.getInputData(2), this.properties.intensity = s);
            var o = U.camera_aspect;
            o || void 0 === window.gl || (o = gl.canvas.height / gl.canvas.width), o || (o = 1), o = this.properties.preserve_aspect ? o : 1;
            var n = this.properties.scale || [1, 1];
            t.applyBlur(o * n[0], n[1], s, e);

            for (var r = 1; r < i; ++r) e.applyBlur(o * n[0] * (r + 1), n[1] * (r + 1), s);

            this.setOutputData(0, e);
          } else this.setOutputData(0, t);
        }
      }, U.registerNodeType("texture/blur", D), N.prototype.applyFX = function (t, e, i, s) {
        var o = t.width,
            n = t.height,
            r = {
          format: t.format,
          type: t.type,
          minFilter: GL.LINEAR,
          magFilter: GL.LINEAR,
          wrap: gl.CLAMP_TO_EDGE
        },
            a = this._uniforms,
            u = this._textures,
            h = N._cut_shader;
        h || (h = N._cut_shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, N.cut_pixel_shader)), gl.disable(gl.DEPTH_TEST), gl.disable(gl.BLEND), a.u_threshold = this.threshold;
        var p = u[0] = GL.Texture.getTemporary(o, n, r);
        t.blit(p, h.uniforms(a));
        var l = p,
            d = this.iterations;
        d = 0 | Math.clamp(d, 1, 16);
        var c = a.u_texel_size,
            _ = this.intensity;
        a.u_intensity = 1, a.u_delta = this.scale;
        h = N._shader;
        h || (h = N._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, N.scale_pixel_shader));

        for (var g = 1; g < d && (o >>= 1, (0 | n) > 1 && (n >>= 1), !(o < 2)); g++) p = u[g] = GL.Texture.getTemporary(o, n, r), c[0] = 1 / l.width, c[1] = 1 / l.height, l.blit(p, h.uniforms(a)), l = p;

        for (s && (c[0] = 1 / l.width, c[1] = 1 / l.height, a.u_intensity = _, a.u_delta = 1, l.blit(s, h.uniforms(a))), gl.enable(gl.BLEND), gl.blendFunc(gl.ONE, gl.ONE), a.u_intensity = this.persistence, a.u_delta = .5, g -= 2; g >= 0; g--) p = u[g], u[g] = null, c[0] = 1 / l.width, c[1] = 1 / l.height, l.blit(p, h.uniforms(a)), GL.Texture.releaseTemporary(l), l = p;

        if (gl.disable(gl.BLEND), i && l.blit(i), e) {
          var f = e,
              v = this.dirt_texture,
              m = this.dirt_factor;
          a.u_intensity = _, h = v ? N._dirt_final_shader : N._final_shader, h || (h = v ? N._dirt_final_shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, N.final_pixel_shader, {
            USE_DIRT: ""
          }) : N._final_shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, N.final_pixel_shader)), f.drawTo(function () {
            t.bind(0), l.bind(1), v && (h.setUniform("u_dirt_factor", m), h.setUniform("u_dirt_texture", v.bind(2))), h.toViewport(a);
          });
        }

        GL.Texture.releaseTemporary(l);
      }, N.cut_pixel_shader = "precision highp float;\n\tvarying vec2 v_coord;\n\tuniform sampler2D u_texture;\n\tuniform float u_threshold;\n\tvoid main() {\n\t\tgl_FragColor = max( texture2D( u_texture, v_coord ) - vec4( u_threshold ), vec4(0.0) );\n\t}", N.scale_pixel_shader = "precision highp float;\n\tvarying vec2 v_coord;\n\tuniform sampler2D u_texture;\n\tuniform vec2 u_texel_size;\n\tuniform float u_delta;\n\tuniform float u_intensity;\n\t\n\tvec4 sampleBox(vec2 uv) {\n\t\tvec4 o = u_texel_size.xyxy * vec2(-u_delta, u_delta).xxyy;\n\t\tvec4 s = texture2D( u_texture, uv + o.xy ) + texture2D( u_texture, uv + o.zy) + texture2D( u_texture, uv + o.xw) + texture2D( u_texture, uv + o.zw);\n\t\treturn s * 0.25;\n\t}\n\tvoid main() {\n\t\tgl_FragColor = u_intensity * sampleBox( v_coord );\n\t}", N.final_pixel_shader = "precision highp float;\n\tvarying vec2 v_coord;\n\tuniform sampler2D u_texture;\n\tuniform sampler2D u_glow_texture;\n\t#ifdef USE_DIRT\n\t\tuniform sampler2D u_dirt_texture;\n\t#endif\n\tuniform vec2 u_texel_size;\n\tuniform float u_delta;\n\tuniform float u_intensity;\n\tuniform float u_dirt_factor;\n\t\n\tvec4 sampleBox(vec2 uv) {\n\t\tvec4 o = u_texel_size.xyxy * vec2(-u_delta, u_delta).xxyy;\n\t\tvec4 s = texture2D( u_glow_texture, uv + o.xy ) + texture2D( u_glow_texture, uv + o.zy) + texture2D( u_glow_texture, uv + o.xw) + texture2D( u_glow_texture, uv + o.zw);\n\t\treturn s * 0.25;\n\t}\n\tvoid main() {\n\t\tvec4 glow = sampleBox( v_coord );\n\t\t#ifdef USE_DIRT\n\t\t\tglow = mix( glow, glow * texture2D( u_dirt_texture, v_coord ), u_dirt_factor );\n\t\t#endif\n\t\tgl_FragColor = texture2D( u_texture, v_coord ) + u_intensity * glow;\n\t}", S.title = "Glow", S.desc = "Filters a texture giving it a glow effect", S.widgets_info = {
        iterations: {
          type: "number",
          min: 0,
          max: 16,
          step: 1,
          precision: 0
        },
        threshold: {
          type: "number",
          min: 0,
          max: 10,
          step: .01,
          precision: 2
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, S.prototype.onGetInputs = function () {
        return [["enabled", "boolean"], ["threshold", "number"], ["intensity", "number"], ["persistence", "number"], ["iterations", "number"], ["dirt_factor", "number"]];
      }, S.prototype.onGetOutputs = function () {
        return [["average", "Texture"]];
      }, S.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (t && this.isAnyOutputConnected()) if (this.properties.precision !== e.PASS_THROUGH && !1 !== this.getInputOrProperty("enabled")) {
          t.width, t.height;
          var i = this.fx;
          i.threshold = this.getInputOrProperty("threshold"), i.iterations = this.getInputOrProperty("iterations"), i.intensity = this.getInputOrProperty("intensity"), i.persistence = this.getInputOrProperty("persistence"), i.dirt_texture = this.getInputData(1), i.dirt_factor = this.getInputOrProperty("dirt_factor"), i.scale = this.properties.scale;
          var s = e.getTextureType(this.properties.precision, t),
              o = null;
          this.isOutputConnected(2) && (o = this._average_texture, o && o.type == t.type && o.format == t.format || (o = this._average_texture = new GL.Texture(1, 1, {
            type: t.type,
            format: t.format,
            filter: gl.LINEAR
          })));
          var n = null;
          this.isOutputConnected(1) && (n = this._glow_texture, n && n.width == t.width && n.height == t.height && n.type == s && n.format == t.format || (n = this._glow_texture = new GL.Texture(t.width, t.height, {
            type: s,
            format: t.format,
            filter: gl.LINEAR
          })));
          var r = null;
          this.isOutputConnected(0) && (r = this._final_texture, r && r.width == t.width && r.height == t.height && r.type == s && r.format == t.format || (r = this._final_texture = new GL.Texture(t.width, t.height, {
            type: s,
            format: t.format,
            filter: gl.LINEAR
          }))), i.applyFX(t, r, n, o), this.isOutputConnected(0) && this.setOutputData(0, r), this.isOutputConnected(1) && this.setOutputData(1, o), this.isOutputConnected(2) && this.setOutputData(2, n);
        } else this.setOutputData(0, t);
      }, U.registerNodeType("texture/glow", S), C.title = "Kuwahara Filter", C.desc = "Filters a texture giving an artistic oil canvas painting", C.max_radius = 10, C._shaders = [], C.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t && this.isOutputConnected(0)) {
          var e = this._temp_texture;
          e && e.width == t.width && e.height == t.height && e.type == t.type || (this._temp_texture = new GL.Texture(t.width, t.height, {
            type: t.type,
            format: gl.RGBA,
            filter: gl.LINEAR
          }));
          var i = this.properties.radius;

          if (i = Math.min(Math.floor(i), C.max_radius), 0 != i) {
            var s = this.properties.intensity,
                o = U.camera_aspect;
            o || void 0 === window.gl || (o = gl.canvas.height / gl.canvas.width), o || (o = 1), o = this.properties.preserve_aspect ? o : 1, C._shaders[i] || (C._shaders[i] = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, C.pixel_shader, {
              RADIUS: i.toFixed(0)
            }));
            var n = C._shaders[i],
                r = GL.Mesh.getScreenQuad();
            t.bind(0), this._temp_texture.drawTo(function () {
              n.uniforms({
                u_texture: 0,
                u_intensity: s,
                u_resolution: [t.width, t.height],
                u_iResolution: [1 / t.width, 1 / t.height]
              }).draw(r);
            }), this.setOutputData(0, this._temp_texture);
          } else this.setOutputData(0, t);
        }
      }, C.pixel_shader = "\nprecision highp float;\nvarying vec2 v_coord;\nuniform sampler2D u_texture;\nuniform float u_intensity;\nuniform vec2 u_resolution;\nuniform vec2 u_iResolution;\n#ifndef RADIUS\n\t#define RADIUS 7\n#endif\nvoid main() {\n\n\tconst int radius = RADIUS;\n\tvec2 fragCoord = v_coord;\n\tvec2 src_size = u_iResolution;\n\tvec2 uv = v_coord;\n\tfloat n = float((radius + 1) * (radius + 1));\n\tint i;\n\tint j;\n\tvec3 m0 = vec3(0.0); vec3 m1 = vec3(0.0); vec3 m2 = vec3(0.0); vec3 m3 = vec3(0.0);\n\tvec3 s0 = vec3(0.0); vec3 s1 = vec3(0.0); vec3 s2 = vec3(0.0); vec3 s3 = vec3(0.0);\n\tvec3 c;\n\t\n\tfor (int j = -radius; j <= 0; ++j)  {\n\t\tfor (int i = -radius; i <= 0; ++i)  {\n\t\t\tc = texture2D(u_texture, uv + vec2(i,j) * src_size).rgb;\n\t\t\tm0 += c;\n\t\t\ts0 += c * c;\n\t\t}\n\t}\n\t\n\tfor (int j = -radius; j <= 0; ++j)  {\n\t\tfor (int i = 0; i <= radius; ++i)  {\n\t\t\tc = texture2D(u_texture, uv + vec2(i,j) * src_size).rgb;\n\t\t\tm1 += c;\n\t\t\ts1 += c * c;\n\t\t}\n\t}\n\t\n\tfor (int j = 0; j <= radius; ++j)  {\n\t\tfor (int i = 0; i <= radius; ++i)  {\n\t\t\tc = texture2D(u_texture, uv + vec2(i,j) * src_size).rgb;\n\t\t\tm2 += c;\n\t\t\ts2 += c * c;\n\t\t}\n\t}\n\t\n\tfor (int j = 0; j <= radius; ++j)  {\n\t\tfor (int i = -radius; i <= 0; ++i)  {\n\t\t\tc = texture2D(u_texture, uv + vec2(i,j) * src_size).rgb;\n\t\t\tm3 += c;\n\t\t\ts3 += c * c;\n\t\t}\n\t}\n\t\n\tfloat min_sigma2 = 1e+2;\n\tm0 /= n;\n\ts0 = abs(s0 / n - m0 * m0);\n\t\n\tfloat sigma2 = s0.r + s0.g + s0.b;\n\tif (sigma2 < min_sigma2) {\n\t\tmin_sigma2 = sigma2;\n\t\tgl_FragColor = vec4(m0, 1.0);\n\t}\n\t\n\tm1 /= n;\n\ts1 = abs(s1 / n - m1 * m1);\n\t\n\tsigma2 = s1.r + s1.g + s1.b;\n\tif (sigma2 < min_sigma2) {\n\t\tmin_sigma2 = sigma2;\n\t\tgl_FragColor = vec4(m1, 1.0);\n\t}\n\t\n\tm2 /= n;\n\ts2 = abs(s2 / n - m2 * m2);\n\t\n\tsigma2 = s2.r + s2.g + s2.b;\n\tif (sigma2 < min_sigma2) {\n\t\tmin_sigma2 = sigma2;\n\t\tgl_FragColor = vec4(m2, 1.0);\n\t}\n\t\n\tm3 /= n;\n\ts3 = abs(s3 / n - m3 * m3);\n\t\n\tsigma2 = s3.r + s3.g + s3.b;\n\tif (sigma2 < min_sigma2) {\n\t\tmin_sigma2 = sigma2;\n\t\tgl_FragColor = vec4(m3, 1.0);\n\t}\n}\n", U.registerNodeType("texture/kuwahara", C), A.title = "XDoG Filter", A.desc = "Filters a texture giving an artistic ink style", A.max_radius = 10, A._shaders = [], A.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t && this.isOutputConnected(0)) {
          var e = this._temp_texture;
          e && e.width == t.width && e.height == t.height && e.type == t.type || (this._temp_texture = new GL.Texture(t.width, t.height, {
            type: t.type,
            format: gl.RGBA,
            filter: gl.LINEAR
          })), A._xdog_shader || (A._xdog_shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, A.xdog_pixel_shader));
          var i = A._xdog_shader,
              s = GL.Mesh.getScreenQuad(),
              o = this.properties.sigma,
              n = this.properties.k,
              r = this.properties.p,
              a = this.properties.epsilon,
              u = this.properties.phi;
          t.bind(0), this._temp_texture.drawTo(function () {
            i.uniforms({
              src: 0,
              sigma: o,
              k: n,
              p: r,
              epsilon: a,
              phi: u,
              cvsWidth: t.width,
              cvsHeight: t.height
            }).draw(s);
          }), this.setOutputData(0, this._temp_texture);
        }
      }, A.xdog_pixel_shader = "\nprecision highp float;\nuniform sampler2D src;\n\nuniform float cvsHeight;\nuniform float cvsWidth;\n\nuniform float sigma;\nuniform float k;\nuniform float p;\nuniform float epsilon;\nuniform float phi;\nvarying vec2 v_coord;\n\nfloat cosh(float val)\n{\n\tfloat tmp = exp(val);\n\tfloat cosH = (tmp + 1.0 / tmp) / 2.0;\n\treturn cosH;\n}\n\nfloat tanh(float val)\n{\n\tfloat tmp = exp(val);\n\tfloat tanH = (tmp - 1.0 / tmp) / (tmp + 1.0 / tmp);\n\treturn tanH;\n}\n\nfloat sinh(float val)\n{\n\tfloat tmp = exp(val);\n\tfloat sinH = (tmp - 1.0 / tmp) / 2.0;\n\treturn sinH;\n}\n\nvoid main(void){\n\tvec3 destColor = vec3(0.0);\n\tfloat tFrag = 1.0 / cvsHeight;\n\tfloat sFrag = 1.0 / cvsWidth;\n\tvec2 Frag = vec2(sFrag,tFrag);\n\tvec2 uv = gl_FragCoord.st;\n\tfloat twoSigmaESquared = 2.0 * sigma * sigma;\n\tfloat twoSigmaRSquared = twoSigmaESquared * k * k;\n\tint halfWidth = int(ceil( 1.0 * sigma * k ));\n\n\tconst int MAX_NUM_ITERATION = 99999;\n\tvec2 sum = vec2(0.0);\n\tvec2 norm = vec2(0.0);\n\n\tfor(int cnt=0;cnt<MAX_NUM_ITERATION;cnt++){\n\t\tif(cnt > (2*halfWidth+1)*(2*halfWidth+1)){break;}\n\t\tint i = int(cnt / (2*halfWidth+1)) - halfWidth;\n\t\tint j = cnt - halfWidth - int(cnt / (2*halfWidth+1)) * (2*halfWidth+1);\n\n\t\tfloat d = length(vec2(i,j));\n\t\tvec2 kernel = vec2( exp( -d * d / twoSigmaESquared ), \n\t\t\t\t\t\t\texp( -d * d / twoSigmaRSquared ));\n\n\t\tvec2 L = texture2D(src, (uv + vec2(i,j)) * Frag).xx;\n\n\t\tnorm += kernel;\n\t\tsum += kernel * L;\n\t}\n\n\tsum /= norm;\n\n\tfloat H = 100.0 * ((1.0 + p) * sum.x - p * sum.y);\n\tfloat edge = ( H > epsilon )? 1.0 : 1.0 + tanh( phi * (H - epsilon));\n\tdestColor = vec3(edge);\n\tgl_FragColor = vec4(destColor, 1.0);\n}", U.registerNodeType("texture/xDoG", A), L.title = "Webcam", L.desc = "Webcam texture", L.is_webcam_open = !1, L.prototype.openStream = function () {
        function t(t) {
          L.is_webcam_open = !1, console.log("Webcam rejected", t), i._webcam_stream = !1, i.boxcolor = "red", i.trigger("stream_error");
        }

        if (navigator.getUserMedia) {
          this._waiting_confirmation = !0;
          var e = {
            audio: !1,
            video: {
              facingMode: this.properties.facingMode
            }
          };
          navigator.mediaDevices.getUserMedia(e).then(this.streamReady.bind(this)).catch(t);
          var i = this;
        }
      }, L.prototype.closeStream = function () {
        if (this._webcam_stream) {
          var t = this._webcam_stream.getTracks();

          if (t.length) for (var e = 0; e < t.length; ++e) t[e].stop();
          L.is_webcam_open = !1, this._webcam_stream = null, this._video = null, this.boxcolor = "black", this.trigger("stream_closed");
        }
      }, L.prototype.streamReady = function (t) {
        this._webcam_stream = t, this.boxcolor = "green";
        var e = this._video;
        e || (e = document.createElement("video"), e.autoplay = !0, e.srcObject = t, this._video = e, e.onloadedmetadata = function (t) {
          L.is_webcam_open = !0, console.log(t);
        }), this.trigger("stream_ready", e);
      }, L.prototype.onPropertyChanged = function (t, e) {
        "facingMode" == t && (this.properties.facingMode = e, this.closeStream(), this.openStream());
      }, L.prototype.onRemoved = function () {
        if (this._webcam_stream) {
          var t = this._webcam_stream.getTracks();

          if (t.length) for (var e = 0; e < t.length; ++e) t[e].stop();
          this._webcam_stream = null, this._video = null;
        }
      }, L.prototype.onDrawBackground = function (t) {
        this.flags.collapsed || this.size[1] <= 20 || this._video && (t.save(), t.webgl ? this._video_texture && t.drawImage(this._video_texture, 0, 0, this.size[0], this.size[1]) : t.drawImage(this._video, 0, 0, this.size[0], this.size[1]), t.restore());
      }, L.prototype.onExecute = function () {
        if (null != this._webcam_stream || this._waiting_confirmation || this.openStream(), this._video && this._video.videoWidth) {
          var t = this._video.videoWidth,
              i = this._video.videoHeight,
              s = this._video_texture;

          if (s && s.width == t && s.height == i || (this._video_texture = new GL.Texture(t, i, {
            format: gl.RGB,
            filter: gl.LINEAR
          })), this._video_texture.uploadImage(this._video), this._video_texture.version = ++this.version, this.properties.texture_name) {
            var o = e.getTexturesContainer();
            o[this.properties.texture_name] = this._video_texture;
          }

          this.setOutputData(0, this._video_texture);

          for (var n = 1; n < this.outputs.length; ++n) if (this.outputs[n]) switch (this.outputs[n].name) {
            case "width":
              this.setOutputData(n, this._video.videoWidth);
              break;

            case "height":
              this.setOutputData(n, this._video.videoHeight);
          }
        }
      }, L.prototype.onGetOutputs = function () {
        return [["width", "number"], ["height", "number"], ["stream_ready", U.EVENT], ["stream_closed", U.EVENT], ["stream_error", U.EVENT]];
      }, U.registerNodeType("texture/webcam", L), k.title = "Lens FX", k.desc = "distortion and chromatic aberration", k.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, k.prototype.onGetInputs = function () {
        return [["enabled", "boolean"]];
      }, k.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (t && this.isOutputConnected(0)) if (this.properties.precision !== e.PASS_THROUGH && !1 !== this.getInputOrProperty("enabled")) {
          var i = this._temp_texture;
          i && i.width == t.width && i.height == t.height && i.type == t.type || (i = this._temp_texture = new GL.Texture(t.width, t.height, {
            type: t.type,
            format: gl.RGBA,
            filter: gl.LINEAR
          }));
          var s = k._shader;
          s || (s = k._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, k.pixel_shader));
          var o = this.getInputData(1);
          null == o && (o = this.properties.factor);
          var n = this._uniforms;
          n.u_factor = o, gl.disable(gl.DEPTH_TEST), i.drawTo(function () {
            t.bind(0), s.uniforms(n).draw(GL.Mesh.getScreenQuad());
          }), this.setOutputData(0, i);
        } else this.setOutputData(0, t);
      }, k.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_factor;\n\t\tvec2 barrelDistortion(vec2 coord, float amt) {\n\t\t\tvec2 cc = coord - 0.5;\n\t\t\tfloat dist = dot(cc, cc);\n\t\t\treturn coord + cc * dist * amt;\n\t\t}\n\t\t\n\t\tfloat sat( float t )\n\t\t{\n\t\t\treturn clamp( t, 0.0, 1.0 );\n\t\t}\n\t\t\n\t\tfloat linterp( float t ) {\n\t\t\treturn sat( 1.0 - abs( 2.0*t - 1.0 ) );\n\t\t}\n\t\t\n\t\tfloat remap( float t, float a, float b ) {\n\t\t\treturn sat( (t - a) / (b - a) );\n\t\t}\n\t\t\n\t\tvec4 spectrum_offset( float t ) {\n\t\t\tvec4 ret;\n\t\t\tfloat lo = step(t,0.5);\n\t\t\tfloat hi = 1.0-lo;\n\t\t\tfloat w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );\n\t\t\tret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);\n\t\t\n\t\t\treturn pow( ret, vec4(1.0/2.2) );\n\t\t}\n\t\t\n\t\tconst float max_distort = 2.2;\n\t\tconst int num_iter = 12;\n\t\tconst float reci_num_iter_f = 1.0 / float(num_iter);\n\t\t\n\t\tvoid main()\n\t\t{\t\n\t\t\tvec2 uv=v_coord;\n\t\t\tvec4 sumcol = vec4(0.0);\n\t\t\tvec4 sumw = vec4(0.0);\t\n\t\t\tfor ( int i=0; i<num_iter;++i )\n\t\t\t{\n\t\t\t\tfloat t = float(i) * reci_num_iter_f;\n\t\t\t\tvec4 w = spectrum_offset( t );\n\t\t\t\tsumw += w;\n\t\t\t\tsumcol += w * texture2D( u_texture, barrelDistortion(uv, .6 * max_distort*t * u_factor ) );\n\t\t\t}\n\t\t\tgl_FragColor = sumcol / sumw;\n\t\t}", U.registerNodeType("texture/lensfx", k), R.title = "Data->Tex", R.desc = "Generates or applies a curve to a texture", R.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, R.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0);

          if (t) {
            var i = this.properties.channels,
                s = this.properties.width,
                o = this.properties.height;
            s && o || (s = Math.floor(t.length / i), o = 1);
            var n = gl.RGBA;
            3 == i ? n = gl.RGB : 1 == i && (n = gl.LUMINANCE);
            var r = this._temp_texture,
                a = e.getTextureType(this.properties.precision);
            r && r.width == s && r.height == o && r.type == a || (r = this._temp_texture = new GL.Texture(s, o, {
              type: a,
              format: n,
              filter: gl.LINEAR
            })), r.uploadData(t), this.setOutputData(0, r);
          }
        }
      }, U.registerNodeType("texture/fromdata", R), P.title = "Curve", P.desc = "Generates or applies a curve to a texture", P.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, P.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0),
              i = this._temp_texture;
          if (!t) return !this._must_update && this._curve_texture || this.updateCurve(), void this.setOutputData(0, this._curve_texture);
          var s = e.getTextureType(this.properties.precision, t);
          i && i.type == s && i.width == t.width && i.height == t.height && i.format == t.format || (i = this._temp_texture = new GL.Texture(t.width, t.height, {
            type: s,
            format: t.format,
            filter: gl.LINEAR
          }));
          var o = P._shader;
          o || (o = P._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, P.pixel_shader)), !this._must_update && this._curve_texture || this.updateCurve();
          var n = this._uniforms,
              r = this._curve_texture;
          i.drawTo(function () {
            gl.disable(gl.DEPTH_TEST), t.bind(0), r.bind(1), o.uniforms(n).draw(GL.Mesh.getScreenQuad());
          }), this.setOutputData(0, i);
        }
      }, P.prototype.sampleCurve = function (t, e) {
        e = e || this._points.RGB;

        if (e) {
          for (var i = 0; i < e.length - 1; ++i) {
            var s = e[i],
                o = e[i + 1];

            if (!(o[0] < t)) {
              var n = o[0] - s[0];
              if (Math.abs(n) < 1e-5) return s[1];
              var r = (t - s[0]) / n;
              return s[1] * (1 - r) + o[1] * r;
            }
          }

          return 0;
        }
      }, P.prototype.updateCurve = function () {
        for (var t = this._values, e = t.length / 4, i = this.properties.split_channels, s = 0; s < e; ++s) {
          if (i) t[4 * s] = Math.clamp(255 * this.sampleCurve(s / e, this._points.R), 0, 255), t[4 * s + 1] = Math.clamp(255 * this.sampleCurve(s / e, this._points.G), 0, 255), t[4 * s + 2] = Math.clamp(255 * this.sampleCurve(s / e, this._points.B), 0, 255);else {
            var o = this.sampleCurve(s / e);
            t[4 * s] = t[4 * s + 1] = t[4 * s + 2] = Math.clamp(255 * o, 0, 255);
          }
          t[4 * s + 3] = 255;
        }

        this._curve_texture || (this._curve_texture = new GL.Texture(256, 1, {
          format: gl.RGBA,
          magFilter: gl.LINEAR,
          wrap: gl.CLAMP_TO_EDGE
        })), this._curve_texture.uploadData(t, null, !0);
      }, P.prototype.onSerialize = function (t) {
        var e = {};

        for (var i in this._points) e[i] = this._points[i].concat();

        t.curves = e;
      }, P.prototype.onConfigure = function (t) {
        this._points = t.curves, this.curve_editor && (curve_editor.points = this._points), this._must_update = !0;
      }, P.prototype.onMouseDown = function (t, e, i) {
        if (this.curve_editor) {
          var s = this.curve_editor.onMouseDown([e[0], e[1] - this.curve_offset], i);
          return s && this.captureInput(!0), s;
        }
      }, P.prototype.onMouseMove = function (t, e, i) {
        if (this.curve_editor) return this.curve_editor.onMouseMove([e[0], e[1] - this.curve_offset], i);
      }, P.prototype.onMouseUp = function (t, e, i) {
        if (this.curve_editor) return this.curve_editor.onMouseUp([e[0], e[1] - this.curve_offset], i);
        this.captureInput(!1);
      }, P.channel_line_colors = {
        RGB: "#666",
        R: "#F33",
        G: "#3F3",
        B: "#33F"
      }, P.prototype.onDrawBackground = function (t, e) {
        if (!this.flags.collapsed) {
          this.curve_editor || (this.curve_editor = new U.CurveEditor(this._points.R)), t.save(), t.translate(0, this.curve_offset);
          var i = this.widgets[1].value;
          this.properties.split_channels ? ("RGB" == i && (this.widgets[1].value = i = "R", this.widgets[1].disabled = !1), this.curve_editor.points = this._points.R, this.curve_editor.draw(t, [this.size[0], this.size[1] - this.curve_offset], e, "#111", P.channel_line_colors.R, !0), t.globalCompositeOperation = "lighten", this.curve_editor.points = this._points.G, this.curve_editor.draw(t, [this.size[0], this.size[1] - this.curve_offset], e, null, P.channel_line_colors.G, !0), this.curve_editor.points = this._points.B, this.curve_editor.draw(t, [this.size[0], this.size[1] - this.curve_offset], e, null, P.channel_line_colors.B, !0), t.globalCompositeOperation = "source-over") : (this.widgets[1].value = i = "RGB", this.widgets[1].disabled = !0), this.curve_editor.points = this._points[i], this.curve_editor.draw(t, [this.size[0], this.size[1] - this.curve_offset], e, this.properties.split_channels ? null : "#111", P.channel_line_colors[i]), t.restore();
        }
      }, P.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform sampler2D u_curve;\n\t\tuniform float u_range;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D( u_texture, v_coord ) * u_range;\n\t\t\tcolor.x = texture2D( u_curve, vec2( color.x, 0.5 ) ).x;\n\t\t\tcolor.y = texture2D( u_curve, vec2( color.y, 0.5 ) ).y;\n\t\t\tcolor.z = texture2D( u_curve, vec2( color.z, 0.5 ) ).z;\n\t\t\t//color.w = texture2D( u_curve, vec2( color.w, 0.5 ) ).w;\n\t\t\tgl_FragColor = color;\n\t\t}", U.registerNodeType("texture/curve", P), M.title = "Exposition", M.desc = "Controls texture exposition", M.widgets_info = {
        exposition: {
          widget: "slider",
          min: 0,
          max: 3
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, M.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t && this.isOutputConnected(0)) {
          var e = this._temp_texture;
          e && e.width == t.width && e.height == t.height && e.type == t.type || (e = this._temp_texture = new GL.Texture(t.width, t.height, {
            type: t.type,
            format: gl.RGBA,
            filter: gl.LINEAR
          }));
          var i = M._shader;
          i || (i = M._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, M.pixel_shader));
          this.properties.exposition;
          var s = this.getInputData(1);
          null != s && (this.properties.exposition = s);
          var o = this._uniforms;
          e.drawTo(function () {
            gl.disable(gl.DEPTH_TEST), t.bind(0), i.uniforms(o).draw(GL.Mesh.getScreenQuad());
          }), this.setOutputData(0, e);
        }
      }, M.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_exposition;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D( u_texture, v_coord );\n\t\t\tgl_FragColor = vec4( color.xyz * u_exposition, color.a );\n\t\t}", U.registerNodeType("texture/exposition", M), G.title = "Tone Mapping", G.desc = "Applies Tone Mapping to convert from high to low", G.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, G.prototype.onGetInputs = function () {
        return [["enabled", "boolean"]];
      }, G.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (t && this.isOutputConnected(0)) if (this.properties.precision !== e.PASS_THROUGH && !1 !== this.getInputOrProperty("enabled")) {
          var i = this._temp_texture;
          i && i.width == t.width && i.height == t.height && i.type == t.type || (i = this._temp_texture = new GL.Texture(t.width, t.height, {
            type: t.type,
            format: gl.RGBA,
            filter: gl.LINEAR
          }));
          var s = this.getInputData(1);
          null == s && (s = this.properties.average_lum);
          var o = this._uniforms,
              n = null;
          s.constructor === Number ? (this.properties.average_lum = s, o.u_average_lum = this.properties.average_lum, n = G._shader, n || (n = G._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, G.pixel_shader))) : s.constructor === GL.Texture && (o.u_average_texture = s.bind(1), n = G._shader_texture, n || (n = G._shader_texture = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, G.pixel_shader, {
            AVG_TEXTURE: ""
          }))), o.u_lumwhite2 = this.properties.lum_white * this.properties.lum_white, o.u_scale = this.properties.scale, o.u_igamma = 1 / this.properties.gamma, gl.disable(gl.DEPTH_TEST), i.drawTo(function () {
            t.bind(0), n.uniforms(o).draw(GL.Mesh.getScreenQuad());
          }), this.setOutputData(0, this._temp_texture);
        } else this.setOutputData(0, t);
      }, G.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform float u_scale;\n\t\t#ifdef AVG_TEXTURE\n\t\t\tuniform sampler2D u_average_texture;\n\t\t#else\n\t\t\tuniform float u_average_lum;\n\t\t#endif\n\t\tuniform float u_lumwhite2;\n\t\tuniform float u_igamma;\n\t\tvec3 RGB2xyY (vec3 rgb)\n\t\t{\n\t\t\t const mat3 RGB2XYZ = mat3(0.4124, 0.3576, 0.1805,\n\t\t\t\t\t\t\t\t\t   0.2126, 0.7152, 0.0722,\n\t\t\t\t\t\t\t\t\t   0.0193, 0.1192, 0.9505);\n\t\t\tvec3 XYZ = RGB2XYZ * rgb;\n\t\t\t\n\t\t\tfloat f = (XYZ.x + XYZ.y + XYZ.z);\n\t\t\treturn vec3(XYZ.x / f,\n\t\t\t\t\t\tXYZ.y / f,\n\t\t\t\t\t\tXYZ.y);\n\t\t}\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 color = texture2D( u_texture, v_coord );\n\t\t\tvec3 rgb = color.xyz;\n\t\t\tfloat average_lum = 0.0;\n\t\t\t#ifdef AVG_TEXTURE\n\t\t\t\tvec3 pixel = texture2D(u_average_texture,vec2(0.5)).xyz;\n\t\t\t\taverage_lum = (pixel.x + pixel.y + pixel.z) / 3.0;\n\t\t\t#else\n\t\t\t\taverage_lum = u_average_lum;\n\t\t\t#endif\n\t\t\t//Ld - this part of the code is the same for both versions\n\t\t\tfloat lum = dot(rgb, vec3(0.2126, 0.7152, 0.0722));\n\t\t\tfloat L = (u_scale / average_lum) * lum;\n\t\t\tfloat Ld = (L * (1.0 + L / u_lumwhite2)) / (1.0 + L);\n\t\t\t//first\n\t\t\t//vec3 xyY = RGB2xyY(rgb);\n\t\t\t//xyY.z *= Ld;\n\t\t\t//rgb = xyYtoRGB(xyY);\n\t\t\t//second\n\t\t\trgb = (rgb / lum) * Ld;\n\t\t\trgb = max(rgb,vec3(0.001));\n\t\t\trgb = pow( rgb, vec3( u_igamma ) );\n\t\t\tgl_FragColor = vec4( rgb, color.a );\n\t\t}", U.registerNodeType("texture/tonemapping", G), z.title = "Perlin", z.desc = "Generates a perlin noise texture", z.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        },
        width: {
          type: "number",
          precision: 0,
          step: 1
        },
        height: {
          type: "number",
          precision: 0,
          step: 1
        },
        octaves: {
          type: "number",
          precision: 0,
          step: 1,
          min: 1,
          max: 50
        }
      }, z.prototype.onGetInputs = function () {
        return [["seed", "number"], ["persistence", "number"], ["octaves", "number"], ["scale", "number"], ["amplitude", "number"], ["offset", "vec2"]];
      }, z.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = 0 | this.properties.width,
              i = 0 | this.properties.height;
          0 == t && (t = gl.viewport_data[2]), 0 == i && (i = gl.viewport_data[3]);
          var s = e.getTextureType(this.properties.precision),
              o = this._texture;
          o && o.width == t && o.height == i && o.type == s || (o = this._texture = new GL.Texture(t, i, {
            type: s,
            format: gl.RGB,
            filter: gl.LINEAR
          }));
          var n = this.getInputOrProperty("persistence"),
              r = this.getInputOrProperty("octaves"),
              a = this.getInputOrProperty("offset"),
              u = this.getInputOrProperty("scale"),
              h = this.getInputOrProperty("amplitude"),
              p = this.getInputOrProperty("seed"),
              l = "" + t + i + s + n + r + u + p + a[0] + a[1] + h;

          if (l != this._key) {
            this._key = l;
            var d = this._uniforms;
            d.u_persistence = n, d.u_octaves = r, d.u_offset.set(a), d.u_scale = u, d.u_amplitude = h, d.u_seed = 128 * p, d.u_viewport[0] = t, d.u_viewport[1] = i;
            var c = z._shader;
            c || (c = z._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, z.pixel_shader)), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST), o.drawTo(function () {
              c.uniforms(d).draw(GL.Mesh.getScreenQuad());
            }), this.setOutputData(0, o);
          } else this.setOutputData(0, o);
        }
      }, z.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform vec2 u_offset;\n\t\tuniform float u_scale;\n\t\tuniform float u_persistence;\n\t\tuniform int u_octaves;\n\t\tuniform float u_amplitude;\n\t\tuniform vec2 u_viewport;\n\t\tuniform float u_seed;\n\t\t#define M_PI 3.14159265358979323846\n\t\t\n\t\tfloat rand(vec2 c){\treturn fract(sin(dot(c.xy ,vec2( 12.9898 + u_seed,78.233 + u_seed))) * 43758.5453); }\n\t\t\n\t\tfloat noise(vec2 p, float freq ){\n\t\t\tfloat unit = u_viewport.x/freq;\n\t\t\tvec2 ij = floor(p/unit);\n\t\t\tvec2 xy = mod(p,unit)/unit;\n\t\t\t//xy = 3.*xy*xy-2.*xy*xy*xy;\n\t\t\txy = .5*(1.-cos(M_PI*xy));\n\t\t\tfloat a = rand((ij+vec2(0.,0.)));\n\t\t\tfloat b = rand((ij+vec2(1.,0.)));\n\t\t\tfloat c = rand((ij+vec2(0.,1.)));\n\t\t\tfloat d = rand((ij+vec2(1.,1.)));\n\t\t\tfloat x1 = mix(a, b, xy.x);\n\t\t\tfloat x2 = mix(c, d, xy.x);\n\t\t\treturn mix(x1, x2, xy.y);\n\t\t}\n\t\t\n\t\tfloat pNoise(vec2 p, int res){\n\t\t\tfloat persistance = u_persistence;\n\t\t\tfloat n = 0.;\n\t\t\tfloat normK = 0.;\n\t\t\tfloat f = 4.;\n\t\t\tfloat amp = 1.0;\n\t\t\tint iCount = 0;\n\t\t\tfor (int i = 0; i<50; i++){\n\t\t\t\tn+=amp*noise(p, f);\n\t\t\t\tf*=2.;\n\t\t\t\tnormK+=amp;\n\t\t\t\tamp*=persistance;\n\t\t\t\tif (iCount >= res)\n\t\t\t\t\tbreak;\n\t\t\t\tiCount++;\n\t\t\t}\n\t\t\tfloat nf = n/normK;\n\t\t\treturn nf*nf*nf*nf;\n\t\t}\n\t\tvoid main() {\n\t\t\tvec2 uv = v_coord * u_scale * u_viewport + u_offset * u_scale;\n\t\t\tvec4 color = vec4( pNoise( uv, u_octaves ) * u_amplitude );\n\t\t\tgl_FragColor = color;\n\t\t}", U.registerNodeType("texture/perlin", z), F.title = "Canvas2D", F.desc = "Executes Canvas2D code inside a texture or the viewport.", F.help = "Set width and height to 0 to match viewport size.", F.default_code = "//vars: canvas,ctx,time\nctx.fillStyle='red';\nctx.fillRect(0,0,50,50);\n", F.widgets_info = {
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        },
        code: {
          type: "code"
        },
        width: {
          type: "number",
          precision: 0,
          step: 1
        },
        height: {
          type: "number",
          precision: 0,
          step: 1
        }
      }, F.prototype.onPropertyChanged = function (t, e) {
        "code" == t && this.compileCode(e);
      }, F.prototype.compileCode = function (t) {
        if (this._func = null, U.allow_scripts) try {
          this._func = new Function("canvas", "ctx", "time", "script", "v", t), this.boxcolor = "#00FF00";
        } catch (t) {
          this.boxcolor = "#FF0000", console.error("Error parsing script"), console.error(t);
        }
      }, F.prototype.onExecute = function () {
        var t = this._func;
        t && this.isOutputConnected(0) && this.executeDraw(t);
      }, F.prototype.executeDraw = function (i) {
        var s = this.properties.width || gl.canvas.width,
            o = this.properties.height || gl.canvas.height,
            n = this._temp_texture,
            r = e.getTextureType(this.properties.precision);
        n && n.width == s && n.height == o && n.type == r || (n = this._temp_texture = new GL.Texture(s, o, {
          format: gl.RGBA,
          filter: gl.LINEAR,
          type: r
        }));
        var a = this.getInputData(0),
            u = this.properties,
            h = this,
            p = this.graph.getTime(),
            l = gl,
            d = gl.canvas;
        if (!this.properties.use_html_canvas && t.enableWebGLCanvas || (this._canvas ? (d = this._canvas, l = this._ctx) : (d = this._canvas = createCanvas(s.height), l = this._ctx = d.getContext("2d")), d.width = s, d.height = o), l == gl) n.drawTo(function () {
          gl.start2D(), u.clear && (gl.clearColor(0, 0, 0, 0), gl.clear(gl.COLOR_BUFFER_BIT));

          try {
            i.draw ? i.draw.call(h, d, l, p, i, a) : i.call(h, d, l, p, i, a), h.boxcolor = "#00FF00";
          } catch (t) {
            h.boxcolor = "#FF0000", console.error("Error executing script"), console.error(t);
          }

          gl.finish2D();
        });else {
          u.clear && l.clearRect(0, 0, d.width, d.height);

          try {
            i.draw ? i.draw.call(this, d, l, p, i, a) : i.call(this, d, l, p, i, a), this.boxcolor = "#00FF00";
          } catch (t) {
            this.boxcolor = "#FF0000", console.error("Error executing script"), console.error(t);
          }

          n.uploadImage(d);
        }
        this.setOutputData(0, n);
      }, U.registerNodeType("texture/canvas2D", F), B.title = "Matte", B.desc = "Extracts background", B.widgets_info = {
        key_color: {
          widget: "color"
        },
        precision: {
          widget: "combo",
          values: e.MODE_VALUES
        }
      }, B.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0);

          if (this.properties.precision !== e.PASS_THROUGH) {
            if (t) {
              this._tex = e.getTargetTexture(t, this._tex, this.properties.precision), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST), this._uniforms || (this._uniforms = {
                u_texture: 0,
                u_key_color: this.properties.key_color,
                u_threshold: 1,
                u_slope: 1
              });
              var i = this._uniforms,
                  s = Mesh.getScreenQuad(),
                  o = B._shader;
              o || (o = B._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, B.pixel_shader)), i.u_key_color = this.properties.key_color, i.u_threshold = this.properties.threshold, i.u_slope = this.properties.slope, this._tex.drawTo(function () {
                t.bind(0), o.uniforms(i).draw(s);
              }), this.setOutputData(0, this._tex);
            }
          } else this.setOutputData(0, t);
        }
      }, B.pixel_shader = "precision highp float;\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tuniform vec3 u_key_color;\n\t\tuniform float u_threshold;\n\t\tuniform float u_slope;\n\t\t\n\t\tvoid main() {\n\t\t\tvec3 color = texture2D( u_texture, v_coord ).xyz;\n\t\t\tfloat diff = length( normalize(color) - normalize(u_key_color) );\n\t\t\tfloat edge = u_threshold * (1.0 - u_slope);\n\t\t\tfloat alpha = smoothstep( edge, u_threshold, diff);\n\t\t\tgl_FragColor = vec4( color, alpha );\n\t\t}", U.registerNodeType("texture/matte", B), H.title = "CubemapToTexture2D", H.desc = "Transforms a CUBEMAP texture into a TEXTURE2D in Polar Representation", H.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputData(0);

          if (t && t.texture_type == GL.TEXTURE_CUBE_MAP) {
            !this._last_tex || this._last_tex.height == t.height && this._last_tex.type == t.type || (this._last_tex = null);
            var e = this.getInputOrProperty("yaw");
            this._last_tex = GL.Texture.cubemapToTexture2D(t, t.height, this._last_tex, !0, e), this.setOutputData(0, this._last_tex);
          }
        }
      }, U.registerNodeType("texture/cubemapToTexture2D", H));
    }(this), function (t) {
      function e() {
        for (var t in A.length = 0, S) {
          var e = S[t],
              i = e.indexOf(" "),
              s = e.substr(0, i),
              o = e.indexOf("(", i),
              n = e.substr(i, o - i).trim(),
              r = e.substr(o + 1, e.length - o - 2).split(",");

          for (var a in r) {
            var u = r[a].split(" ").filter(function (t) {
              return t;
            });
            r[a] = {
              type: u[0].trim(),
              name: u[1].trim()
            }, "=" == u[2] && (r[a].value = u[3].trim());
          }

          C[t] = {
            return_type: s,
            func: n,
            params: r
          }, A.push(n);
        }
      }

      function i(t, e) {
        e.color = I, e.filter = "shader", e.prototype.clearDestination = function () {
          this.shader_destination = {};
        }, e.prototype.propagateDestination = function (t) {
          if (this.shader_destination[t] = !0, this.inputs) for (var e = 0; e < this.inputs.length; ++e) {
            var i = this.getInputNode(e);
            i && i.propagateDestination(t);
          }
        }, e.prototype.onPropertyChanged || (e.prototype.onPropertyChanged = function () {
          this.graph && this.graph._version++;
        }), O.registerNodeType("shader::" + t, e);
      }

      function s(t, e) {
        return "VAR_" + (e || "TEMP") + "_" + t.id;
      }

      function o(t, e) {
        if (!t.inputs) return null;
        var i = t.getInputLink(e);
        if (!i) return null;
        var s = t.graph.getNodeById(i.origin_id);
        return s ? s.getOutputVarName ? s.getOutputVarName(i.origin_slot) : "link_" + s.id + "_" + i.origin_slot : null;
      }

      function n(t, e) {
        return t.isOutputConnected(e) ? "link_" + t.id + "_" + e : null;
      }

      function r() {
        this.vs_template = "", this.fs_template = "", this.buffer_names = {
          uvs: "v_coord"
        }, this.extra = {}, this._functions = {}, this._uniforms = {}, this._codeparts = {}, this._uniform_value = null;
      }

      function a() {
        this.subgraph = new O.LGraph(), this.subgraph._subgraph_node = this, this.subgraph._is_subgraph = !0, this.subgraph.filter = "shader", this.addInput("in", "texture"), this.addOutput("out", "texture"), this.properties = {
          width: 0,
          height: 0,
          alpha: !1,
          precision: "undefined" != typeof LGraphTexture ? LGraphTexture.DEFAULT : 2
        };
        var t = this.subgraph.findNodesByType("shader::input/uniform")[0];
        t.pos = [200, 300];
        var e = O.createNode("shader::texture/sampler2D");
        e.pos = [400, 300], this.subgraph.add(e);
        var i = O.createNode("shader::output/fragcolor");
        i.pos = [600, 300], this.subgraph.add(i), t.connect(0, e), e.connect(0, i), this.size = [180, 60], this.redraw_on_mouse = !0, this._uniforms = {}, this._shader = null, this._context = new r(), this._context.vs_template = "#define VERTEX\n" + GL.Shader.SCREEN_VERTEX_SHADER, this._context.fs_template = a.template;
      }

      function u() {
        this.addOutput("out", ""), this.properties = {
          name: "",
          type: ""
        };
      }

      function h() {
        this.addOutput("out", "vec2"), this.properties = {
          name: "coord",
          type: "vec2"
        };
      }

      function l() {
        this.addInput("tex", "sampler2D"), this.addInput("uv", "vec2"), this.addOutput("rgba", "vec4"), this.addOutput("rgb", "vec3");
      }

      function d() {
        this.addOutput("", "float"), this.properties = {
          type: "float",
          value: 0
        }, this.addWidget("combo", "type", "float", null, {
          values: N,
          property: "type"
        }), this.updateWidgets();
      }

      function c() {
        this.addInput("xy", "vec2"), this.addInput("x", "float"), this.addInput("y", "float"), this.addOutput("xy", "vec2"), this.addOutput("x", "float"), this.addOutput("y", "float"), this.properties = {
          x: 0,
          y: 0
        };
      }

      function _() {
        this.addInput("xyz", "vec3"), this.addInput("x", "float"), this.addInput("y", "float"), this.addInput("z", "float"), this.addInput("xy", "vec2"), this.addInput("xz", "vec2"), this.addInput("yz", "vec2"), this.addOutput("xyz", "vec3"), this.addOutput("x", "float"), this.addOutput("y", "float"), this.addOutput("z", "float"), this.addOutput("xy", "vec2"), this.addOutput("xz", "vec2"), this.addOutput("yz", "vec2"), this.properties = {
          x: 0,
          y: 0,
          z: 0
        };
      }

      function g() {
        this.addInput("xyzw", "vec4"), this.addInput("xyz", "vec3"), this.addInput("x", "float"), this.addInput("y", "float"), this.addInput("z", "float"), this.addInput("w", "float"), this.addInput("xy", "vec2"), this.addInput("yz", "vec2"), this.addInput("zw", "vec2"), this.addOutput("xyzw", "vec4"), this.addOutput("xyz", "vec3"), this.addOutput("x", "float"), this.addOutput("y", "float"), this.addOutput("z", "float"), this.addOutput("xy", "vec2"), this.addOutput("yz", "vec2"), this.addOutput("zw", "vec2"), this.properties = {
          x: 0,
          y: 0,
          z: 0,
          w: 0
        };
      }

      function f() {
        this.addInput("color", D.ALL_TYPES), this.block_delete = !0;
      }

      function v() {
        this.addInput("A", D.ALL_TYPES), this.addInput("B", D.ALL_TYPES), this.addOutput("out", ""), this.properties = {
          operation: "*"
        }, this.addWidget("combo", "op.", this.properties.operation, {
          property: "operation",
          values: v.operations
        });
      }

      function m() {
        this.addInput("A", D.ALL_TYPES), this.addInput("B", D.ALL_TYPES), this.addOutput("out", ""), this.properties = {
          func: "floor"
        }, this._current = "floor", this.addWidget("combo", "func", this.properties.func, {
          property: "func",
          values: A
        });
      }

      function y() {
        this.addInput("A", D.ALL_TYPES), this.addInput("B", D.ALL_TYPES), this.addOutput("C", "vec4"), this.properties = {
          code: "C = A+B",
          type: "vec4"
        }, this.addWidget("text", "code", this.properties.code, {
          property: "code"
        }), this.addWidget("combo", "type", this.properties.type, {
          values: ["float", "vec2", "vec3", "vec4"],
          property: "type"
        });
      }

      function x() {
        this.addOutput("out", "float");
      }

      function b() {
        this.addInput("out", D.ALL_TYPES), this.addInput("scale", "float"), this.addOutput("out", "float"), this.properties = {
          type: "noise",
          scale: 1
        }, this.addWidget("combo", "type", this.properties.type, {
          property: "type",
          values: b.NOISE_TYPES
        }), this.addWidget("number", "scale", this.properties.scale, {
          property: "scale"
        });
      }

      function T() {
        this.addOutput("out", "float");
      }

      function E() {
        this.addInput("in", "T"), this.addOutput("out", "float");
      }

      function w() {
        this.addInput("", D.ALL_TYPES), this.addOutput("", ""), this.properties = {
          min_value: 0,
          max_value: 1,
          min_value2: 0,
          max_value2: 1
        }, this.addWidget("number", "min", 0, {
          step: .1,
          property: "min_value"
        }), this.addWidget("number", "max", 1, {
          step: .1,
          property: "max_value"
        }), this.addWidget("number", "min2", 0, {
          step: .1,
          property: "min_value2"
        }), this.addWidget("number", "max2", 1, {
          step: .1,
          property: "max_value2"
        });
      }

      if ("undefined" != typeof GL) {
        var O = t.LiteGraph,
            I = (t.LGraphCanvas, "#345"),
            D = O.Shaders = {},
            N = (D.GLSL_types = ["float", "vec2", "vec3", "vec4", "mat3", "mat4", "sampler2D", "samplerCube"], D.GLSL_types_const = ["float", "vec2", "vec3", "vec4"]),
            S = {
          radians: "T radians(T degrees)",
          degrees: "T degrees(T radians)",
          sin: "T sin(T angle)",
          cos: "T cos(T angle)",
          tan: "T tan(T angle)",
          asin: "T asin(T x)",
          acos: "T acos(T x)",
          atan: "T atan(T x)",
          atan2: "T atan(T x,T y)",
          pow: "T pow(T x,T y)",
          exp: "T exp(T x)",
          log: "T log(T x)",
          exp2: "T exp2(T x)",
          log2: "T log2(T x)",
          sqrt: "T sqrt(T x)",
          inversesqrt: "T inversesqrt(T x)",
          abs: "T abs(T x)",
          sign: "T sign(T x)",
          floor: "T floor(T x)",
          round: "T round(T x)",
          ceil: "T ceil(T x)",
          fract: "T fract(T x)",
          mod: "T mod(T x,T y)",
          min: "T min(T x,T y)",
          max: "T max(T x,T y)",
          clamp: "T clamp(T x,T minVal = 0.0,T maxVal = 1.0)",
          mix: "T mix(T x,T y,T a)",
          step: "T step(T edge, T edge2, T x)",
          smoothstep: "T smoothstep(T edge, T edge2, T x)",
          length: "float length(T x)",
          distance: "float distance(T p0, T p1)",
          normalize: "T normalize(T x)",
          dot: "float dot(T x,T y)",
          cross: "vec3 cross(vec3 x,vec3 y)",
          reflect: "vec3 reflect(vec3 V,vec3 N)",
          refract: "vec3 refract(vec3 V,vec3 N, float IOR)"
        },
            C = {},
            A = [];
        e(), D.ALL_TYPES = "float,vec2,vec3,vec4", D.registerShaderNode = i, D.getInputLinkID = o, D.getOutputLinkID = n, D.getShaderNodeVarName = s, D.parseGLSLDescriptions = e;

        var L = O.valueToGLSL = function (t, e, i) {
          var s = 5;
          if (null != i && (s = i), !e) if (t.constructor === Number) e = "float";else {
            if (!t.length) throw "unknown type for glsl value: " + t.constructor;

            switch (t.length) {
              case 2:
                e = "vec2";
                break;

              case 3:
                e = "vec3";
                break;

              case 4:
                e = "vec4";
                break;

              case 9:
                e = "mat3";
                break;

              case 16:
                e = "mat4";
                break;

              default:
                throw "unknown type for glsl value size";
            }
          }

          switch (e) {
            case "float":
              return t.toFixed(s);

            case "vec2":
              return "vec2(" + t[0].toFixed(s) + "," + t[1].toFixed(s) + ")";

            case "color3":
            case "vec3":
              return "vec3(" + t[0].toFixed(s) + "," + t[1].toFixed(s) + "," + t[2].toFixed(s) + ")";

            case "color4":
            case "vec4":
              return "vec4(" + t[0].toFixed(s) + "," + t[1].toFixed(s) + "," + t[2].toFixed(s) + "," + t[3].toFixed(s) + ")";

            case "mat3":
              return "mat3(1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0)";

            case "mat4":
              return "mat4(1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0)";

            default:
              throw e;
          }

          return "";
        },
            k = O.varToTypeGLSL = function (t, e, i) {
          if (e == i) return t;
          if (null == t) switch (i) {
            case "float":
              return "0.0";

            case "vec2":
              return "vec2(0.0)";

            case "vec3":
              return "vec3(0.0)";

            case "vec4":
              return "vec4(0.0,0.0,0.0,1.0)";

            default:
              return null;
          }
          if (!i) throw "error: no output type specified";
          if ("float" == i) switch (e) {
            case "vec2":
            case "vec3":
            case "vec4":
              return t + ".x";

            default:
              return "0.0";
          } else if ("vec2" == i) switch (e) {
            case "float":
              return "vec2(" + t + ")";

            case "vec3":
            case "vec4":
              return t + ".xy";

            default:
              return "vec2(0.0)";
          } else if ("vec3" == i) switch (e) {
            case "float":
              return "vec3(" + t + ")";

            case "vec2":
              return "vec3(" + t + ",0.0)";

            case "vec4":
              return t + ".xyz";

            default:
              return "vec3(0.0)";
          } else if ("vec4" == i) switch (e) {
            case "float":
              return "vec4(" + t + ")";

            case "vec2":
              return "vec4(" + t + ",0.0,1.0)";

            case "vec3":
              return "vec4(" + t + ",1.0)";

            default:
              return "vec4(0.0,0.0,0.0,1.0)";
          }
          throw "type cannot be converted";
        },
            R = O.convertVarToGLSLType = function (t, e, i) {
          if (e == i) return t;
          if ("float" == e) return i + "(" + t + ")";
          if ("vec2" == i) return "vec2(" + t + ".xy)";

          if ("vec3" == i) {
            if ("vec2" == e) return "vec3(" + t + ",0.0)";
            if ("vec4" == e) return "vec4(" + t + ".xyz)";
          }

          if ("vec4" == i) {
            if ("vec2" == e) return "vec4(" + t + ",0.0,0.0)";
            if ("vec3" == i) return "vec4(" + t + ",1.0)";
          }

          return null;
        };

        r.prototype.clear = function () {
          this._uniforms = {}, this._functions = {}, this._codeparts = {}, this._uniform_value = null, this.extra = {};
        }, r.prototype.addUniform = function (t, e, i) {
          this._uniforms[t] = e, null != i && (this._uniform_value || (this._uniform_value = {}), this._uniform_value[t] = i);
        }, r.prototype.addFunction = function (t, e) {
          this._functions[t] = e;
        }, r.prototype.addCode = function (t, e, i) {
          for (var s in i = i || {
            "": ""
          }, i) {
            var o = s ? s + "_" + t : t;
            this._codeparts[o] ? this._codeparts[o] += e + "\n" : this._codeparts[o] = e + "\n";
          }
        }, r.prototype.computeCodeBlocks = function (t, e) {
          this.clear();
          var i = t.findNodesByType("shader::output/vertex");
          i = i && i.length ? i[0] : null;
          var s = t.findNodesByType("shader::output/fragcolor");
          if (s = s && s.length ? s[0] : null, !s) return null;
          t.sendEventToAllNodes("clearDestination"), i && i.propagateDestination("vs"), s && s.propagateDestination("fs"), t.sendEventToAllNodes("onGetCode", this);
          var o = "";

          for (var n in this._uniforms) o += "uniform " + this._uniforms[n] + " " + n + ";\n";

          if (e) for (var n in e) o += "uniform " + e[n] + " " + n + ";\n";
          var r = "";

          for (var n in this._functions) r += "//" + n + "\n" + this._functions[n] + "\n";

          var a = this._codeparts;
          return a.uniforms = o, a.functions = r, a;
        }, r.prototype.computeShaderCode = function (t) {
          var e = this.computeCodeBlocks(t),
              i = GL.Shader.replaceCodeUsingContext(this.vs_template, e),
              s = GL.Shader.replaceCodeUsingContext(this.fs_template, e);
          return {
            vs_code: i,
            fs_code: s
          };
        }, r.prototype.computeShader = function (t, e) {
          var i = this.computeShaderCode(t);
          if (console.log(i.vs_code, i.fs_code), !O.catch_exceptions) return this._shader_error = !0, e ? e.updateShader(i.vs_code, i.fs_code) : e = new GL.Shader(i.vs_code, i.fs_code), this._shader_error = !1, e;

          try {
            return e ? e.updateShader(i.vs_code, i.fs_code) : e = new GL.Shader(i.vs_code, i.fs_code), this._shader_error = !1, e;
          } catch (t) {
            return this._shader_error || (console.error(t), -1 != t.indexOf("Fragment shader") ? console.log(i.fs_code.split("\n").map(function (t, e) {
              return e + ".- " + t;
            }).join("\n")) : console.log(i.vs_code)), this._shader_error = !0, null;
          }

          return null;
        }, r.prototype.getShader = function (t) {
          if (this._shader && this._shader._version == t._version) return this._shader;
          var e = this.computeShader(t, this._shader);
          return e ? (this._shader = e, e._version = t._version, e) : null;
        }, r.prototype.fillUniforms = function (t, e) {
          if (this._uniform_value) for (var i in this._uniform_value) {
            var s = this._uniform_value[i];
            null != s && (s.constructor === Function ? t[i] = s.call(this, e) : s.constructor === GL.Texture || (t[i] = s));
          }
        }, O.ShaderContext = O.Shaders.Context = r, a.template = "\n#define FRAGMENT\nprecision highp float;\nvarying vec2 v_coord;\n{{varying}}\n{{uniforms}}\n{{functions}}\n{{fs_functions}}\nvoid main() {\n\nvec2 uv = v_coord;\nvec4 fragcolor = vec4(0.0);\nvec4 fragcolor1 = vec4(0.0);\n{{fs_code}}\ngl_FragColor = fragcolor;\n}\n\t", a.widgets_info = {
          precision: {
            widget: "combo",
            values: LGraphTexture.MODE_VALUES
          }
        }, a.title = "ShaderGraph", a.desc = "Builds a shader using a graph", a.input_node_type = "input/uniform", a.output_node_type = "output/fragcolor", a.title_color = I, a.prototype.onSerialize = function (t) {
          t.subgraph = this.subgraph.serialize();
        }, a.prototype.onConfigure = function (t) {
          this.subgraph.configure(t.subgraph);
        }, a.prototype.onExecute = function () {
          if (this.isOutputConnected(0)) {
            var t = this.getInputData(0);
            t && t.constructor != GL.Texture && (t = null);
            var e = 0 | this.properties.width,
                i = 0 | this.properties.height;
            0 == e && (e = t ? t.width : gl.viewport_data[2]), 0 == i && (i = t ? t.height : gl.viewport_data[3]);
            var s = LGraphTexture.getTextureType(this.properties.precision, t),
                o = this._texture;
            o && o.width == e && o.height == i && o.type == s || (o = this._texture = new GL.Texture(e, i, {
              type: s,
              format: this.alpha ? gl.RGBA : gl.RGB,
              filter: gl.LINEAR
            }));
            var n = this.getShader(this.subgraph);

            if (n) {
              var r = this._uniforms;

              this._context.fillUniforms(r);

              var a = 0;
              if (this.inputs) for (var u = 0; u < this.inputs.length; ++u) {
                var h = this.inputs[u],
                    p = this.getInputData(u);
                "texture" == h.type && (p || (p = GL.Texture.getWhiteTexture()), p = p.bind(a++)), null != p && (r["u_" + h.name] = p);
              }
              var l = GL.Mesh.getScreenQuad();
              gl.disable(gl.DEPTH_TEST), gl.disable(gl.BLEND), o.drawTo(function () {
                n.uniforms(r), n.draw(l);
              }), this.setOutputData(0, o);
            }
          }
        }, a.prototype.onInputAdded = function (t) {
          var e = O.createNode("shader::input/uniform");
          e.setProperty("name", t.name), e.setProperty("type", t.type), this.subgraph.add(e);
        }, a.prototype.onInputRemoved = function (t, e) {
          for (var i = this.subgraph.findNodesByType("shader::input/uniform"), s = 0; s < i.length; ++s) {
            var o = i[s];
            o.properties.name == e.name && this.subgraph.remove(o);
          }
        }, a.prototype.computeSize = function () {
          var t = this.inputs ? this.inputs.length : 0,
              e = this.outputs ? this.outputs.length : 0;
          return [200, Math.max(t, e) * O.NODE_SLOT_HEIGHT + O.NODE_TITLE_HEIGHT + 10];
        }, a.prototype.getShader = function () {
          var t = this._context.getShader(this.subgraph);

          return this.boxcolor = t ? null : "red", t;
        }, a.prototype.onDrawBackground = function (t, e, i, s) {
          if (!this.flags.collapsed) {
            var o = this.getOutputData(0),
                n = this.inputs ? this.inputs.length * O.NODE_SLOT_HEIGHT : 0;
            o && t == o.gl && this.size[1] > n + O.NODE_TITLE_HEIGHT && t.drawImage(o, 10, r, this.size[0] - 20, this.size[1] - n - O.NODE_TITLE_HEIGHT);
            var r = this.size[1] - O.NODE_TITLE_HEIGHT + .5,
                a = O.isInsideRectangle(s[0], s[1], this.pos[0], this.pos[1] + r, this.size[0], O.NODE_TITLE_HEIGHT);
            t.fillStyle = a ? "#555" : "#222", t.beginPath(), this._shape == O.BOX_SHAPE ? t.rect(0, r, this.size[0] + 1, O.NODE_TITLE_HEIGHT) : t.roundRect(0, r, this.size[0] + 1, O.NODE_TITLE_HEIGHT, 0, 8), t.fill(), t.textAlign = "center", t.font = "24px Arial", t.fillStyle = a ? "#DDD" : "#999", t.fillText("+", .5 * this.size[0], r + 24);
          }
        }, a.prototype.onMouseDown = function (t, e, i) {
          var s = this.size[1] - O.NODE_TITLE_HEIGHT + .5;
          e[1] > s && i.showSubgraphPropertiesDialog(this);
        }, a.prototype.onDrawSubgraphBackground = function (t) {}, a.prototype.getExtraMenuOptions = function (t) {
          var e = this,
              i = [{
            content: "Print Code",
            callback: function () {
              var t = e._context.computeShaderCode();

              console.log(t.vs_code, t.fs_code);
            }
          }];
          return i;
        }, O.registerNodeType("texture/shaderGraph", a), u.title = "Uniform", u.desc = "Input data for the shader", u.prototype.getTitle = function () {
          return this.properties.name && this.flags.collapsed ? this.properties.type + " " + this.properties.name : "Uniform";
        }, u.prototype.onPropertyChanged = function (t, e) {
          this.outputs[0].name = this.properties.type + " " + this.properties.name;
        }, u.prototype.onGetCode = function (t) {
          if (this.shader_destination) {
            var e = this.properties.type;

            if (!e) {
              if (!t.onGetPropertyInfo) return;
              var i = t.onGetPropertyInfo(this.property.name);
              if (!i) return;
              e = i.type;
            }

            "number" == e ? e = "float" : "texture" == e && (e = "sampler2D"), -1 != D.GLSL_types.indexOf(e) && (t.addUniform("u_" + this.properties.name, e), this.setOutputData(0, e));
          }
        }, u.prototype.getOutputVarName = function (t) {
          return "u_" + this.properties.name;
        }, i("input/uniform", u), h.title = "Attribute", h.desc = "Input data from mesh attribute", h.prototype.getTitle = function () {
          return "att. " + this.properties.name;
        }, h.prototype.onGetCode = function (t) {
          if (this.shader_destination) {
            var e = this.properties.type;
            e && -1 != D.GLSL_types.indexOf(e) && ("number" == e && (e = "float"), "coord" != this.properties.name && t.addCode("varying", " varying " + e + " v_" + this.properties.name + ";"), this.setOutputData(0, e));
          }
        }, h.prototype.getOutputVarName = function (t) {
          return "v_" + this.properties.name;
        }, i("input/attribute", h), l.title = "Sampler2D", l.desc = "Reads a pixel from a texture", l.prototype.onGetCode = function (t) {
          if (this.shader_destination) {
            var e = o(this, 0),
                i = s(this),
                r = "vec4 " + i + " = vec4(0.0);\n";

            if (e) {
              var a = o(this, 1) || t.buffer_names.uvs;
              r += i + " = texture2D(" + e + "," + a + ");\n";
            }

            var u = n(this, 0);
            u && (r += "vec4 " + n(this, 0) + " = " + i + ";\n");
            var h = n(this, 1);
            h && (r += "vec3 " + n(this, 1) + " = " + i + ".xyz;\n"), t.addCode("code", r, this.shader_destination), this.setOutputData(0, "vec4"), this.setOutputData(1, "vec3");
          }
        }, i("texture/sampler2D", l), d.title = "const", d.prototype.getTitle = function () {
          return this.flags.collapsed ? L(this.properties.value, this.properties.type, 2) : "Const";
        }, d.prototype.onPropertyChanged = function (t, e) {
          "type" == t && (this.outputs[0].type != e && (this.disconnectOutput(0), this.outputs[0].type = e), this.widgets.length = 1, this.updateWidgets()), "value" == t && (e.length ? (this.widgets[1].value = e[1], e.length > 2 && (this.widgets[2].value = e[2]), e.length > 3 && (this.widgets[3].value = e[3])) : this.widgets[1].value = e);
        }, d.prototype.updateWidgets = function (t) {
          var e = this,
              i = (t = this.properties.value, {
            step: .01
          });

          switch (this.properties.type) {
            case "float":
              this.properties.value = 0, this.addWidget("number", "v", 0, {
                step: .01,
                property: "value"
              });
              break;

            case "vec2":
              this.properties.value = t && 2 == t.length ? [t[0], t[1]] : [0, 0, 0], this.addWidget("number", "x", this.properties.value[0], function (t) {
                e.properties.value[0] = t;
              }, i), this.addWidget("number", "y", this.properties.value[1], function (t) {
                e.properties.value[1] = t;
              }, i);
              break;

            case "vec3":
              this.properties.value = t && 3 == t.length ? [t[0], t[1], t[2]] : [0, 0, 0], this.addWidget("number", "x", this.properties.value[0], function (t) {
                e.properties.value[0] = t;
              }, i), this.addWidget("number", "y", this.properties.value[1], function (t) {
                e.properties.value[1] = t;
              }, i), this.addWidget("number", "z", this.properties.value[2], function (t) {
                e.properties.value[2] = t;
              }, i);
              break;

            case "vec4":
              this.properties.value = t && 4 == t.length ? [t[0], t[1], t[2], t[3]] : [0, 0, 0, 0], this.addWidget("number", "x", this.properties.value[0], function (t) {
                e.properties.value[0] = t;
              }, i), this.addWidget("number", "y", this.properties.value[1], function (t) {
                e.properties.value[1] = t;
              }, i), this.addWidget("number", "z", this.properties.value[2], function (t) {
                e.properties.value[2] = t;
              }, i), this.addWidget("number", "w", this.properties.value[3], function (t) {
                e.properties.value[3] = t;
              }, i);
              break;

            default:
              console.error("unknown type for constant");
          }
        }, d.prototype.onGetCode = function (t) {
          if (this.shader_destination) {
            var e = L(this.properties.value, this.properties.type),
                i = n(this, 0);

            if (i) {
              var s = "\t" + this.properties.type + " " + i + " = " + e + ";";
              t.addCode("code", s, this.shader_destination), this.setOutputData(0, this.properties.type);
            }
          }
        }, i("const/const", d), c.title = "vec2", c.varmodes = ["xy", "x", "y"], c.prototype.onPropertyChanged = function () {
          this.graph && this.graph._version++;
        }, c.prototype.onGetCode = function (t) {
          if (this.shader_destination) {
            for (var e = this.properties, i = s(this), r = "\tvec2 " + i + " = " + L([e.x, e.y]) + ";\n", a = 0; a < c.varmodes.length; ++a) {
              var u = c.varmodes[a],
                  h = o(this, a);
              h && (r += "\t" + i + "." + u + " = " + h + ";\n");
            }

            for (a = 0; a < c.varmodes.length; ++a) {
              u = c.varmodes[a];
              var p = n(this, a);

              if (p) {
                var l = N[u.length - 1];
                r += "\t" + l + " " + p + " = " + i + "." + u + ";\n", this.setOutputData(a, l);
              }
            }

            t.addCode("code", r, this.shader_destination);
          }
        }, i("const/vec2", c), _.title = "vec3", _.varmodes = ["xyz", "x", "y", "z", "xy", "xz", "yz"], _.prototype.onPropertyChanged = function () {
          this.graph && this.graph._version++;
        }, _.prototype.onGetCode = function (t) {
          if (this.shader_destination) {
            for (var e = this.properties, i = s(this), r = "vec3 " + i + " = " + L([e.x, e.y, e.z]) + ";\n", a = 0; a < _.varmodes.length; ++a) {
              var u = _.varmodes[a],
                  h = o(this, a);
              h && (r += "\t" + i + "." + u + " = " + h + ";\n");
            }

            for (a = 0; a < _.varmodes.length; ++a) {
              u = _.varmodes[a];
              var p = n(this, a);

              if (p) {
                var l = N[u.length - 1];
                r += "\t" + l + " " + p + " = " + i + "." + u + ";\n", this.setOutputData(a, l);
              }
            }

            t.addCode("code", r, this.shader_destination);
          }
        }, i("const/vec3", _), g.title = "vec4", g.varmodes = ["xyzw", "xyz", "x", "y", "z", "w", "xy", "yz", "zw"], g.prototype.onPropertyChanged = function () {
          this.graph && this.graph._version++;
        }, g.prototype.onGetCode = function (t) {
          if (this.shader_destination) {
            for (var e = this.properties, i = s(this), r = "vec4 " + i + " = " + L([e.x, e.y, e.z, e.w]) + ";\n", a = 0; a < g.varmodes.length; ++a) {
              var u = g.varmodes[a],
                  h = o(this, a);
              h && (r += "\t" + i + "." + u + " = " + h + ";\n");
            }

            for (a = 0; a < g.varmodes.length; ++a) {
              u = g.varmodes[a];
              var p = n(this, a);

              if (p) {
                var l = N[u.length - 1];
                r += "\t" + l + " " + p + " = " + i + "." + u + ";\n", this.setOutputData(a, l);
              }
            }

            t.addCode("code", r, this.shader_destination);
          }
        }, i("const/vec4", g), f.title = "FragColor", f.desc = "Pixel final color", f.prototype.onGetCode = function (t) {
          var e = o(this, 0);

          if (e) {
            var i = this.getInputData(0),
                s = k(e, i, "vec4");
            t.addCode("fs_code", "fragcolor = " + s + ";");
          }
        }, i("output/fragcolor", f), v.title = "Operation", v.operations = ["+", "-", "*", "/"], v.prototype.getTitle = function () {
          return this.flags.collapsed ? "A" + this.properties.operation + "B" : "Operation";
        }, v.prototype.onGetCode = function (t) {
          if (this.shader_destination && this.isOutputConnected(0)) {
            for (var e = [], i = 0; i < 3; ++i) e.push({
              name: o(this, i),
              type: this.getInputData(i) || "float"
            });

            var s = n(this, 0);

            if (s) {
              var r = e[0].type,
                  a = r,
                  u = this.properties.operation,
                  h = [];

              for (i = 0; i < 2; ++i) {
                var l = e[i].name;
                null == l && (l = null != p.value ? p.value : "(1.0)", e[i].type = "float"), e[i].type != r && ("float" != e[i].type || "*" != u && "/" != u) && (l = R(l, e[i].type, r)), h.push(l);
              }

              t.addCode("code", a + " " + s + " = " + h[0] + u + h[1] + ";", this.shader_destination), this.setOutputData(0, a);
            }
          }
        }, i("math/operation", v), m.title = "Func", m.prototype.onPropertyChanged = function (t, e) {
          if (this.graph && this.graph._version++, "func" == t) {
            var i = C[e];
            if (!i) return;

            for (var s = i.params.length; s < this.inputs.length; ++s) this.removeInput(s);

            for (s = 0; s < i.params.length; ++s) {
              var o = i.params[s];
              this.inputs[s] ? this.inputs[s].name = o.name + (o.value ? " (" + o.value + ")" : "") : this.addInput(o.name, D.ALL_TYPES);
            }
          }
        }, m.prototype.getTitle = function () {
          return this.flags.collapsed ? this.properties.func : "Func";
        }, m.prototype.onGetCode = function (t) {
          if (this.shader_destination && this.isOutputConnected(0)) {
            for (var e = [], i = 0; i < 3; ++i) e.push({
              name: o(this, i),
              type: this.getInputData(i) || "float"
            });

            var s = n(this, 0);

            if (s) {
              var r = C[this.properties.func];

              if (r) {
                var a = e[0].type,
                    u = r.return_type;
                "T" == u && (u = a);
                var h = [];

                for (i = 0; i < r.params.length; ++i) {
                  var p = r.params[i],
                      l = e[i].name;
                  null == l && (l = null != p.value ? p.value : "(1.0)", e[i].type = "float"), ("T" == p.type && e[i].type != a || "T" != p.type && e[i].type != a) && (l = R(l, e[i].type, a)), h.push(l);
                }

                t.addFunction("round", "float round(float v){ return floor(v+0.5); }\nvec2 round(vec2 v){ return floor(v+vec2(0.5));}\nvec3 round(vec3 v){ return floor(v+vec3(0.5));}\nvec4 round(vec4 v){ return floor(v+vec4(0.5)); }\n"), t.addCode("code", u + " " + s + " = " + r.func + "(" + h.join(",") + ");", this.shader_destination), this.setOutputData(0, u);
              }
            }
          }
        }, i("math/func", m), y.title = "Snippet", y.prototype.onPropertyChanged = function (t, e) {
          this.graph && this.graph._version++, "type" == t && this.outputs[0].type != e && (this.disconnectOutput(0), this.outputs[0].type = e);
        }, y.prototype.getTitle = function () {
          return this.flags.collapsed ? this.properties.code : "Snippet";
        }, y.prototype.onGetCode = function (t) {
          if (this.shader_destination && this.isOutputConnected(0)) {
            var e = o(this, 0);
            e || (e = "1.0");
            var i = o(this, 1);
            i || (i = "1.0");
            var s = n(this, 0);

            if (s) {
              var r = this.getInputData(0) || "float",
                  a = this.getInputData(1) || "float",
                  u = this.properties.type;
              if ("T" == r || "T" == a) return null;
              var h = "funcSnippet" + this.id,
                  p = "\n" + u + " " + h + "( " + r + " A, " + a + " B) {\n";
              p += "\t" + u + " C = " + u + "(0.0);\n", p += "\t" + this.properties.code + ";\n", p += "\treturn C;\n}\n", t.addCode("functions", p, this.shader_destination), t.addCode("code", u + " " + s + " = " + h + "(" + e + "," + i + ");", this.shader_destination), this.setOutputData(0, u);
            }
          }
        }, i("utils/snippet", y), x.title = "Rand", x.prototype.onGetCode = function (t) {
          if (this.shader_destination && this.isOutputConnected(0)) {
            var e = n(this, 0);
            t.addUniform("u_rand" + this.id, "float", function () {
              return Math.random();
            }), t.addCode("code", "float " + e + " = u_rand" + this.id + ";", this.shader_destination), this.setOutputData(0, "float");
          }
        }, i("input/rand", x), b.NOISE_TYPES = ["noise", "rand"], b.title = "noise", b.prototype.onGetCode = function (t) {
          if (this.shader_destination && this.isOutputConnected(0)) {
            var e = o(this, 0),
                i = n(this, 0),
                s = this.getInputData(0);
            e || (s = "vec2", e = t.buffer_names.uvs), t.addFunction("noise", b.shader_functions), t.addUniform("u_noise_scale" + this.id, "float", this.properties.scale), "float" == s ? t.addCode("code", "float " + i + " = snoise( vec2(" + e + ") * u_noise_scale" + this.id + ");", this.shader_destination) : "vec2" == s || "vec3" == s ? t.addCode("code", "float " + i + " = snoise(" + e + " * u_noise_scale" + this.id + ");", this.shader_destination) : "vec4" == s && t.addCode("code", "float " + i + " = snoise(" + e + ".xyz * u_noise_scale" + this.id + ");", this.shader_destination), this.setOutputData(0, "float");
          }
        }, i("math/noise", b), b.shader_functions = "\nvec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }\n\nfloat snoise(vec2 v){\n  const vec4 C = vec4(0.211324865405187, 0.366025403784439,-0.577350269189626, 0.024390243902439);\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n  vec2 i1;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod(i, 289.0);\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n  + i.x + vec3(0.0, i1.x, 1.0 ));\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){ \n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //  x0 = x0 - 0. + 0.0 * C \n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n// Permutations\n  i = mod(i, 289.0 ); \n  vec4 p = permute( permute( permute( \n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients\n// ( N*N points uniformly over a square, mapped onto an octahedron.)\n  float n_ = 1.0/7.0; // N=7\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),dot(p2,x2), dot(p3,x3) ) );\n}\n\nvec3 hash3( vec2 p ){\n    vec3 q = vec3( dot(p,vec2(127.1,311.7)), \n\t\t\t\t   dot(p,vec2(269.5,183.3)), \n\t\t\t\t   dot(p,vec2(419.2,371.9)) );\n\treturn fract(sin(q)*43758.5453);\n}\nvec4 hash4( vec3 p ){\n    vec4 q = vec4( dot(p,vec3(127.1,311.7,257.3)), \n\t\t\t\t   dot(p,vec3(269.5,183.3,335.1)), \n\t\t\t\t   dot(p,vec3(314.5,235.1,467.3)), \n\t\t\t\t   dot(p,vec3(419.2,371.9,114.9)) );\n\treturn fract(sin(q)*43758.5453);\n}\n\nfloat iqnoise( in vec2 x, float u, float v ){\n    vec2 p = floor(x);\n    vec2 f = fract(x);\n\t\n\tfloat k = 1.0+63.0*pow(1.0-v,4.0);\n\t\n\tfloat va = 0.0;\n\tfloat wt = 0.0;\n    for( int j=-2; j<=2; j++ )\n    for( int i=-2; i<=2; i++ )\n    {\n        vec2 g = vec2( float(i),float(j) );\n\t\tvec3 o = hash3( p + g )*vec3(u,u,1.0);\n\t\tvec2 r = g - f + o.xy;\n\t\tfloat d = dot(r,r);\n\t\tfloat ww = pow( 1.0-smoothstep(0.0,1.414,sqrt(d)), k );\n\t\tva += o.z*ww;\n\t\twt += ww;\n    }\n\t\n    return va/wt;\n}\n", T.title = "Time", T.prototype.onGetCode = function (t) {
          if (this.shader_destination && this.isOutputConnected(0)) {
            var e = n(this, 0);
            t.addUniform("u_time" + this.id, "float", function () {
              return .001 * getTime();
            }), t.addCode("code", "float " + e + " = u_time" + this.id + ";", this.shader_destination), this.setOutputData(0, "float");
          }
        }, i("input/time", T), E.title = "Dither", E.prototype.onGetCode = function (t) {
          if (this.shader_destination && this.isOutputConnected(0)) {
            var e = o(this, 0),
                i = "float",
                s = n(this, 0),
                r = this.getInputData(0);
            e = k(e, r, "float"), t.addFunction("dither8x8", E.dither_func), t.addCode("code", i + " " + s + " = dither8x8(" + e + ");", this.shader_destination), this.setOutputData(0, i);
          }
        }, E.dither_values = [.515625, .140625, .640625, .046875, .546875, .171875, .671875, .765625, .265625, .890625, .390625, .796875, .296875, .921875, .421875, .203125, .703125, .078125, .578125, .234375, .734375, .109375, .609375, .953125, .453125, .828125, .328125, .984375, .484375, .859375, .359375, .0625, .5625, .1875, .6875, .03125, .53125, .15625, .65625, .8125, .3125, .9375, .4375, .78125, .28125, .90625, .40625, .25, .75, .125, .625, .21875, .71875, .09375, .59375, 1.0001, .5, .875, .375, .96875, .46875, .84375, .34375], E.dither_func = "\n\t\tfloat dither8x8(float brightness) {\n\t\t  vec2 position = vec2(0.0);\n\t\t  #ifdef FRAGMENT\n\t\t\tposition = gl_FragCoord.xy;\n\t\t  #endif\n\t\t  int x = int(mod(position.x, 8.0));\n\t\t  int y = int(mod(position.y, 8.0));\n\t\t  int index = x + y * 8;\n\t\t  float limit = 0.0;\n\t\t  if (x < 8) {\n\t\t\tif(index==0) limit = 0.015625;\n\t\t\t" + E.dither_values.map(function (t, e) {
          return "else if(index== " + (e + 1) + ") limit = " + t + ";";
        }).join("\n") + "\n\t\t  }\n\t\t  return brightness < limit ? 0.0 : 1.0;\n\t\t}\n", i("math/dither", E), w.title = "Remap", w.prototype.onPropertyChanged = function () {
          this.graph && this.graph._version++;
        }, w.prototype.onConnectionsChange = function () {
          var t = this.getInputDataType(0);
          this.outputs[0].type = t || "T";
        }, w.prototype.onGetCode = function (t) {
          if (this.shader_destination && this.isOutputConnected(0)) {
            var e = o(this, 0),
                i = n(this, 0);

            if (e || i) {
              var s = this.getInputDataType(0);
              if (this.outputs[0].type = s, "T" != s) {
                if (e) {
                  var r = L(this.properties.min_value),
                      a = L(this.properties.max_value),
                      u = L(this.properties.min_value2),
                      h = L(this.properties.max_value2);
                  t.addCode("code", s + " " + i + " = ( (" + e + " - " + r + ") / (" + a + " - " + r + ") ) * (" + h + " - " + u + ") + " + u + ";", this.shader_destination), this.setOutputData(0, s);
                } else t.addCode("code", "\t" + s + " " + i + " = " + s + "(0.0);\n");
              } else console.warn("node type is T and cannot be resolved");
            }
          }
        }, i("math/remap", w);
      }
    }(this), function (t) {
      function e() {
        return 1e5 * Math.random() | 0;
      }

      function s() {
        this.addInput("obj", ""), this.addInput("radius", "number"), this.addOutput("out", "geometry"), this.addOutput("points", "[vec3]"), this.properties = {
          radius: 1,
          num_points: 4096,
          generate_normals: !0,
          regular: !1,
          mode: s.SPHERE,
          force_update: !1
        }, this.points = new Float32Array(3 * this.properties.num_points), this.normals = new Float32Array(3 * this.properties.num_points), this.must_update = !0, this.version = 0;
        var t = this;
        this.addWidget("button", "update", null, function () {
          t.must_update = !0;
        }), this.geometry = {
          vertices: null,
          _id: e()
        }, this._old_obj = null, this._last_radius = null;
      }

      function o(t, e) {
        var i = t.length,
            s = 0,
            o = 0,
            n = i;
        if (0 == i) return -1;
        if (1 == i) return 0;

        for (; n >= s;) {
          o = .5 * (n + s) | 0;
          var r = t[o];
          if (r == e) return o;
          if (s == n - 1) return s;
          r < e ? s = o : n = o;
        }

        return o;
      }

      function n() {
        this.addInput("points", "geometry"), this.addOutput("instances", "[mat4]"), this.properties = {
          mode: 1,
          autoupdate: !0
        }, this.must_update = !0, this.matrices = [], this.first_time = !0;
      }

      function r() {
        this.addInput("in", "geometry,[mat4]"), this.addInput("mat4", "mat4"), this.addOutput("out", "geometry"), this.properties = {}, this.geometry = {
          type: "triangles",
          vertices: null,
          _id: e(),
          _version: 0
        }, this._last_geometry_id = -1, this._last_version = -1, this._last_key = "", this.must_update = !0;
      }

      function a() {
        this.addInput("sides", "number"), this.addInput("radius", "number"), this.addOutput("out", "geometry"), this.properties = {
          sides: 6,
          radius: 1,
          uvs: !1
        }, this.geometry = {
          type: "line_loop",
          vertices: null,
          _id: e()
        }, this.geometry_id = -1, this.version = -1, this.must_update = !0, this.last_info = {
          sides: -1,
          radius: -1
        };
      }

      function u() {
        this.addInput("", "geometry"), this.addOutput("", "geometry"), this.properties = {
          top_cap: !0,
          bottom_cap: !0,
          offset: [0, 100, 0]
        }, this.version = -1, this._last_geo_version = -1, this._must_update = !0;
      }

      function h() {
        this.addInput("in", "geometry"), this.addOutput("out", "geometry"), this.properties = {
          code: "V[1] += 0.01 * Math.sin(I + T*0.001);",
          execute_every_frame: !1
        }, this.geometry = null, this.geometry_id = -1, this.version = -1, this.must_update = !0, this.vertices = null, this.func = null;
      }

      function p() {
        this.addInput("in", "geometry"), this.addOutput("out", "geometry"), this.properties = {
          min_dist: .4,
          max_dist: .5,
          max_connections: 0,
          probability: 1
        }, this.geometry_id = -1, this.version = -1, this.my_version = 1, this.must_update = !0;
      }

      function l() {
        this.addInput("mesh", "mesh"), this.addOutput("out", "geometry"), this.geometry = {}, this.last_mesh = null;
      }

      function d() {
        this.addInput("in", "geometry"), this.addOutput("mesh", "mesh"), this.properties = {}, this.version = -1, this.mesh = null;
      }

      function c() {
        this.addInput("mesh", "mesh"), this.addInput("mat4", "mat4"), this.addInput("tex", "texture"), this.properties = {
          enabled: !0,
          primitive: GL.TRIANGLES,
          additive: !1,
          color: [1, 1, 1],
          opacity: 1
        }, this.color = vec4.create([1, 1, 1, 1]), this.model_matrix = mat4.create(), this.uniforms = {
          u_color: this.color,
          u_model: this.model_matrix
        };
      }

      function _() {
        this.addInput("size", "number"), this.addOutput("out", "mesh"), this.properties = {
          type: 1,
          size: 1,
          subdivisions: 32
        }, this.version = 1e5 * Math.random() | 0, this.last_info = {
          type: -1,
          size: -1,
          subdivisions: -1
        };
      }

      function g() {
        this.addInput("in", "geometry"), this.addInput("mat4", "mat4"), this.addInput("tex", "texture"), this.properties = {
          enabled: !0,
          point_size: .1,
          fixed_size: !1,
          additive: !0,
          color: [1, 1, 1],
          opacity: 1
        }, this.color = vec4.create([1, 1, 1, 1]), this.uniforms = {
          u_point_size: 1,
          u_perspective: 1,
          u_point_perspective: 1,
          u_color: this.color
        }, this.geometry_id = -1, this.version = -1, this.mesh = null;
      }

      var f = t.LiteGraph,
          v = new Float32Array(16),
          m = new Float32Array(16),
          y = new Float32Array(16),
          x = new Float32Array(16),
          b = {
        u_view: v,
        u_projection: m,
        u_viewprojection: y,
        u_model: x
      };
      f.LGraphRender = {
        onRequestCameraMatrices: null
      }, t.LGraphPoints3D = s, s.RECTANGLE = 1, s.CIRCLE = 2, s.CUBE = 10, s.SPHERE = 11, s.HEMISPHERE = 12, s.INSIDE_SPHERE = 13, s.OBJECT = 20, s.OBJECT_UNIFORMLY = 21, s.OBJECT_INSIDE = 22, s.MODE_VALUES = {
        rectangle: s.RECTANGLE,
        circle: s.CIRCLE,
        cube: s.CUBE,
        sphere: s.SPHERE,
        hemisphere: s.HEMISPHERE,
        inside_sphere: s.INSIDE_SPHERE,
        object: s.OBJECT,
        object_uniformly: s.OBJECT_UNIFORMLY,
        object_inside: s.OBJECT_INSIDE
      }, s.widgets_info = {
        mode: {
          widget: "combo",
          values: s.MODE_VALUES
        }
      }, s.title = "list of points", s.desc = "returns an array of points", s.prototype.onPropertyChanged = function (t, e) {
        this.must_update = !0;
      }, s.prototype.onExecute = function () {
        var t = this.getInputData(0);
        (t != this._old_obj || t && t._version != this._old_obj_version) && (this._old_obj = t, this.must_update = !0);
        var e = this.getInputData(1);
        null == e && (e = this.properties.radius), this._last_radius != e && (this._last_radius = e, this.must_update = !0), (this.must_update || this.properties.force_update) && (this.must_update = !1, this.updatePoints()), this.geometry.vertices = this.points, this.geometry.normals = this.normals, this.geometry._version = this.version, this.setOutputData(0, this.geometry);
      }, s.prototype.updatePoints = function () {
        var t = 0 | this.properties.num_points;
        t < 1 && (t = 1), this.points && this.points.length == 3 * t || (this.points = new Float32Array(3 * t)), this.properties.generate_normals ? this.normals && this.normals.length == this.points.length || (this.normals = new Float32Array(this.points.length)) : this.normals = null;
        var e = this._last_radius || this.properties.radius,
            i = this.properties.mode,
            o = this.getInputData(0);
        this._old_obj_version = o ? o._version : null, this.points = s.generatePoints(e, t, i, this.points, this.normals, this.properties.regular, o), this.version++;
      }, s.generatePoints = function (t, e, i, o, n, r, a) {
        var u = 3 * e;
        o && o.length == u || (o = new Float32Array(u));
        var h = new Float32Array(3),
            p = new Float32Array([0, 1, 0]);

        if (r) {
          if (i == s.RECTANGLE) {
            for (var l = Math.floor(Math.sqrt(e)), d = 0; d < l; ++d) for (var c = 0; c < l; ++c) {
              var _ = 3 * d + 3 * c * l;

              o[_] = (d / l - .5) * t * 2, o[_ + 1] = 0, o[_ + 2] = (c / l - .5) * t * 2;
            }

            if (o = new Float32Array(o.subarray(0, l * l * 3)), n) for (d = 0; d < n.length; d += 3) n.set(p, d);
          } else if (i == s.SPHERE) {
            for (l = Math.floor(Math.sqrt(e)), d = 0; d < l; ++d) for (c = 0; c < l; ++c) {
              _ = 3 * d + 3 * c * l;
              polarToCartesian(h, d / l * 2 * Math.PI, 2 * (c / l - .5) * Math.PI, t), o[_] = h[0], o[_ + 1] = h[1], o[_ + 2] = h[2];
            }

            o = new Float32Array(o.subarray(0, l * l * 3)), n && s.generateSphericalNormals(o, n);
          } else if (i == s.CIRCLE) {
            for (d = 0; d < u; d += 3) {
              var g = 2 * Math.PI * (d / u);
              o[d] = Math.cos(g) * t, o[d + 1] = 0, o[d + 2] = Math.sin(g) * t;
            }

            if (n) for (d = 0; d < n.length; d += 3) n.set(p, d);
          }
        } else if (i == s.RECTANGLE) {
          for (d = 0; d < u; d += 3) o[d] = (Math.random() - .5) * t * 2, o[d + 1] = 0, o[d + 2] = (Math.random() - .5) * t * 2;

          if (n) for (d = 0; d < n.length; d += 3) n.set(p, d);
        } else if (i == s.CUBE) {
          for (d = 0; d < u; d += 3) o[d] = (Math.random() - .5) * t * 2, o[d + 1] = (Math.random() - .5) * t * 2, o[d + 2] = (Math.random() - .5) * t * 2;

          if (n) for (d = 0; d < n.length; d += 3) n.set(p, d);
        } else i == s.SPHERE ? (s.generateSphere(o, u, t), n && s.generateSphericalNormals(o, n)) : i == s.HEMISPHERE ? (s.generateHemisphere(o, u, t), n && s.generateSphericalNormals(o, n)) : i == s.CIRCLE ? (s.generateInsideCircle(o, u, t), n && s.generateSphericalNormals(o, n)) : i == s.INSIDE_SPHERE ? (s.generateInsideSphere(o, u, t), n && s.generateSphericalNormals(o, n)) : i == s.OBJECT ? s.generateFromObject(o, n, u, a, !1) : i == s.OBJECT_UNIFORMLY ? s.generateFromObject(o, n, u, a, !0) : i == s.OBJECT_INSIDE ? s.generateFromInsideObject(o, u, a) : console.warn("wrong mode in LGraphPoints3D");

        return o;
      }, s.generateSphericalNormals = function (t, e) {
        for (var i = new Float32Array(3), s = 0; s < e.length; s += 3) i[0] = t[s], i[1] = t[s + 1], i[2] = t[s + 2], vec3.normalize(i, i), e.set(i, s);
      }, s.generateSphere = function (t, e, i) {
        for (var s = 0; s < e; s += 3) {
          var o = Math.random(),
              n = Math.random(),
              r = 2 * Math.cos(2 * Math.PI * o) * Math.sqrt(n * (1 - n)),
              a = 1 - 2 * n,
              u = 2 * Math.sin(2 * Math.PI * o) * Math.sqrt(n * (1 - n));
          t[s] = r * i, t[s + 1] = a * i, t[s + 2] = u * i;
        }
      }, s.generateHemisphere = function (t, e, i) {
        for (var s = 0; s < e; s += 3) {
          var o = Math.random(),
              n = Math.random(),
              r = Math.cos(2 * Math.PI * o) * Math.sqrt(1 - n * n),
              a = n,
              u = Math.sin(2 * Math.PI * o) * Math.sqrt(1 - n * n);
          t[s] = r * i, t[s + 1] = a * i, t[s + 2] = u * i;
        }
      }, s.generateInsideCircle = function (t, e, i) {
        for (var s = 0; s < e; s += 3) {
          var o = Math.random(),
              n = Math.random(),
              r = Math.cos(2 * Math.PI * o) * Math.sqrt(1 - n * n),
              a = Math.sin(2 * Math.PI * o) * Math.sqrt(1 - n * n);
          t[s] = r * i, t[s + 1] = 0, t[s + 2] = a * i;
        }
      }, s.generateInsideSphere = function (t, e, i) {
        for (var s = 0; s < e; s += 3) {
          var o = Math.random(),
              n = Math.random(),
              r = 2 * o * Math.PI,
              a = Math.acos(2 * n - 1),
              u = Math.cbrt(Math.random()) * i,
              h = Math.sin(r),
              p = Math.cos(r),
              l = Math.sin(a),
              d = Math.cos(a);
          t[s] = u * l * p, t[s + 1] = u * l * h, t[s + 2] = u * d;
        }
      }, s.generateFromObject = function (t, e, i, s, n) {
        if (s) {
          var r = null,
              a = null,
              u = null,
              h = null;
          if (s.constructor === GL.Mesh && (r = s.vertexBuffers.vertices.data, a = s.vertexBuffers.normals ? s.vertexBuffers.normals.data : null, u = s.indexBuffers.indices ? s.indexBuffers.indices.data : null, u || (u = s.indexBuffers.triangles ? s.indexBuffers.triangles.data : null)), !r) return null;
          var p = u ? u.length / 3 : r.length / 9,
              l = 0;

          if (n) {
            h = new Float32Array(p);

            for (var d = 0; d < p; ++d) {
              u ? (T = 3 * u[3 * d], E = 3 * u[3 * d + 1], w = 3 * u[3 * d + 2]) : (T = 9 * d, E = 9 * d + 3, w = 9 * d + 6);

              var c = r.subarray(T, T + 3),
                  _ = r.subarray(E, E + 3),
                  g = r.subarray(w, w + 3),
                  f = vec3.distance(c, _),
                  v = vec3.distance(_, g),
                  m = vec3.distance(g, c),
                  y = (f + v + m) / 2;

              l += Math.sqrt(y * (y - f) * (y - v) * (y - m)), h[d] = l;
            }

            for (d = 0; d < p; ++d) h[d] /= l;
          }

          for (d = 0; d < i; d += 3) {
            var x = Math.random(),
                b = n ? o(h, x) : Math.floor(x * p),
                T = 0,
                E = 0,
                w = 0;
            u ? (T = 3 * u[3 * b], E = 3 * u[3 * b + 1], w = 3 * u[3 * b + 2]) : (T = 9 * b, E = 9 * b + 3, w = 9 * b + 6);
            y = Math.random();
            var O = Math.random(),
                I = Math.sqrt(y),
                D = 1 - I,
                N = I * (1 - O),
                S = O * I;

            if (t[d] = D * r[T] + N * r[E] + S * r[w], t[d + 1] = D * r[T + 1] + N * r[E + 1] + S * r[w + 1], t[d + 2] = D * r[T + 2] + N * r[E + 2] + S * r[w + 2], e && a) {
              e[d] = D * a[T] + N * a[E] + S * a[w], e[d + 1] = D * a[T + 1] + N * a[E + 1] + S * a[w + 1], e[d + 2] = D * a[T + 2] + N * a[E + 2] + S * a[w + 2];
              var C = e.subarray(d, d + 3);
              vec3.normalize(C, C);
            }
          }
        }
      }, s.generateFromInsideObject = function (t, e, i) {
        if (i && i.constructor === GL.Mesh) {
          var s = i.getBoundingBox();
          i.octree || (i.octree = new GL.Octree(i));

          for (var o = i.octree, n = vec3.create(), r = vec3.fromValues(1, 0, 0), a = vec3.create(), u = 0, h = 0; u < e && h < 10 * t.length;) {
            h += 1;
            var p = vec3.random(a);
            p[0] = (2 * p[0] - 1) * s[3] + s[0], p[1] = (2 * p[1] - 1) * s[4] + s[1], p[2] = (2 * p[2] - 1) * s[5] + s[2], n.set(p);
            var l = o.testRay(n, r, 0, 1e4, !0, GL.Octree.ALL);
            l && l.length % 2 != 0 && (t.set(p, u), u += 3);
          }
        }
      }, f.registerNodeType("geometry/points3D", s), n.NORMAL = 0, n.VERTICAL = 1, n.SPHERICAL = 2, n.RANDOM = 3, n.RANDOM_VERTICAL = 4, n.modes = {
        normal: 0,
        vertical: 1,
        spherical: 2,
        random: 3,
        random_vertical: 4
      }, n.widgets_info = {
        mode: {
          widget: "combo",
          values: n.modes
        }
      }, n.title = "points to inst", n.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          if (this.isOutputConnected(0)) {
            var e = t._version != this._version || t._id != this._geometry_id;
            (e && this.properties.autoupdate || this.first_time) && (this.first_time = !1, this.updateInstances(t)), this.setOutputData(0, this.matrices);
          }
        } else this.setOutputData(0, null);
      }, n.prototype.updateInstances = function (t) {
        var e = t.vertices;
        if (!e) return null;
        var i = t.normals,
            s = this.matrices,
            o = e.length / 3;
        s.length != o && (s.length = o);

        for (var r = mat4.create(), a = vec3.create(), u = (vec3.create(), vec3.fromValues(0, 1, 0)), h = vec3.fromValues(0, 0, -1), p = (vec3.fromValues(1, 0, 0), quat.create()), l = vec3.create(), d = vec3.create(), c = vec3.create(), _ = 0; _ < e.length; _ += 3) {
          var g = _ / 3,
              f = s[g];
          f || (f = s[g] = mat4.create()), f.set(r);
          var v = e.subarray(_, _ + 3);

          switch (this.properties.mode) {
            case n.NORMAL:
              if (mat4.setTranslation(f, v), i) {
                var m = i.subarray(_, _ + 3);
                c.set(m), vec3.normalize(c, c), vec3.cross(d, h, c), vec3.normalize(d, d), vec3.cross(l, d, c), vec3.normalize(l, l), f.set(d, 0), f.set(c, 4), f.set(l, 8), mat4.setTranslation(f, v);
              }

              break;

            case n.VERTICAL:
              mat4.setTranslation(f, v);
              break;

            case n.SPHERICAL:
              l.set(v), vec3.normalize(l, l), vec3.cross(d, u, l), vec3.normalize(d, d), vec3.cross(c, l, d), vec3.normalize(c, c), f.set(d, 0), f.set(c, 4), f.set(l, 8), mat4.setTranslation(f, v);
              break;

            case n.RANDOM:
              a[0] = 2 * Math.random() - 1, a[1] = 2 * Math.random() - 1, a[2] = 2 * Math.random() - 1, vec3.normalize(a, a), quat.setAxisAngle(p, a, 2 * Math.random() * Math.PI), mat4.fromQuat(f, p), mat4.setTranslation(f, v);
              break;

            case n.RANDOM_VERTICAL:
              quat.setAxisAngle(p, u, 2 * Math.random() * Math.PI), mat4.fromQuat(f, p), mat4.setTranslation(f, v);
          }
        }

        this._version = t._version, this._geometry_id = t._id;
      }, f.registerNodeType("geometry/points_to_instances", n), r.title = "Transform", r.prototype.onExecute = function () {
        var t = this.getInputData(0),
            e = this.getInputData(1);
        if (t) if (t.constructor !== Array) {
          if (t.vertices && t.vertices.length) {
            var i = t;
            if (this.outputs[0].type = "geometry", this.isOutputConnected(0)) if (e) {
              var s = typedArrayToArray(e).join(",");
              (this.must_update || i._id != this._last_geometry_id || i._version != this._last_version || s != this._last_key) && (this.updateGeometry(i, e), this._last_key = s, this._last_version = i._version, this._last_geometry_id = i._id, this.must_update = !1), this.setOutputData(0, this.geometry);
            } else this.setOutputData(0, i);
          }
        } else {
          if (0 == t.length) return;
          if (this.outputs[0].type = "[mat4]", !this.isOutputConnected(0)) return;
          if (!e) return void this.setOutputData(0, t);
          this._output || (this._output = new Array()), this._output.length != t.length && (this._output.length = t.length);

          for (var o = 0; o < t.length; ++o) {
            var n = this._output[o];
            n || (n = this._output[o] = mat4.create()), mat4.multiply(n, t[o], e);
          }

          this.setOutputData(0, this._output);
        }
      }, r.prototype.updateGeometry = function (t, e) {
        var i = t.vertices,
            s = this.geometry.vertices;
        s && s.length == i.length || (s = this.geometry.vertices = new Float32Array(i.length));

        for (var o = vec3.create(), n = 0, r = s.length; n < r; n += 3) o[0] = i[n], o[1] = i[n + 1], o[2] = i[n + 2], mat4.multiplyVec3(o, e, o), s[n] = o[0], s[n + 1] = o[1], s[n + 2] = o[2];

        if (t.normals) {
          this.geometry.normals && this.geometry.normals.length == t.normals.length || (this.geometry.normals = new Float32Array(t.normals.length));
          var a = this.geometry.normals,
              u = mat4.invert(mat4.create(), e);
          u && mat4.transpose(u, u);
          var h = t.normals;

          for (n = 0, r = a.length; n < r; n += 3) o[0] = h[n], o[1] = h[n + 1], o[2] = h[n + 2], mat4.multiplyVec3(o, u, o), a[n] = o[0], a[n + 1] = o[1], a[n + 2] = o[2];
        }

        this.geometry.type = t.type, this.geometry._version++;
      }, f.registerNodeType("geometry/transform", r), a.title = "Polygon", a.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputOrProperty("sides"),
              e = this.getInputOrProperty("radius");
          t = 0 | Math.max(3, t), this.last_info.sides == t && this.last_info.radius == e || this.updateGeometry(t, e), this.setOutputData(0, this.geometry);
        }
      }, a.prototype.updateGeometry = function (t, e) {
        var i = 3 * t,
            s = this.geometry.vertices;
        s && s.length == i || (s = this.geometry.vertices = new Float32Array(3 * t));
        var o = 2 * Math.PI / t,
            n = this.properties.uvs;
        n && (uvs = this.geometry.coords = new Float32Array(3 * t));

        for (var r = 0; r < t; ++r) {
          var a = o * -r,
              u = Math.cos(a) * e,
              h = 0,
              p = Math.sin(a) * e;
          s[3 * r] = u, s[3 * r + 1] = h, s[3 * r + 2] = p;
        }

        this.geometry._id = ++this.geometry_id, this.geometry._version = ++this.version, this.last_info.sides = t, this.last_info.radius = e;
      }, f.registerNodeType("geometry/polygon", a), u.title = "extrude", u.prototype.onPropertyChanged = function (t, e) {
        this._must_update = !0;
      }, u.prototype.onExecute = function () {
        var t = this.getInputData(0);
        t && this.isOutputConnected(0) && ((t.version != this._last_geo_version || this._must_update) && (this._geo = this.extrudeGeometry(t, this._geo), this._geo && (this._geo.version = this.version++), this._must_update = !1), this.setOutputData(0, this._geo));
      }, u.prototype.extrudeGeometry = function (t) {
        var i = t.vertices,
            s = i.length / 3,
            o = vec3.create(),
            n = vec3.create(),
            r = vec3.create(),
            a = vec3.create(),
            u = new Float32Array(this.properties.offset);
        if ("line_loop" == t.type) for (var h = new Float32Array(6 * s * 3), p = 0, l = 0, d = i.length; l < d; l += 3) o[0] = i[l], o[1] = i[l + 1], o[2] = i[l + 2], l + 3 < d ? (n[0] = i[l + 3], n[1] = i[l + 4], n[2] = i[l + 5]) : (n[0] = i[0], n[1] = i[1], n[2] = i[2]), vec3.add(r, o, u), vec3.add(a, n, u), h.set(o, p), p += 3, h.set(n, p), p += 3, h.set(r, p), p += 3, h.set(n, p), p += 3, h.set(a, p), p += 3, h.set(r, p), p += 3;
        var c = {
          _id: e(),
          type: "triangles",
          vertices: h
        };
        return c;
      }, f.registerNodeType("geometry/extrude", u), h.title = "geoeval", h.desc = "eval code", h.widgets_info = {
        code: {
          widget: "code"
        }
      }, h.prototype.onConfigure = function (t) {
        this.compileCode();
      }, h.prototype.compileCode = function () {
        if (this.properties.code) try {
          this.func = new Function("V", "I", "T", this.properties.code), this.boxcolor = "#AFA", this.must_update = !0;
        } catch (t) {
          this.boxcolor = "red";
        }
      }, h.prototype.onPropertyChanged = function (t, e) {
        "code" == t && (this.properties.code = e, this.compileCode());
      }, h.prototype.onExecute = function () {
        var t = this.getInputData(0);
        if (t) if (this.func) {
          if (this.geometry_id != t._id || this.version != t._version || this.must_update || this.properties.execute_every_frame) {
            this.must_update = !1, this.geometry_id = t._id, this.properties.execute_every_frame ? this.version++ : this.version = t._version;
            var e = this.func,
                i = getTime();

            for (var s in this.geometry || (this.geometry = {}), t) null != t[s] && (t[s].constructor == Float32Array ? this.geometry[s] = new Float32Array(t[s]) : this.geometry[s] = t[s]);

            this.geometry._id = t._id, this.properties.execute_every_frame ? this.geometry._version = this.version : this.geometry._version = t._version + 1;
            var o = vec3.create(),
                n = this.vertices;
            n && this.vertices.length == t.vertices.length ? n.set(t.vertices) : n = this.vertices = new Float32Array(t.vertices);

            for (s = 0; s < n.length; s += 3) o[0] = n[s], o[1] = n[s + 1], o[2] = n[s + 2], e(o, s / 3, i), n[s] = o[0], n[s + 1] = o[1], n[s + 2] = o[2];

            this.geometry.vertices = n;
          }

          this.setOutputData(0, this.geometry);
        } else this.setOutputData(0, t);
      }, f.registerNodeType("geometry/eval", h), p.title = "connect points", p.desc = "adds indices between near points", p.prototype.onPropertyChanged = function (t, e) {
        this.must_update = !0;
      }, p.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          if (this.geometry_id != t._id || this.version != t._version || this.must_update) {
            for (var i in this.must_update = !1, this.geometry_id = t._id, this.version = t._version, this.geometry = {}, t) this.geometry[i] = t[i];

            this.geometry._id = e(), this.geometry._version = this.my_version++;
            var s = t.vertices,
                o = s.length,
                n = this.properties.min_dist,
                r = this.properties.max_dist,
                a = this.properties.probability,
                u = this.properties.max_connections,
                h = [];

            for (i = 0; i < o; i += 3) for (var p = s[i], l = s[i + 1], d = s[i + 2], c = 0, _ = i + 3; _ < o; _ += 3) {
              var g = s[_],
                  f = s[_ + 1],
                  v = s[_ + 2],
                  m = Math.sqrt((p - g) * (p - g) + (l - f) * (l - f) + (d - v) * (d - v));
              if (!(m > r || m < n || a < 1 && a < Math.random()) && (h.push(i / 3, _ / 3), c += 1, u && c > u)) break;
            }

            this.geometry.indices = this.indices = new Uint32Array(h);
          }

          this.indices && this.indices.length ? (this.geometry.indices = this.indices, this.setOutputData(0, this.geometry)) : this.setOutputData(0, null);
        }
      }, f.registerNodeType("geometry/connectPoints", p), "undefined" != typeof GL && (l.title = "to geometry", l.desc = "converts a mesh to geometry", l.prototype.onExecute = function () {
        var t = this.getInputData(0);

        if (t) {
          if (t != this.last_mesh) {
            for (i in this.last_mesh = t, t.vertexBuffers) {
              var s = t.vertexBuffers[i];
              this.geometry[i] = s.data;
            }

            t.indexBuffers.triangles && (this.geometry.indices = t.indexBuffers.triangles.data), this.geometry._id = e(), this.geometry._version = 0;
          }

          this.setOutputData(0, this.geometry), this.geometry && this.setOutputData(1, this.geometry.vertices);
        }
      }, f.registerNodeType("geometry/toGeometry", l), d.title = "Geo to Mesh", d.prototype.updateMesh = function (t) {
        for (var e in this.mesh || (this.mesh = new GL.Mesh()), t) if ("_" != e[0]) {
          var i = t[e],
              s = GL.Mesh.common_buffers[e];

          if (s || "indices" == e) {
            var o = s ? s.spacing : 3,
                n = this.mesh.vertexBuffers[e];
            n && n.data.length == i.length ? (n.data.set(i), n.upload(GL.DYNAMIC_DRAW)) : n = new GL.Buffer("indices" == e ? GL.ELEMENT_ARRAY_BUFFER : GL.ARRAY_BUFFER, i, o, GL.DYNAMIC_DRAW), this.mesh.addBuffer(e, n);
          }
        }

        if (this.mesh.vertexBuffers.normals && this.mesh.vertexBuffers.normals.data.length != this.mesh.vertexBuffers.vertices.data.length) {
          var r = new Float32Array([0, 1, 0]),
              a = new Float32Array(this.mesh.vertexBuffers.vertices.data.length);

          for (e = 0; e < a.length; e += 3) a.set(r, e);

          n = new GL.Buffer(GL.ARRAY_BUFFER, a, 3), this.mesh.addBuffer("normals", n);
        }

        return this.mesh.updateBoundingBox(), this.geometry_id = this.mesh.id = t._id, this.version = this.mesh.version = t._version, this.mesh;
      }, d.prototype.onExecute = function () {
        var t = this.getInputData(0);
        t && (this.version == t._version && this.geometry_id == t._id || this.updateMesh(t), this.setOutputData(0, this.mesh));
      }, f.registerNodeType("geometry/toMesh", d), c.title = "Render Mesh", c.desc = "renders a mesh flat", c.PRIMITIVE_VALUES = {
        points: GL.POINTS,
        lines: GL.LINES,
        line_loop: GL.LINE_LOOP,
        line_strip: GL.LINE_STRIP,
        triangles: GL.TRIANGLES,
        triangle_fan: GL.TRIANGLE_FAN,
        triangle_strip: GL.TRIANGLE_STRIP
      }, c.widgets_info = {
        primitive: {
          widget: "combo",
          values: c.PRIMITIVE_VALUES
        },
        color: {
          widget: "color"
        }
      }, c.prototype.onExecute = function () {
        if (this.properties.enabled) {
          var t = this.getInputData(0);
          if (t) if (f.LGraphRender.onRequestCameraMatrices) {
            f.LGraphRender.onRequestCameraMatrices(v, m, y);
            var e = null,
                i = this.getInputData(2);
            i ? (e = gl.shaders.textured, e || (e = gl.shaders.textured = new GL.Shader(g.vertex_shader_code, g.fragment_shader_code, {
              USE_TEXTURE: ""
            }))) : (e = gl.shaders.flat, e || (e = gl.shaders.flat = new GL.Shader(g.vertex_shader_code, g.fragment_shader_code))), this.color.set(this.properties.color), this.color[3] = this.properties.opacity;
            var s = this.model_matrix,
                o = this.getInputData(1);
            o ? s.set(o) : mat4.identity(s), this.uniforms.u_point_size = 1;
            var n = this.properties.primitive;
            e.uniforms(b), e.uniforms(this.uniforms), this.properties.opacity >= 1 ? gl.disable(gl.BLEND) : gl.enable(gl.BLEND), gl.enable(gl.DEPTH_TEST), this.properties.additive ? (gl.blendFunc(gl.SRC_ALPHA, gl.ONE), gl.depthMask(!1)) : gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            var r = "indices";
            t.indexBuffers.triangles && (r = "triangles"), e.draw(t, n, r), gl.disable(gl.BLEND), gl.depthMask(!0);
          } else console.warn("cannot render geometry, LiteGraph.onRequestCameraMatrices is null, remember to fill this with a callback(view_matrix, projection_matrix,viewprojection_matrix) to use 3D rendering from the graph");
        }
      }, f.registerNodeType("geometry/render_mesh", c), _.title = "Primitive", _.VALID = {
        CUBE: 1,
        PLANE: 2,
        CYLINDER: 3,
        SPHERE: 4,
        CIRCLE: 5,
        HEMISPHERE: 6,
        ICOSAHEDRON: 7,
        CONE: 8,
        QUAD: 9
      }, _.widgets_info = {
        type: {
          widget: "combo",
          values: _.VALID
        }
      }, _.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.getInputOrProperty("size");
          this.last_info.type == this.properties.type && this.last_info.size == t && this.last_info.subdivisions == this.properties.subdivisions || this.updateMesh(this.properties.type, t, this.properties.subdivisions), this.setOutputData(0, this._mesh);
        }
      }, _.prototype.updateMesh = function (t, e, i) {
        switch (i = 0 | Math.max(0, i), t) {
          case 1:
            this._mesh = GL.Mesh.cube({
              size: e,
              normals: !0,
              coords: !0
            });
            break;

          case 2:
            this._mesh = GL.Mesh.plane({
              size: e,
              xz: !0,
              detail: i,
              normals: !0,
              coords: !0
            });
            break;

          case 3:
            this._mesh = GL.Mesh.cylinder({
              size: e,
              subdivisions: i,
              normals: !0,
              coords: !0
            });
            break;

          case 4:
            this._mesh = GL.Mesh.sphere({
              size: e,
              long: i,
              lat: i,
              normals: !0,
              coords: !0
            });
            break;

          case 5:
            this._mesh = GL.Mesh.circle({
              size: e,
              slices: i,
              normals: !0,
              coords: !0
            });
            break;

          case 6:
            this._mesh = GL.Mesh.sphere({
              size: e,
              long: i,
              lat: i,
              normals: !0,
              coords: !0,
              hemi: !0
            });
            break;

          case 7:
            this._mesh = GL.Mesh.icosahedron({
              size: e,
              subdivisions: i
            });
            break;

          case 8:
            this._mesh = GL.Mesh.cone({
              radius: e,
              height: e,
              subdivisions: i
            });
            break;

          case 9:
            this._mesh = GL.Mesh.plane({
              size: e,
              xz: !1,
              detail: i,
              normals: !0,
              coords: !0
            });
        }

        this.last_info.type = t, this.last_info.size = e, this.last_info.subdivisions = i, this._mesh.version = this.version++;
      }, f.registerNodeType("geometry/mesh_primitive", _), g.title = "renderPoints", g.desc = "render points with a texture", g.widgets_info = {
        color: {
          widget: "color"
        }
      }, g.prototype.updateMesh = function (t) {
        this.buffer;
        this.buffer && this.buffer.data && this.buffer.data.length == t.vertices.length ? (this.buffer.data.set(t.vertices), this.buffer.upload(GL.DYNAMIC_DRAW)) : this.buffer = new GL.Buffer(GL.ARRAY_BUFFER, t.vertices, 3, GL.DYNAMIC_DRAW), this.mesh || (this.mesh = new GL.Mesh()), this.mesh.addBuffer("vertices", this.buffer), this.geometry_id = this.mesh.id = t._id, this.version = this.mesh.version = t._version;
      }, g.prototype.onExecute = function () {
        if (this.properties.enabled) {
          var t = this.getInputData(0);
          if (t) if (this.version == t._version && this.geometry_id == t._id || this.updateMesh(t), f.LGraphRender.onRequestCameraMatrices) {
            f.LGraphRender.onRequestCameraMatrices(v, m, y);
            var e = null,
                i = this.getInputData(2);
            i ? (e = gl.shaders.textured_points, e || (e = gl.shaders.textured_points = new GL.Shader(g.vertex_shader_code, g.fragment_shader_code, {
              USE_TEXTURED_POINTS: ""
            }))) : (e = gl.shaders.points, e || (e = gl.shaders.points = new GL.Shader(g.vertex_shader_code, g.fragment_shader_code, {
              USE_POINTS: ""
            }))), this.color.set(this.properties.color), this.color[3] = this.properties.opacity;
            var s = this.getInputData(1);
            s ? x.set(s) : mat4.identity(x), this.uniforms.u_point_size = this.properties.point_size, this.uniforms.u_point_perspective = this.properties.fixed_size ? 0 : 1, this.uniforms.u_perspective = gl.viewport_data[3] * m[5], e.uniforms(b), e.uniforms(this.uniforms), this.properties.opacity >= 1 ? gl.disable(gl.BLEND) : gl.enable(gl.BLEND), gl.enable(gl.DEPTH_TEST), this.properties.additive ? (gl.blendFunc(gl.SRC_ALPHA, gl.ONE), gl.depthMask(!1)) : gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA), e.draw(this.mesh, GL.POINTS), gl.disable(gl.BLEND), gl.depthMask(!0);
          } else console.warn("cannot render geometry, LiteGraph.onRequestCameraMatrices is null, remember to fill this with a callback(view_matrix, projection_matrix,viewprojection_matrix) to use 3D rendering from the graph");
        }
      }, f.registerNodeType("geometry/render_points", g), g.vertex_shader_code = "\t\tprecision mediump float;\n\t\tattribute vec3 a_vertex;\n\t\tvarying vec3 v_vertex;\n\t\tattribute vec3 a_normal;\n\t\tvarying vec3 v_normal;\n\t\t#ifdef USE_COLOR\n\t\t\tattribute vec4 a_color;\n\t\t\tvarying vec4 v_color;\n\t\t#endif\n\t\tattribute vec2 a_coord;\n\t\tvarying vec2 v_coord;\n\t\t#ifdef USE_SIZE\n\t\t\tattribute float a_extra;\n\t\t#endif\n\t\t#ifdef USE_INSTANCING\n\t\t\tattribute mat4 u_model;\n\t\t#else\n\t\t\tuniform mat4 u_model;\n\t\t#endif\n\t\tuniform mat4 u_viewprojection;\n\t\tuniform float u_point_size;\n\t\tuniform float u_perspective;\n\t\tuniform float u_point_perspective;\n\t\tfloat computePointSize(float radius, float w)\n\t\t{\n\t\t\tif(radius < 0.0)\n\t\t\t\treturn -radius;\n\t\t\treturn u_perspective * radius / w;\n\t\t}\n\t\tvoid main() {\n\t\t\tv_coord = a_coord;\n\t\t\t#ifdef USE_COLOR\n\t\t\t\tv_color = a_color;\n\t\t\t#endif\n\t\t\tv_vertex = ( u_model * vec4( a_vertex, 1.0 )).xyz;\n\t\t\tv_normal = ( u_model * vec4( a_normal, 0.0 )).xyz;\n\t\t\tgl_Position = u_viewprojection * vec4(v_vertex,1.0);\n\t\t\tgl_PointSize = u_point_size;\n\t\t\t#ifdef USE_SIZE\n\t\t\t\tgl_PointSize = a_extra;\n\t\t\t#endif\n\t\t\tif(u_point_perspective != 0.0)\n\t\t\t\tgl_PointSize = computePointSize( gl_PointSize, gl_Position.w );\n\t\t}\t", g.fragment_shader_code = "\t\tprecision mediump float;\n\t\tuniform vec4 u_color;\n\t\t#ifdef USE_COLOR\n\t\t\tvarying vec4 v_color;\n\t\t#endif\n\t\tvarying vec2 v_coord;\n\t\tuniform sampler2D u_texture;\n\t\tvoid main() {\n\t\t\tvec4 color = u_color;\n\t\t\t#ifdef USE_TEXTURED_POINTS\n\t\t\t\tcolor *= texture2D(u_texture, gl_PointCoord.xy);\n\t\t\t#else\n\t\t\t\t#ifdef USE_TEXTURE\n\t\t\t\t  color *= texture2D(u_texture, v_coord);\n\t\t\t\t  if(color.a < 0.1)\n\t\t\t\t\tdiscard;\n\t\t\t\t#endif\n\t\t\t\t#ifdef USE_POINTS\n\t\t\t\t\tfloat dist = length( gl_PointCoord.xy - vec2(0.5) );\n\t\t\t\t\tif( dist > 0.45 )\n\t\t\t\t\t\tdiscard;\n\t\t\t\t#endif\n\t\t\t#endif\n\t\t\t#ifdef USE_COLOR\n\t\t\t\tcolor *= v_color;\n\t\t\t#endif\n\t\t\tgl_FragColor = color;\n\t\t}\t");
    }(this), function (t) {
      var e = t.LiteGraph,
          i = t.LGraphTexture;

      if ("undefined" != typeof GL) {
        function s() {
          this.addInput("Texture", "Texture"), this.addInput("Aberration", "number"), this.addInput("Distortion", "number"), this.addInput("Blur", "number"), this.addOutput("Texture", "Texture"), this.properties = {
            aberration: 1,
            distortion: 1,
            blur: 1,
            precision: i.DEFAULT
          }, s._shader || (s._shader = new GL.Shader(GL.Shader.SCREEN_VERTEX_SHADER, s.pixel_shader), s._texture = new GL.Texture(3, 1, {
            format: gl.RGB,
            wrap: gl.CLAMP_TO_EDGE,
            magFilter: gl.LINEAR,
            minFilter: gl.LINEAR,
            pixel_data: [255, 0, 0, 0, 255, 0, 0, 0, 255]
          }));
        }

        function o() {
          this.addInput("Texture", "Texture"), this.addInput("Blurred", "Texture"), this.addInput("Mask", "Texture"), this.addInput("Threshold", "number"), this.addOutput("Texture", "Texture"), this.properties = {
            shape: "",
            size: 10,
            alpha: 1,
            threshold: 1,
            high_precision: !1
          };
        }

        function n() {
          this.addInput("Texture", "Texture"), this.addInput("value1", "number"), this.addInput("value2", "number"), this.addOutput("Texture", "Texture"), this.properties = {
            fx: "halftone",
            value1: 1,
            value2: 1,
            precision: i.DEFAULT
          };
        }

        function r() {
          this.addInput("Tex.", "Texture"), this.addInput("intensity", "number"), this.addOutput("Texture", "Texture"), this.properties = {
            intensity: 1,
            invert: !1,
            precision: i.DEFAULT
          }, r._shader || (r._shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, r.pixel_shader));
        }

        s.title = "Lens", s.desc = "Camera Lens distortion", s.widgets_info = {
          precision: {
            widget: "combo",
            values: i.MODE_VALUES
          }
        }, s.prototype.onExecute = function () {
          var t = this.getInputData(0);

          if (this.properties.precision !== i.PASS_THROUGH) {
            if (t) {
              this._tex = i.getTargetTexture(t, this._tex, this.properties.precision);
              var e = this.properties.aberration;
              this.isInputConnected(1) && (e = this.getInputData(1), this.properties.aberration = e);
              var o = this.properties.distortion;
              this.isInputConnected(2) && (o = this.getInputData(2), this.properties.distortion = o);
              var n = this.properties.blur;
              this.isInputConnected(3) && (n = this.getInputData(3), this.properties.blur = n), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
              var r = Mesh.getScreenQuad(),
                  a = s._shader;
              this._tex.drawTo(function () {
                t.bind(0), a.uniforms({
                  u_texture: 0,
                  u_aberration: e,
                  u_distortion: o,
                  u_blur: n
                }).draw(r);
              }), this.setOutputData(0, this._tex);
            }
          } else this.setOutputData(0, t);
        }, s.pixel_shader = "precision highp float;\n\t\t\tprecision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform vec2 u_camera_planes;\n\t\t\tuniform float u_aberration;\n\t\t\tuniform float u_distortion;\n\t\t\tuniform float u_blur;\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t\tvec2 coord = v_coord;\n\t\t\t\tfloat dist = distance(vec2(0.5), coord);\n\t\t\t\tvec2 dist_coord = coord - vec2(0.5);\n\t\t\t\tfloat percent = 1.0 + ((0.5 - dist) / 0.5) * u_distortion;\n\t\t\t\tdist_coord *= percent;\n\t\t\t\tcoord = dist_coord + vec2(0.5);\n\t\t\t\tvec4 color = texture2D(u_texture,coord, u_blur * dist);\n\t\t\t\tcolor.r = texture2D(u_texture,vec2(0.5) + dist_coord * (1.0+0.01*u_aberration), u_blur * dist ).r;\n\t\t\t\tcolor.b = texture2D(u_texture,vec2(0.5) + dist_coord * (1.0-0.01*u_aberration), u_blur * dist ).b;\n\t\t\t\tgl_FragColor = color;\n\t\t\t}\n\t\t\t", e.registerNodeType("fx/lens", s), t.LGraphFXLens = s, o.title = "Bokeh", o.desc = "applies an Bokeh effect", o.widgets_info = {
          shape: {
            widget: "texture"
          }
        }, o.prototype.onExecute = function () {
          var t = this.getInputData(0),
              e = this.getInputData(1),
              s = this.getInputData(2);

          if (t && s && this.properties.shape) {
            e || (e = t);
            var n = i.getTexture(this.properties.shape);

            if (n) {
              var r = this.properties.threshold;
              this.isInputConnected(3) && (r = this.getInputData(3), this.properties.threshold = r);
              var a = gl.UNSIGNED_BYTE;
              this.properties.high_precision && (a = gl.half_float_ext ? gl.HALF_FLOAT_OES : gl.FLOAT), this._temp_texture && this._temp_texture.type == a && this._temp_texture.width == t.width && this._temp_texture.height == t.height || (this._temp_texture = new GL.Texture(t.width, t.height, {
                type: a,
                format: gl.RGBA,
                filter: gl.LINEAR
              }));
              this.properties.size;
              var u = o._first_shader;
              u || (u = o._first_shader = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, o._first_pixel_shader));
              var h = o._second_shader;
              h || (h = o._second_shader = new GL.Shader(o._second_vertex_shader, o._second_pixel_shader));
              var p = this._points_mesh;
              p && p._width == t.width && p._height == t.height && 2 == p._spacing || (p = this.createPointsMesh(t.width, t.height, 2));
              var l = Mesh.getScreenQuad(),
                  d = this.properties.size,
                  c = (this.properties.min_light, this.properties.alpha);
              gl.disable(gl.DEPTH_TEST), gl.disable(gl.BLEND), this._temp_texture.drawTo(function () {
                t.bind(0), e.bind(1), s.bind(2), u.uniforms({
                  u_texture: 0,
                  u_texture_blur: 1,
                  u_mask: 2,
                  u_texsize: [t.width, t.height]
                }).draw(l);
              }), this._temp_texture.drawTo(function () {
                gl.enable(gl.BLEND), gl.blendFunc(gl.ONE, gl.ONE), t.bind(0), n.bind(3), h.uniforms({
                  u_texture: 0,
                  u_mask: 2,
                  u_shape: 3,
                  u_alpha: c,
                  u_threshold: r,
                  u_pointSize: d,
                  u_itexsize: [1 / t.width, 1 / t.height]
                }).draw(p, gl.POINTS);
              }), this.setOutputData(0, this._temp_texture);
            }
          } else this.setOutputData(0, t);
        }, o.prototype.createPointsMesh = function (t, e, i) {
          for (var s = Math.round(t / i), o = Math.round(e / i), n = new Float32Array(s * o * 2), r = -1, a = 2 / t * i, u = 2 / e * i, h = 0; h < o; ++h) {
            for (var p = -1, l = 0; l < s; ++l) {
              var d = h * s * 2 + 2 * l;
              n[d] = p, n[d + 1] = r, p += a;
            }

            r += u;
          }

          return this._points_mesh = GL.Mesh.load({
            vertices2D: n
          }), this._points_mesh._width = t, this._points_mesh._height = e, this._points_mesh._spacing = i, this._points_mesh;
        }, o._first_pixel_shader = "precision highp float;\n\t\t\tprecision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform sampler2D u_texture_blur;\n\t\t\tuniform sampler2D u_mask;\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\t\t\t\tvec4 blurred_color = texture2D(u_texture_blur, v_coord);\n\t\t\t\tfloat mask = texture2D(u_mask, v_coord).x;\n\t\t\t   gl_FragColor = mix(color, blurred_color, mask);\n\t\t\t}\n\t\t\t", o._second_vertex_shader = "precision highp float;\n\t\t\tattribute vec2 a_vertex2D;\n\t\t\tvarying vec4 v_color;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform sampler2D u_mask;\n\t\t\tuniform vec2 u_itexsize;\n\t\t\tuniform float u_pointSize;\n\t\t\tuniform float u_threshold;\n\t\t\tvoid main() {\n\t\t\t\tvec2 coord = a_vertex2D * 0.5 + 0.5;\n\t\t\t\tv_color = texture2D( u_texture, coord );\n\t\t\t\tv_color += texture2D( u_texture, coord + vec2(u_itexsize.x, 0.0) );\n\t\t\t\tv_color += texture2D( u_texture, coord + vec2(0.0, u_itexsize.y));\n\t\t\t\tv_color += texture2D( u_texture, coord + u_itexsize);\n\t\t\t\tv_color *= 0.25;\n\t\t\t\tfloat mask = texture2D(u_mask, coord).x;\n\t\t\t\tfloat luminance = length(v_color) * mask;\n\t\t\t\t/*luminance /= (u_pointSize*u_pointSize)*0.01 */;\n\t\t\t\tluminance -= u_threshold;\n\t\t\t\tif(luminance < 0.0)\n\t\t\t\t{\n\t\t\t\t\tgl_Position.x = -100.0;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\tgl_PointSize = u_pointSize;\n\t\t\t\tgl_Position = vec4(a_vertex2D,0.0,1.0);\n\t\t\t}\n\t\t\t", o._second_pixel_shader = "precision highp float;\n\t\t\tvarying vec4 v_color;\n\t\t\tuniform sampler2D u_shape;\n\t\t\tuniform float u_alpha;\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t\tvec4 color = texture2D( u_shape, gl_PointCoord );\n\t\t\t\tcolor *= v_color * u_alpha;\n\t\t\t\tgl_FragColor = color;\n\t\t\t}\n", e.registerNodeType("fx/bokeh", o), t.LGraphFXBokeh = o, n.title = "FX", n.desc = "applies an FX from a list", n.widgets_info = {
          fx: {
            widget: "combo",
            values: ["halftone", "pixelate", "lowpalette", "noise", "gamma"]
          },
          precision: {
            widget: "combo",
            values: i.MODE_VALUES
          }
        }, n.shaders = {}, n.prototype.onExecute = function () {
          if (this.isOutputConnected(0)) {
            var e = this.getInputData(0);

            if (this.properties.precision !== i.PASS_THROUGH) {
              if (e) {
                this._tex = i.getTargetTexture(e, this._tex, this.properties.precision);
                var s = this.properties.value1;
                this.isInputConnected(1) && (s = this.getInputData(1), this.properties.value1 = s);
                var o = this.properties.value2;
                this.isInputConnected(2) && (o = this.getInputData(2), this.properties.value2 = o);
                var r = this.properties.fx,
                    a = n.shaders[r];

                if (!a) {
                  var u = n["pixel_shader_" + r];
                  if (!u) return;
                  a = n.shaders[r] = new GL.Shader(Shader.SCREEN_VERTEX_SHADER, u);
                }

                gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
                var h,
                    p = Mesh.getScreenQuad(),
                    l = t.LS ? LS.Renderer._current_camera : null;
                h = l ? [LS.Renderer._current_camera.near, LS.Renderer._current_camera.far] : [1, 100];
                var d = null;
                "noise" == r && (d = i.getNoiseTexture()), this._tex.drawTo(function () {
                  e.bind(0), "noise" == r && d.bind(1), a.uniforms({
                    u_texture: 0,
                    u_noise: 1,
                    u_size: [e.width, e.height],
                    u_rand: [Math.random(), Math.random()],
                    u_value1: s,
                    u_value2: o,
                    u_camera_planes: h
                  }).draw(p);
                }), this.setOutputData(0, this._tex);
              }
            } else this.setOutputData(0, e);
          }
        }, n.pixel_shader_halftone = "precision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform vec2 u_camera_planes;\n\t\t\tuniform vec2 u_size;\n\t\t\tuniform float u_value1;\n\t\t\tuniform float u_value2;\n\t\t\t\n\t\t\tfloat pattern() {\n\t\t\t\tfloat s = sin(u_value1 * 3.1415), c = cos(u_value1 * 3.1415);\n\t\t\t\tvec2 tex = v_coord * u_size.xy;\n\t\t\t\tvec2 point = vec2(\n\t\t\t\t   c * tex.x - s * tex.y ,\n\t\t\t\t   s * tex.x + c * tex.y \n\t\t\t\t) * u_value2;\n\t\t\t\treturn (sin(point.x) * sin(point.y)) * 4.0;\n\t\t\t}\n\t\t\tvoid main() {\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\t\t\t\tfloat average = (color.r + color.g + color.b) / 3.0;\n\t\t\t\tgl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n\t\t\t}\n", n.pixel_shader_pixelate = "precision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform vec2 u_camera_planes;\n\t\t\tuniform vec2 u_size;\n\t\t\tuniform float u_value1;\n\t\t\tuniform float u_value2;\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t\tvec2 coord = vec2( floor(v_coord.x * u_value1) / u_value1, floor(v_coord.y * u_value2) / u_value2 );\n\t\t\t\tvec4 color = texture2D(u_texture, coord);\n\t\t\t\tgl_FragColor = color;\n\t\t\t}\n", n.pixel_shader_lowpalette = "precision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform vec2 u_camera_planes;\n\t\t\tuniform vec2 u_size;\n\t\t\tuniform float u_value1;\n\t\t\tuniform float u_value2;\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\t\t\t\tgl_FragColor = floor(color * u_value1) / u_value1;\n\t\t\t}\n", n.pixel_shader_noise = "precision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform sampler2D u_noise;\n\t\t\tuniform vec2 u_size;\n\t\t\tuniform float u_value1;\n\t\t\tuniform float u_value2;\n\t\t\tuniform vec2 u_rand;\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\t\t\t\tvec3 noise = texture2D(u_noise, v_coord * vec2(u_size.x / 512.0, u_size.y / 512.0) + u_rand).xyz - vec3(0.5);\n\t\t\t\tgl_FragColor = vec4( color.xyz + noise * u_value1, color.a );\n\t\t\t}\n", n.pixel_shader_gamma = "precision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform float u_value1;\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\t\t\t\tfloat gamma = 1.0 / u_value1;\n\t\t\t\tgl_FragColor = vec4( pow( color.xyz, vec3(gamma) ), color.a );\n\t\t\t}\n", e.registerNodeType("fx/generic", n), t.LGraphFXGeneric = n, r.title = "Vigneting", r.desc = "Vigneting", r.widgets_info = {
          precision: {
            widget: "combo",
            values: i.MODE_VALUES
          }
        }, r.prototype.onExecute = function () {
          var t = this.getInputData(0);

          if (this.properties.precision !== i.PASS_THROUGH) {
            if (t) {
              this._tex = i.getTargetTexture(t, this._tex, this.properties.precision);
              var e = this.properties.intensity;
              this.isInputConnected(1) && (e = this.getInputData(1), this.properties.intensity = e), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
              var s = Mesh.getScreenQuad(),
                  o = r._shader,
                  n = this.properties.invert;
              this._tex.drawTo(function () {
                t.bind(0), o.uniforms({
                  u_texture: 0,
                  u_intensity: e,
                  u_isize: [1 / t.width, 1 / t.height],
                  u_invert: n ? 1 : 0
                }).draw(s);
              }), this.setOutputData(0, this._tex);
            }
          } else this.setOutputData(0, t);
        }, r.pixel_shader = "precision highp float;\n\t\t\tprecision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform float u_intensity;\n\t\t\tuniform int u_invert;\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t\tfloat luminance = 1.0 - length( v_coord - vec2(0.5) ) * 1.414;\n\t\t\t\tvec4 color = texture2D(u_texture, v_coord);\n\t\t\t\tif(u_invert == 1)\n\t\t\t\t\tluminance = 1.0 - luminance;\n\t\t\t\tluminance = mix(1.0, luminance, u_intensity);\n\t\t\t   gl_FragColor = vec4( luminance * color.xyz, color.a);\n\t\t\t}\n\t\t\t", e.registerNodeType("fx/vigneting", r), t.LGraphFXVigneting = r;
      }
    }(this), function (t) {
      function e(t) {
        this.channel = 0, this.cmd = 0, this.data = new Uint32Array(3), t && this.setup(t);
      }

      function i(t, e) {
        if (!navigator.requestMIDIAccess) return this.error = "not suppoorted", void (e ? e("Not supported") : console.error("MIDI NOT SUPPORTED, enable by chrome://flags"));
        this.on_ready = t, this.state = {
          note: [],
          cc: []
        }, this.input_ports = null, this.input_ports_info = [], this.output_ports = null, this.output_ports_info = [], navigator.requestMIDIAccess().then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
      }

      function s() {
        this.addOutput("on_midi", g.EVENT), this.addOutput("out", "midi"), this.properties = {
          port: 0
        }, this._last_midi_event = null, this._current_midi_event = null, this.boxcolor = "#AAA", this._last_time = 0;
        var t = this;
        new i(function (e) {
          t._midi = e, t._waiting && t.onStart(), t._waiting = !1;
        });
      }

      function o() {
        this.addInput("send", g.EVENT), this.properties = {
          port: 0
        };
        var t = this;
        new i(function (e) {
          t._midi = e, t.widget.options.values = t.getMIDIOutputs();
        }), this.widget = this.addWidget("combo", "Device", this.properties.port, {
          property: "port",
          values: this.getMIDIOutputs.bind(this)
        }), this.size = [340, 60];
      }

      function n() {
        this.addInput("on_midi", g.EVENT), this._str = "", this.size = [200, 40];
      }

      function r() {
        this.properties = {
          channel: -1,
          cmd: -1,
          min_value: -1,
          max_value: -1
        };
        var t = this;
        this._learning = !1, this.addWidget("button", "Learn", "", function () {
          t._learning = !0, t.boxcolor = "#FA3";
        }), this.addInput("in", g.EVENT), this.addOutput("on_midi", g.EVENT), this.boxcolor = "#AAA";
      }

      function a() {
        this.properties = {
          channel: 0,
          cmd: 144,
          value1: 1,
          value2: 1
        }, this.addInput("send", g.EVENT), this.addInput("assign", g.EVENT), this.addOutput("on_midi", g.EVENT), this.midi_event = new e(), this.gate = !1;
      }

      function u() {
        this.properties = {
          cc: 1,
          value: 0
        }, this.addOutput("value", "number");
      }

      function h() {
        this.addInput("generate", g.ACTION), this.addInput("scale", "string"), this.addInput("octave", "number"), this.addOutput("note", g.EVENT), this.properties = {
          notes: "A,A#,B,C,C#,D,D#,E,F,F#,G,G#",
          octave: 2,
          duration: .5,
          mode: "sequence"
        }, this.notes_pitches = h.processScale(this.properties.notes), this.sequence_index = 0;
      }

      function p() {
        this.properties = {
          amount: 0
        }, this.addInput("in", g.ACTION), this.addInput("amount", "number"), this.addOutput("out", g.EVENT), this.midi_event = new e();
      }

      function l() {
        this.properties = {
          scale: "A,A#,B,C,C#,D,D#,E,F,F#,G,G#"
        }, this.addInput("note", g.ACTION), this.addInput("scale", "string"), this.addOutput("out", g.EVENT), this.valid_notes = new Array(12), this.offset_notes = new Array(12), this.processScale(this.properties.scale);
      }

      function d() {
        this.properties = {
          url: "",
          autoplay: !0
        }, this.addInput("play", g.ACTION), this.addInput("pause", g.ACTION), this.addOutput("note", g.EVENT), this._midi = null, this._current_time = 0, this._playing = !1, "undefined" == typeof MidiParser && (console.error("midi-parser.js not included, LGMidiPlay requires that library: https://raw.githubusercontent.com/colxi/midi-parser-js/master/src/main.js"), this.boxcolor = "red");
      }

      function c() {
        if (this.properties = {
          volume: .5,
          duration: 1
        }, this.addInput("note", g.ACTION), this.addInput("volume", "number"), this.addInput("duration", "number"), this.addOutput("note", g.EVENT), "undefined" == typeof AudioSynth) console.error("Audiosynth.js not included, LGMidiPlay requires that library"), this.boxcolor = "red";else {
          var t = this.synth = new AudioSynth();
          this.instrument = t.createInstrument("piano");
        }
      }

      function _() {
        this.properties = {
          num_octaves: 2,
          start_octave: 2
        }, this.addInput("note", g.ACTION), this.addInput("reset", g.ACTION), this.addOutput("note", g.EVENT), this.size = [400, 100], this.keys = [], this._last_key = -1;
      }

      var g = t.LiteGraph,
          f = "#243";

      for (var v in g.MIDIEvent = e, e.prototype.fromJSON = function (t) {
        this.setup(t.data);
      }, e.prototype.setup = function (t) {
        var i = t;
        t.constructor === Object && (i = t.data), this.data.set(i);
        var s = i[0];
        this.status = s;
        var o = 240 & s;
        this.cmd = s >= 240 ? s : o, this.cmd == e.NOTEON && 0 == this.velocity && (this.cmd = e.NOTEOFF), this.cmd_str = e.commands[this.cmd] || "", (o >= e.NOTEON || o <= e.NOTEOFF) && (this.channel = 15 & s);
      }, Object.defineProperty(e.prototype, "velocity", {
        get: function () {
          return this.cmd == e.NOTEON ? this.data[2] : -1;
        },
        set: function (t) {
          this.data[2] = t;
        },
        enumerable: !0
      }), e.notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], e.note_to_index = {
        A: 0,
        "A#": 1,
        B: 2,
        C: 3,
        "C#": 4,
        D: 5,
        "D#": 6,
        E: 7,
        F: 8,
        "F#": 9,
        G: 10,
        "G#": 11
      }, Object.defineProperty(e.prototype, "note", {
        get: function () {
          return this.cmd != e.NOTEON ? -1 : e.toNoteString(this.data[1], !0);
        },
        set: function (t) {
          throw "notes cannot be assigned this way, must modify the data[1]";
        },
        enumerable: !0
      }), Object.defineProperty(e.prototype, "octave", {
        get: function () {
          if (this.cmd != e.NOTEON) return -1;
          var t = this.data[1] - 24;
          return Math.floor(t / 12 + 1);
        },
        set: function (t) {
          throw "octave cannot be assigned this way, must modify the data[1]";
        },
        enumerable: !0
      }), e.prototype.getPitch = function () {
        return 440 * Math.pow(2, (this.data[1] - 69) / 12);
      }, e.computePitch = function (t) {
        return 440 * Math.pow(2, (t - 69) / 12);
      }, e.prototype.getCC = function () {
        return this.data[1];
      }, e.prototype.getCCValue = function () {
        return this.data[2];
      }, e.prototype.getPitchBend = function () {
        return this.data[1] + (this.data[2] << 7) - 8192;
      }, e.computePitchBend = function (t, e) {
        return t + (e << 7) - 8192;
      }, e.prototype.setCommandFromString = function (t) {
        this.cmd = e.computeCommandFromString(t);
      }, e.computeCommandFromString = function (t) {
        if (!t) return 0;
        if (t && t.constructor === Number) return t;

        switch (t = t.toUpperCase(), t) {
          case "NOTE ON":
          case "NOTEON":
            return e.NOTEON;

          case "NOTE OFF":
          case "NOTEOFF":
            return e.NOTEON;

          case "KEY PRESSURE":
          case "KEYPRESSURE":
            return e.KEYPRESSURE;

          case "CONTROLLER CHANGE":
          case "CONTROLLERCHANGE":
          case "CC":
            return e.CONTROLLERCHANGE;

          case "PROGRAM CHANGE":
          case "PROGRAMCHANGE":
          case "PC":
            return e.PROGRAMCHANGE;

          case "CHANNEL PRESSURE":
          case "CHANNELPRESSURE":
            return e.CHANNELPRESSURE;

          case "PITCH BEND":
          case "PITCHBEND":
            return e.PITCHBEND;

          case "TIME TICK":
          case "TIMETICK":
            return e.TIMETICK;

          default:
            return Number(t);
        }
      }, e.toNoteString = function (t, i) {
        t = Math.round(t);
        var s = t - 21,
            o = Math.floor((t - 24) / 12 + 1);
        return s %= 12, s < 0 && (s = 12 + s), e.notes[s] + (i ? "" : o);
      }, e.NoteStringToPitch = function (t) {
        t = t.toUpperCase();
        var i = t[0],
            s = 4;
        "#" == t[1] ? (i += "#", t.length > 2 && (s = Number(t[2]))) : t.length > 1 && (s = Number(t[1]));
        var o = e.note_to_index[i];
        return null == o ? null : 12 * (s - 1) + o + 21;
      }, e.prototype.toString = function () {
        var t = this.channel + ". ";

        switch (this.cmd) {
          case e.NOTEON:
            t += "NOTEON " + e.toNoteString(this.data[1]);
            break;

          case e.NOTEOFF:
            t += "NOTEOFF " + e.toNoteString(this.data[1]);
            break;

          case e.CONTROLLERCHANGE:
            t += "CC " + this.data[1] + " " + this.data[2];
            break;

          case e.PROGRAMCHANGE:
            t += "PC " + this.data[1];
            break;

          case e.PITCHBEND:
            t += "PITCHBEND " + this.getPitchBend();
            break;

          case e.KEYPRESSURE:
            t += "KEYPRESS " + this.data[1];
        }

        return t;
      }, e.prototype.toHexString = function () {
        for (var t = 0; t < this.data.length; t++) this.data[t].toString(16) + " ";
      }, e.prototype.toJSON = function () {
        return {
          data: [this.data[0], this.data[1], this.data[2]],
          object_class: "MIDIEvent"
        };
      }, e.NOTEOFF = 128, e.NOTEON = 144, e.KEYPRESSURE = 160, e.CONTROLLERCHANGE = 176, e.PROGRAMCHANGE = 192, e.CHANNELPRESSURE = 208, e.PITCHBEND = 224, e.TIMETICK = 248, e.commands = {
        128: "note off",
        144: "note on",
        160: "key pressure",
        176: "controller change",
        192: "program change",
        208: "channel pressure",
        224: "pitch bend",
        240: "system",
        242: "Song pos",
        243: "Song select",
        246: "Tune request",
        248: "time tick",
        250: "Start Song",
        251: "Continue Song",
        252: "Stop Song",
        254: "Sensing",
        255: "Reset"
      }, e.commands_short = {
        128: "NOTEOFF",
        144: "NOTEOFF",
        160: "KEYP",
        176: "CC",
        192: "PC",
        208: "CP",
        224: "PB",
        240: "SYS",
        242: "POS",
        243: "SELECT",
        246: "TUNEREQ",
        248: "TT",
        250: "START",
        251: "CONTINUE",
        252: "STOP",
        254: "SENS",
        255: "RESET"
      }, e.commands_reversed = {}, e.commands) e.commands_reversed[e.commands[v]] = v;

      i.input = null, i.MIDIEvent = e, i.prototype.onMIDISuccess = function (t) {
        console.log("MIDI ready!"), console.log(t), this.midi = t, this.updatePorts(), this.on_ready && this.on_ready(this);
      }, i.prototype.updatePorts = function () {
        var t = this.midi;
        this.input_ports = t.inputs, this.input_ports_info = [], this.output_ports = t.outputs, this.output_ports_info = [];

        for (var e = 0, i = this.input_ports.values(), s = i.next(); s && !1 === s.done;) {
          var o = s.value;
          this.input_ports_info.push(o), console.log("Input port [type:'" + o.type + "'] id:'" + o.id + "' manufacturer:'" + o.manufacturer + "' name:'" + o.name + "' version:'" + o.version + "'"), e++, s = i.next();
        }

        this.num_input_ports = e, e = 0;

        for (i = this.output_ports.values(), s = i.next(); s && !1 === s.done;) {
          o = s.value;
          this.output_ports_info.push(o), console.log("Output port [type:'" + o.type + "'] id:'" + o.id + "' manufacturer:'" + o.manufacturer + "' name:'" + o.name + "' version:'" + o.version + "'"), e++, s = i.next();
        }

        this.num_output_ports = e;
      }, i.prototype.onMIDIFailure = function (t) {
        console.error("Failed to get MIDI access - " + t);
      }, i.prototype.openInputPort = function (t, s) {
        var o = this.input_ports.get("input-" + t);
        if (!o) return !1;
        i.input = this;
        var n = this;
        return o.onmidimessage = function (t) {
          var o = new e(t.data);
          n.updateState(o), s && s(t.data, o), i.on_message && i.on_message(t.data, o);
        }, console.log("port open: ", o), !0;
      }, i.parseMsg = function (t) {}, i.prototype.updateState = function (t) {
        switch (t.cmd) {
          case e.NOTEON:
            this.state.note[0 | t.value1] = t.value2;
            break;

          case e.NOTEOFF:
            this.state.note[0 | t.value1] = 0;
            break;

          case e.CONTROLLERCHANGE:
            this.state.cc[t.getCC()] = t.getCCValue();
        }
      }, i.prototype.sendMIDI = function (t, s) {
        if (s) {
          var o = this.output_ports_info[t];
          o && (i.output = this, s.constructor === e ? o.send(s.data) : o.send(s));
        }
      }, s.MIDIInterface = i, s.title = "MIDI Input", s.desc = "Reads MIDI from a input port", s.color = f, s.prototype.getPropertyInfo = function (t) {
        if (this._midi && "port" == t) {
          for (var e = {}, i = 0; i < this._midi.input_ports_info.length; ++i) {
            var s = this._midi.input_ports_info[i];
            e[i] = i + ".- " + s.name + " version:" + s.version;
          }

          return {
            type: "enum",
            values: e
          };
        }
      }, s.prototype.onStart = function () {
        this._midi ? this._midi.openInputPort(this.properties.port, this.onMIDIEvent.bind(this)) : this._waiting = !0;
      }, s.prototype.onMIDIEvent = function (t, i) {
        this._last_midi_event = i, this.boxcolor = "#AFA", this._last_time = g.getTime(), this.trigger("on_midi", i), i.cmd == e.NOTEON ? this.trigger("on_noteon", i) : i.cmd == e.NOTEOFF ? this.trigger("on_noteoff", i) : i.cmd == e.CONTROLLERCHANGE ? this.trigger("on_cc", i) : i.cmd == e.PROGRAMCHANGE ? this.trigger("on_pc", i) : i.cmd == e.PITCHBEND && this.trigger("on_pitchbend", i);
      }, s.prototype.onDrawBackground = function (t) {
        if (this.boxcolor = "#AAA", !this.flags.collapsed && this._last_midi_event) {
          t.fillStyle = "white";
          var e = g.getTime(),
              i = 1 - Math.max(0, .001 * (e - this._last_time));

          if (i > 0) {
            var s = t.globalAlpha;
            t.globalAlpha *= i, t.font = "12px Tahoma", t.fillText(this._last_midi_event.toString(), 2, .5 * this.size[1] + 3), t.globalAlpha = s;
          }
        }
      }, s.prototype.onExecute = function () {
        if (this.outputs) for (var t = this._last_midi_event, e = 0; e < this.outputs.length; ++e) {
          var i = this.outputs[e],
              s = null;

          switch (i.name) {
            case "midi":
              s = this._midi;
              break;

            case "last_midi":
              s = t;
              break;

            default:
              continue;
          }

          this.setOutputData(e, s);
        }
      }, s.prototype.onGetOutputs = function () {
        return [["last_midi", "midi"], ["on_midi", g.EVENT], ["on_noteon", g.EVENT], ["on_noteoff", g.EVENT], ["on_cc", g.EVENT], ["on_pc", g.EVENT], ["on_pitchbend", g.EVENT]];
      }, g.registerNodeType("midi/input", s), o.MIDIInterface = i, o.title = "MIDI Output", o.desc = "Sends MIDI to output channel", o.color = f, o.prototype.onGetPropertyInfo = function (t) {
        if (this._midi && "port" == t) {
          var e = this.getMIDIOutputs();
          return {
            type: "enum",
            values: e
          };
        }
      }, o.default_ports = {
        0: "unknown"
      }, o.prototype.getMIDIOutputs = function () {
        var t = {};
        if (!this._midi) return o.default_ports;
        if (this._midi.output_ports_info) for (var e = 0; e < this._midi.output_ports_info.length; ++e) {
          var i = this._midi.output_ports_info[e];

          if (i) {
            var s = e + ".- " + i.name + " version:" + i.version;
            t[e] = s;
          }
        }
        return t;
      }, o.prototype.onAction = function (t, e) {
        this._midi && ("send" == t && this._midi.sendMIDI(this.properties.port, e), this.trigger("midi", e));
      }, o.prototype.onGetInputs = function () {
        return [["send", g.ACTION]];
      }, o.prototype.onGetOutputs = function () {
        return [["on_midi", g.EVENT]];
      }, g.registerNodeType("midi/output", o), n.title = "MIDI Show", n.desc = "Shows MIDI in the graph", n.color = f, n.prototype.getTitle = function () {
        return this.flags.collapsed ? this._str : this.title;
      }, n.prototype.onAction = function (t, i) {
        i && (i.constructor === e ? this._str = i.toString() : this._str = "???");
      }, n.prototype.onDrawForeground = function (t) {
        this._str && !this.flags.collapsed && (t.font = "30px Arial", t.fillText(this._str, 10, .8 * this.size[1]));
      }, n.prototype.onGetInputs = function () {
        return [["in", g.ACTION]];
      }, n.prototype.onGetOutputs = function () {
        return [["on_midi", g.EVENT]];
      }, g.registerNodeType("midi/show", n), r.title = "MIDI Filter", r.desc = "Filters MIDI messages", r.color = f, r["@cmd"] = {
        type: "enum",
        title: "Command",
        values: e.commands_reversed
      }, r.prototype.getTitle = function () {
        var t = null;
        return t = -1 == this.properties.cmd ? "Nothing" : e.commands_short[this.properties.cmd] || "Unknown", -1 != this.properties.min_value && -1 != this.properties.max_value && (t += " " + (this.properties.min_value == this.properties.max_value ? this.properties.max_value : this.properties.min_value + ".." + this.properties.max_value)), "Filter: " + t;
      }, r.prototype.onPropertyChanged = function (t, i) {
        if ("cmd" == t) {
          var s = Number(i);
          isNaN(s) && (s = e.commands[i] || 0), this.properties.cmd = s;
        }
      }, r.prototype.onAction = function (t, i) {
        if (i && i.constructor === e) {
          if (this._learning) this._learning = !1, this.boxcolor = "#AAA", this.properties.channel = i.channel, this.properties.cmd = i.cmd, this.properties.min_value = this.properties.max_value = i.data[1];else {
            if (-1 != this.properties.channel && i.channel != this.properties.channel) return;
            if (-1 != this.properties.cmd && i.cmd != this.properties.cmd) return;
            if (-1 != this.properties.min_value && i.data[1] < this.properties.min_value) return;
            if (-1 != this.properties.max_value && i.data[1] > this.properties.max_value) return;
          }
          this.trigger("on_midi", i);
        }
      }, g.registerNodeType("midi/filter", r), a.title = "MIDIEvent", a.desc = "Create a MIDI Event", a.color = f, a.prototype.onAction = function (t, i) {
        if ("assign" == t) return this.properties.channel = i.channel, this.properties.cmd = i.cmd, this.properties.value1 = i.data[1], this.properties.value2 = i.data[2], void (i.cmd == e.NOTEON ? this.gate = !0 : i.cmd == e.NOTEOFF && (this.gate = !1));
        i = this.midi_event;
        i.channel = this.properties.channel, this.properties.cmd && this.properties.cmd.constructor === String ? i.setCommandFromString(this.properties.cmd) : i.cmd = this.properties.cmd, i.data[0] = i.cmd | i.channel, i.data[1] = Number(this.properties.value1), i.data[2] = Number(this.properties.value2), this.trigger("on_midi", i);
      }, a.prototype.onExecute = function () {
        var t = this.properties;
        if (this.inputs) for (var i = 0; i < this.inputs.length; ++i) {
          var s = this.inputs[i];
          if (-1 != s.link) switch (s.name) {
            case "note":
              var o = this.getInputData(i);
              null != o && (o.constructor === String && (o = e.NoteStringToPitch(o)), this.properties.value1 = (0 | o) % 255);
              break;

            case "cmd":
              o = this.getInputData(i);
              null != o && (this.properties.cmd = o);
              break;

            case "value1":
              o = this.getInputData(i);
              null != o && (this.properties.value1 = Math.clamp(0 | o, 0, 127));
              break;

            case "value2":
              o = this.getInputData(i);
              null != o && (this.properties.value2 = Math.clamp(0 | o, 0, 127));
          }
        }
        if (this.outputs) for (i = 0; i < this.outputs.length; ++i) {
          var n = this.outputs[i];
          o = null;

          switch (n.name) {
            case "midi":
              o = new e(), o.setup([t.cmd, t.value1, t.value2]), o.channel = t.channel;
              break;

            case "command":
              o = t.cmd;
              break;

            case "cc":
              o = t.value1;
              break;

            case "cc_value":
              o = t.value2;
              break;

            case "note":
              o = t.cmd == e.NOTEON || t.cmd == e.NOTEOFF ? t.value1 : null;
              break;

            case "velocity":
              o = t.cmd == e.NOTEON ? t.value2 : null;
              break;

            case "pitch":
              o = t.cmd == e.NOTEON ? e.computePitch(t.value1) : null;
              break;

            case "pitchbend":
              o = t.cmd == e.PITCHBEND ? e.computePitchBend(t.value1, t.value2) : null;
              break;

            case "gate":
              o = this.gate;
              break;

            default:
              continue;
          }

          null !== o && this.setOutputData(i, o);
        }
      }, a.prototype.onPropertyChanged = function (t, i) {
        "cmd" == t && (this.properties.cmd = e.computeCommandFromString(i));
      }, a.prototype.onGetInputs = function () {
        return [["cmd", "number"], ["note", "number"], ["value1", "number"], ["value2", "number"]];
      }, a.prototype.onGetOutputs = function () {
        return [["midi", "midi"], ["on_midi", g.EVENT], ["command", "number"], ["note", "number"], ["velocity", "number"], ["cc", "number"], ["cc_value", "number"], ["pitch", "number"], ["gate", "bool"], ["pitchbend", "number"]];
      }, g.registerNodeType("midi/event", a), u.title = "MIDICC", u.desc = "gets a Controller Change", u.color = f, u.prototype.onExecute = function () {
        this.properties;
        i.input && (this.properties.value = i.input.state.cc[this.properties.cc]), this.setOutputData(0, this.properties.value);
      }, g.registerNodeType("midi/cc", u), h.title = "MIDI Generator", h.desc = "Generates a random MIDI note", h.color = f, h.processScale = function (t) {
        for (var i = t.split(","), s = 0; s < i.length; ++s) {
          var o = i[s];
          2 == o.length && "#" != o[1] || o.length > 2 ? i[s] = -g.MIDIEvent.NoteStringToPitch(o) : i[s] = e.note_to_index[o] || 0;
        }

        return i;
      }, h.prototype.onPropertyChanged = function (t, e) {
        "notes" == t && (this.notes_pitches = h.processScale(e));
      }, h.prototype.onExecute = function () {
        var t = this.getInputData(2);
        null != t && (this.properties.octave = t);
        var e = this.getInputData(1);
        e && (this.notes_pitches = h.processScale(e));
      }, h.prototype.onAction = function (t, i) {
        var s = 0,
            o = this.notes_pitches.length,
            n = 0;
        "sequence" == this.properties.mode ? n = this.sequence_index = (this.sequence_index + 1) % o : "random" == this.properties.mode && (n = Math.floor(Math.random() * o));
        var r = this.notes_pitches[n];
        s = r >= 0 ? r + 12 * (this.properties.octave - 1) + 33 : -r;
        i = new e();
        i.setup([e.NOTEON, s, 10]);
        var a = this.properties.duration || 1;
        this.trigger("note", i), setTimeout(function () {
          var t = new e();
          t.setup([e.NOTEOFF, s, 0]), this.trigger("note", t);
        }.bind(this), 1e3 * a);
      }, g.registerNodeType("midi/generator", h), p.title = "MIDI Transpose", p.desc = "Transpose a MIDI note", p.color = f, p.prototype.onAction = function (t, i) {
        i && i.constructor === e && (i.data[0] == e.NOTEON || i.data[0] == e.NOTEOFF ? (this.midi_event = new e(), this.midi_event.setup(i.data), this.midi_event.data[1] = Math.round(this.midi_event.data[1] + this.properties.amount), this.trigger("out", this.midi_event)) : this.trigger("out", i));
      }, p.prototype.onExecute = function () {
        var t = this.getInputData(1);
        null != t && (this.properties.amount = t);
      }, g.registerNodeType("midi/transpose", p), l.title = "MIDI Quantize Pitch", l.desc = "Transpose a MIDI note tp fit an scale", l.color = f, l.prototype.onPropertyChanged = function (t, e) {
        "scale" == t && this.processScale(e);
      }, l.prototype.processScale = function (t) {
        this._current_scale = t, this.notes_pitches = h.processScale(t);

        for (var e = 0; e < 12; ++e) this.valid_notes[e] = -1 != this.notes_pitches.indexOf(e);

        for (e = 0; e < 12; ++e) if (this.valid_notes[e]) this.offset_notes[e] = 0;else for (var i = 1; i < 12; ++i) {
          if (this.valid_notes[(e - i) % 12]) {
            this.offset_notes[e] = -i;
            break;
          }

          if (this.valid_notes[(e + i) % 12]) {
            this.offset_notes[e] = i;
            break;
          }
        }
      }, l.prototype.onAction = function (t, i) {
        if (i && i.constructor === e) if (i.data[0] == e.NOTEON || i.data[0] == e.NOTEOFF) {
          this.midi_event = new e(), this.midi_event.setup(i.data);
          var s = i.note,
              o = e.note_to_index[s],
              n = this.offset_notes[o];
          this.midi_event.data[1] += n, this.trigger("out", this.midi_event);
        } else this.trigger("out", i);
      }, l.prototype.onExecute = function () {
        var t = this.getInputData(1);
        null != t && t != this._current_scale && this.processScale(t);
      }, g.registerNodeType("midi/quantize", l), d.title = "MIDI fromFile", d.desc = "Plays a MIDI file", d.color = f, d.prototype.onAction = function (t) {
        "play" == t ? this.play() : "pause" == t && (this._playing = !this._playing);
      }, d.prototype.onPropertyChanged = function (t, e) {
        "url" == t && this.loadMIDIFile(e);
      }, d.prototype.onExecute = function () {
        if (this._midi && this._playing) {
          this._current_time += this.graph.elapsed_time;

          for (var t = 100 * this._current_time, i = 0; i < this._midi.tracks; ++i) {
            var s = this._midi.track[i];
            s._last_pos || (s._last_pos = 0, s._time = 0);
            var o = s.event[s._last_pos];

            if (o && s._time + o.deltaTime <= t && (s._last_pos++, s._time += o.deltaTime, o.data)) {
              var n = o.type << 4 + o.channel,
                  r = new e();
              r.setup([n, o.data[0], o.data[1]]), this.trigger("note", r);
            }
          }
        }
      }, d.prototype.play = function () {
        if (this._playing = !0, this._current_time = 0, this._midi) for (var t = 0; t < this._midi.tracks; ++t) {
          var e = this._midi.track[t];
          e._last_pos = 0, e._time = 0;
        }
      }, d.prototype.loadMIDIFile = function (t) {
        var e = this;
        g.fetchFile(t, "arraybuffer", function (t) {
          e.boxcolor = "#AFA", e._midi = MidiParser.parse(new Uint8Array(t)), e.properties.autoplay && e.play();
        }, function (t) {
          e.boxcolor = "#FAA", e._midi = null;
        });
      }, d.prototype.onDropFile = function (t) {
        this.properties.url = "", this.loadMIDIFile(t);
      }, g.registerNodeType("midi/fromFile", d), c.title = "MIDI Play", c.desc = "Plays a MIDI note", c.color = f, c.prototype.onAction = function (t, i) {
        if (i && i.constructor === e) {
          if (this.instrument && i.data[0] == e.NOTEON) {
            var s = i.note;
            if (!s || "undefined" == s || s.constructor !== String) return;
            this.instrument.play(s, i.octave, this.properties.duration, this.properties.volume);
          }

          this.trigger("note", i);
        }
      }, c.prototype.onExecute = function () {
        var t = this.getInputData(1);
        null != t && (this.properties.volume = t);
        var e = this.getInputData(2);
        null != e && (this.properties.duration = e);
      }, g.registerNodeType("midi/play", c), _.title = "MIDI Keys", _.desc = "Keyboard to play notes", _.color = f, _.keys = [{
        x: 0,
        w: 1,
        h: 1,
        t: 0
      }, {
        x: .75,
        w: .5,
        h: .6,
        t: 1
      }, {
        x: 1,
        w: 1,
        h: 1,
        t: 0
      }, {
        x: 1.75,
        w: .5,
        h: .6,
        t: 1
      }, {
        x: 2,
        w: 1,
        h: 1,
        t: 0
      }, {
        x: 2.75,
        w: .5,
        h: .6,
        t: 1
      }, {
        x: 3,
        w: 1,
        h: 1,
        t: 0
      }, {
        x: 4,
        w: 1,
        h: 1,
        t: 0
      }, {
        x: 4.75,
        w: .5,
        h: .6,
        t: 1
      }, {
        x: 5,
        w: 1,
        h: 1,
        t: 0
      }, {
        x: 5.75,
        w: .5,
        h: .6,
        t: 1
      }, {
        x: 6,
        w: 1,
        h: 1,
        t: 0
      }], _.prototype.onDrawForeground = function (t) {
        if (!this.flags.collapsed) {
          var e = 12 * this.properties.num_octaves;
          this.keys.length = e;
          var i = this.size[0] / (7 * this.properties.num_octaves),
              s = this.size[1];
          t.globalAlpha = 1;

          for (var o = 0; o < 2; o++) for (var n = 0; n < e; ++n) {
            var r = _.keys[n % 12];

            if (r.t == o) {
              var a = Math.floor(n / 12),
                  u = 7 * a * i + r.x * i;
              t.fillStyle = 0 == o ? this.keys[n] ? "#CCC" : "white" : this.keys[n] ? "#333" : "black", t.fillRect(u + 1, 0, i * r.w - 2, s * r.h);
            }
          }
        }
      }, _.prototype.getKeyIndex = function (t) {
        this.properties.num_octaves;

        for (var e = this.size[0] / (7 * this.properties.num_octaves), i = this.size[1], s = 1; s >= 0; s--) for (var o = 0; o < this.keys.length; ++o) {
          var n = _.keys[o % 12];

          if (n.t == s) {
            var r = Math.floor(o / 12),
                a = 7 * r * e + n.x * e,
                u = e * n.w,
                h = i * n.h;
            if (!(t[0] < a || t[0] > a + u || t[1] > h)) return o;
          }
        }

        return -1;
      }, _.prototype.onAction = function (t, i) {
        if ("reset" != t) {
          if (i && i.constructor === e) {
            var s = i,
                o = 12 * (this.properties.start_octave - 1) + 29,
                n = s.data[1] - o;
            n >= 0 && n < this.keys.length && (s.data[0] == e.NOTEON ? this.keys[n] = !0 : s.data[0] == e.NOTEOFF && (this.keys[n] = !1)), this.trigger("note", s);
          }
        } else for (var r = 0; r < this.keys.length; ++r) this.keys[r] = !1;
      }, _.prototype.onMouseDown = function (t, i) {
        if (!(i[1] < 0)) {
          var s = this.getKeyIndex(i);
          this.keys[s] = !0, this._last_key = s;
          var o = 12 * (this.properties.start_octave - 1) + 29 + s,
              n = new e();
          return n.setup([e.NOTEON, o, 100]), this.trigger("note", n), !0;
        }
      }, _.prototype.onMouseMove = function (t, i) {
        if (!(i[1] < 0 || -1 == this._last_key)) {
          this.setDirtyCanvas(!0);
          var s = this.getKeyIndex(i);
          if (this._last_key == s) return !0;
          this.keys[this._last_key] = !1;
          var o = 12 * (this.properties.start_octave - 1) + 29 + this._last_key,
              n = new e();
          n.setup([e.NOTEOFF, o, 100]), this.trigger("note", n), this.keys[s] = !0;
          o = 12 * (this.properties.start_octave - 1) + 29 + s, n = new e();
          return n.setup([e.NOTEON, o, 100]), this.trigger("note", n), this._last_key = s, !0;
        }
      }, _.prototype.onMouseUp = function (t, i) {
        if (!(i[1] < 0)) {
          var s = this.getKeyIndex(i);
          this.keys[s] = !1, this._last_key = -1;
          var o = 12 * (this.properties.start_octave - 1) + 29 + s,
              n = new e();
          return n.setup([e.NOTEOFF, o, 100]), this.trigger("note", n), !0;
        }
      }, g.registerNodeType("midi/keys", _);
    }(this), function (t) {
      function e() {
        this.properties = {
          src: "",
          gain: .5,
          loop: !0,
          autoplay: !0,
          playbackRate: 1
        }, this._loading_audio = !1, this._audiobuffer = null, this._audionodes = [], this._last_sourcenode = null, this.addOutput("out", "audio"), this.addInput("gain", "number");
        var t = m.getAudioContext();
        this.audionode = t.createGain(), this.audionode.graphnode = this, this.audionode.gain.value = this.properties.gain, this.properties.src && this.loadSound(this.properties.src);
      }

      function i() {
        this.properties = {
          gain: .5
        }, this._audionodes = [], this._media_stream = null, this.addOutput("out", "audio"), this.addInput("gain", "number");
        var t = m.getAudioContext();
        this.audionode = t.createGain(), this.audionode.graphnode = this, this.audionode.gain.value = this.properties.gain;
      }

      function s() {
        this.properties = {
          fftSize: 2048,
          minDecibels: -100,
          maxDecibels: -10,
          smoothingTimeConstant: .5
        };
        var t = m.getAudioContext();
        this.audionode = t.createAnalyser(), this.audionode.graphnode = this, this.audionode.fftSize = this.properties.fftSize, this.audionode.minDecibels = this.properties.minDecibels, this.audionode.maxDecibels = this.properties.maxDecibels, this.audionode.smoothingTimeConstant = this.properties.smoothingTimeConstant, this.addInput("in", "audio"), this.addOutput("freqs", "array"), this.addOutput("samples", "array"), this._freq_bin = null, this._time_bin = null;
      }

      function o() {
        this.properties = {
          gain: 1
        }, this.audionode = m.getAudioContext().createGain(), this.addInput("in", "audio"), this.addInput("gain", "number"), this.addOutput("out", "audio");
      }

      function n() {
        this.properties = {
          impulse_src: "",
          normalize: !0
        }, this.audionode = m.getAudioContext().createConvolver(), this.addInput("in", "audio"), this.addOutput("out", "audio");
      }

      function r() {
        this.properties = {
          threshold: -50,
          knee: 40,
          ratio: 12,
          reduction: -20,
          attack: 0,
          release: .25
        }, this.audionode = m.getAudioContext().createDynamicsCompressor(), this.addInput("in", "audio"), this.addOutput("out", "audio");
      }

      function a() {
        this.properties = {}, this.audionode = m.getAudioContext().createWaveShaper(), this.addInput("in", "audio"), this.addInput("shape", "waveshape"), this.addOutput("out", "audio");
      }

      function u() {
        this.properties = {
          gain1: .5,
          gain2: .5
        }, this.audionode = m.getAudioContext().createGain(), this.audionode1 = m.getAudioContext().createGain(), this.audionode1.gain.value = this.properties.gain1, this.audionode2 = m.getAudioContext().createGain(), this.audionode2.gain.value = this.properties.gain2, this.audionode1.connect(this.audionode), this.audionode2.connect(this.audionode), this.addInput("in1", "audio"), this.addInput("in1 gain", "number"), this.addInput("in2", "audio"), this.addInput("in2 gain", "number"), this.addOutput("out", "audio");
      }

      function h() {
        this.properties = {
          A: .1,
          D: .1,
          S: .1,
          R: .1
        }, this.audionode = m.getAudioContext().createGain(), this.audionode.gain.value = 0, this.addInput("in", "audio"), this.addInput("gate", "boolean"), this.addOutput("out", "audio"), this.gate = !1;
      }

      function p() {
        this.properties = {
          delayTime: .5
        }, this.audionode = m.getAudioContext().createDelay(10), this.audionode.delayTime.value = this.properties.delayTime, this.addInput("in", "audio"), this.addInput("time", "number"), this.addOutput("out", "audio");
      }

      function l() {
        this.properties = {
          frequency: 350,
          detune: 0,
          Q: 1
        }, this.addProperty("type", "lowpass", "enum", {
          values: ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"]
        }), this.audionode = m.getAudioContext().createBiquadFilter(), this.addInput("in", "audio"), this.addOutput("out", "audio");
      }

      function d() {
        this.properties = {
          frequency: 440,
          detune: 0,
          type: "sine"
        }, this.addProperty("type", "sine", "enum", {
          values: ["sine", "square", "sawtooth", "triangle", "custom"]
        }), this.audionode = m.getAudioContext().createOscillator(), this.addOutput("out", "audio");
      }

      function c() {
        this.properties = {
          continuous: !0,
          mark: -1
        }, this.addInput("data", "array"), this.addInput("mark", "number"), this.size = [300, 200], this._last_buffer = null;
      }

      function _() {
        this.properties = {
          band: 440,
          amplitude: 1
        }, this.addInput("freqs", "array"), this.addOutput("signal", "number");
      }

      function g() {
        if (!g.default_code) {
          var t = g.default_function.toString(),
              e = t.indexOf("{") + 1,
              i = t.lastIndexOf("}");
          g.default_code = t.substr(e, i - e);
        }

        this.properties = {
          code: g.default_code
        };
        var s = m.getAudioContext();
        s.createScriptProcessor ? this.audionode = s.createScriptProcessor(4096, 1, 1) : (console.warn("ScriptProcessorNode deprecated"), this.audionode = s.createGain()), this.processCode(), g._bypass_function || (g._bypass_function = this.audionode.onaudioprocess), this.addInput("in", "audio"), this.addOutput("out", "audio");
      }

      function f() {
        this.audionode = m.getAudioContext().destination, this.addInput("in", "audio");
      }

      var v = t.LiteGraph,
          m = {};
      t.LGAudio = m, m.getAudioContext = function () {
        if (!this._audio_context) {
          if (window.AudioContext = window.AudioContext || window.webkitAudioContext, !window.AudioContext) return console.error("AudioContext not supported by browser"), null;
          this._audio_context = new AudioContext(), this._audio_context.onmessage = function (t) {
            console.log("msg", t);
          }, this._audio_context.onended = function (t) {
            console.log("ended", t);
          }, this._audio_context.oncomplete = function (t) {
            console.log("complete", t);
          };
        }

        return this._audio_context;
      }, m.connect = function (t, e) {
        try {
          t.connect(e);
        } catch (t) {
          console.warn("LGraphAudio:", t);
        }
      }, m.disconnect = function (t, e) {
        try {
          t.disconnect(e);
        } catch (t) {
          console.warn("LGraphAudio:", t);
        }
      }, m.changeAllAudiosConnections = function (t, e) {
        if (t.inputs) for (var i = 0; i < t.inputs.length; ++i) {
          var s = t.inputs[i],
              o = t.graph.links[s.link];

          if (o) {
            var n = t.graph.getNodeById(o.origin_id),
                r = null;
            r = n.getAudioNodeInOutputSlot ? n.getAudioNodeInOutputSlot(o.origin_slot) : n.audionode;
            var a = null;
            a = t.getAudioNodeInInputSlot ? t.getAudioNodeInInputSlot(i) : t.audionode, e ? m.connect(r, a) : m.disconnect(r, a);
          }
        }
        if (t.outputs) for (i = 0; i < t.outputs.length; ++i) for (var u = t.outputs[i], h = 0; h < u.links.length; ++h) {
          o = t.graph.links[u.links[h]];

          if (o) {
            r = null;
            r = t.getAudioNodeInOutputSlot ? t.getAudioNodeInOutputSlot(i) : t.audionode;
            var p = t.graph.getNodeById(o.target_id);
            a = null;
            a = p.getAudioNodeInInputSlot ? p.getAudioNodeInInputSlot(o.target_slot) : p.audionode, e ? m.connect(r, a) : m.disconnect(r, a);
          }
        }
      }, m.onConnectionsChange = function (t, e, i, s) {
        if (t == v.OUTPUT) {
          var o = null;

          if (s && (o = this.graph.getNodeById(s.target_id)), o) {
            var n = null;
            n = this.getAudioNodeInOutputSlot ? this.getAudioNodeInOutputSlot(e) : this.audionode;
            var r = null;
            r = o.getAudioNodeInInputSlot ? o.getAudioNodeInInputSlot(s.target_slot) : o.audionode, i ? m.connect(n, r) : m.disconnect(n, r);
          }
        }
      }, m.createAudioNodeWrapper = function (t) {
        var e = t.prototype.onPropertyChanged;
        t.prototype.onPropertyChanged = function (t, i) {
          e && e.call(this, t, i), this.audionode && void 0 !== this.audionode[t] && (void 0 !== this.audionode[t].value ? this.audionode[t].value = i : this.audionode[t] = i);
        }, t.prototype.onConnectionsChange = m.onConnectionsChange;
      }, m.cached_audios = {}, m.loadSound = function (t, e, i) {
        function s(t) {
          console.log("Audio loading sample error:", t), i && i(t);
        }

        if (!m.cached_audios[t] || -1 != t.indexOf("blob:")) {
          m.onProcessAudioURL && (t = m.onProcessAudioURL(t));
          var o = new XMLHttpRequest();
          o.open("GET", t, !0), o.responseType = "arraybuffer";
          var n = m.getAudioContext();
          return o.onload = function () {
            console.log("AudioSource loaded"), n.decodeAudioData(o.response, function (i) {
              console.log("AudioSource decoded"), m.cached_audios[t] = i, e && e(i);
            }, s);
          }, o.send(), o;
        }

        e && e(m.cached_audios[t]);
      }, e.desc = "Plays an audio file", e["@src"] = {
        widget: "resource"
      }, e.supported_extensions = ["wav", "ogg", "mp3"], e.prototype.onAdded = function (t) {
        t.status === LGraph.STATUS_RUNNING && this.onStart();
      }, e.prototype.onStart = function () {
        this._audiobuffer && this.properties.autoplay && this.playBuffer(this._audiobuffer);
      }, e.prototype.onStop = function () {
        this.stopAllSounds();
      }, e.prototype.onPause = function () {
        this.pauseAllSounds();
      }, e.prototype.onUnpause = function () {
        this.unpauseAllSounds();
      }, e.prototype.onRemoved = function () {
        this.stopAllSounds(), this._dropped_url && URL.revokeObjectURL(this._url);
      }, e.prototype.stopAllSounds = function () {
        for (var t = 0; t < this._audionodes.length; ++t) this._audionodes[t].started && (this._audionodes[t].started = !1, this._audionodes[t].stop());

        this._audionodes.length = 0;
      }, e.prototype.pauseAllSounds = function () {
        m.getAudioContext().suspend();
      }, e.prototype.unpauseAllSounds = function () {
        m.getAudioContext().resume();
      }, e.prototype.onExecute = function () {
        if (this.inputs) for (var t = 0; t < this.inputs.length; ++t) {
          var e = this.inputs[t];

          if (null != e.link) {
            var i = this.getInputData(t);
            if (void 0 !== i) if ("gain" == e.name) this.audionode.gain.value = i;else if ("src" == e.name) this.setProperty("src", i);else if ("playbackRate" == e.name) {
              this.properties.playbackRate = i;

              for (var s = 0; s < this._audionodes.length; ++s) this._audionodes[s].playbackRate.value = i;
            }
          }
        }
        if (this.outputs) for (t = 0; t < this.outputs.length; ++t) {
          var o = this.outputs[t];
          "buffer" == o.name && this._audiobuffer && this.setOutputData(t, this._audiobuffer);
        }
      }, e.prototype.onAction = function (t) {
        this._audiobuffer && ("Play" == t ? this.playBuffer(this._audiobuffer) : "Stop" == t && this.stopAllSounds());
      }, e.prototype.onPropertyChanged = function (t, e) {
        if ("src" == t) this.loadSound(e);else if ("gain" == t) this.audionode.gain.value = e;else if ("playbackRate" == t) for (var i = 0; i < this._audionodes.length; ++i) this._audionodes[i].playbackRate.value = e;
      }, e.prototype.playBuffer = function (t) {
        var e = this,
            i = m.getAudioContext(),
            s = i.createBufferSource();
        return this._last_sourcenode = s, s.graphnode = this, s.buffer = t, s.loop = this.properties.loop, s.playbackRate.value = this.properties.playbackRate, this._audionodes.push(s), s.connect(this.audionode), this._audionodes.push(s), this.trigger("start"), s.onended = function () {
          e.trigger("ended");

          var t = e._audionodes.indexOf(s);

          -1 != t && e._audionodes.splice(t, 1);
        }, s.started || (s.started = !0, s.start()), s;
      }, e.prototype.loadSound = function (t) {
        function e(t) {
          this.boxcolor = v.NODE_DEFAULT_BOXCOLOR, i._audiobuffer = t, i._loading_audio = !1, i.graph && i.graph.status === LGraph.STATUS_RUNNING && i.onStart();
        }

        var i = this;
        this._request && (this._request.abort(), this._request = null), this._audiobuffer = null, this._loading_audio = !1, t && (this._request = m.loadSound(t, e), this._loading_audio = !0, this.boxcolor = "#AA4");
      }, e.prototype.onConnectionsChange = m.onConnectionsChange, e.prototype.onGetInputs = function () {
        return [["playbackRate", "number"], ["src", "string"], ["Play", v.ACTION], ["Stop", v.ACTION]];
      }, e.prototype.onGetOutputs = function () {
        return [["buffer", "audiobuffer"], ["start", v.EVENT], ["ended", v.EVENT]];
      }, e.prototype.onDropFile = function (t) {
        this._dropped_url && URL.revokeObjectURL(this._dropped_url);
        var e = URL.createObjectURL(t);
        this.properties.src = e, this.loadSound(e), this._dropped_url = e;
      }, e.title = "Source", e.desc = "Plays audio", v.registerNodeType("audio/source", e), i.prototype.onAdded = function (t) {
        t.status === LGraph.STATUS_RUNNING && this.onStart();
      }, i.prototype.onStart = function () {
        null != this._media_stream || this._waiting_confirmation || this.openStream();
      }, i.prototype.onStop = function () {
        this.audionode.gain.value = 0;
      }, i.prototype.onPause = function () {
        this.audionode.gain.value = 0;
      }, i.prototype.onUnpause = function () {
        this.audionode.gain.value = this.properties.gain;
      }, i.prototype.onRemoved = function () {
        if (this.audionode.gain.value = 0, this.audiosource_node && (this.audiosource_node.disconnect(this.audionode), this.audiosource_node = null), this._media_stream) {
          var t = this._media_stream.getTracks();

          t.length && t[0].stop();
        }
      }, i.prototype.openStream = function () {
        function t(t) {
          console.log("Media rejected", t), e._media_stream = !1, e.boxcolor = "red";
        }

        if (navigator.mediaDevices) {
          this._waiting_confirmation = !0, navigator.mediaDevices.getUserMedia({
            audio: !0,
            video: !1
          }).then(this.streamReady.bind(this)).catch(t);
          var e = this;
        } else console.log("getUserMedia() is not supported in your browser, use chrome and enable WebRTC from about://flags");
      }, i.prototype.streamReady = function (t) {
        this._media_stream = t, this.audiosource_node && this.audiosource_node.disconnect(this.audionode);
        var e = m.getAudioContext();
        this.audiosource_node = e.createMediaStreamSource(t), this.audiosource_node.graphnode = this, this.audiosource_node.connect(this.audionode), this.boxcolor = "white";
      }, i.prototype.onExecute = function () {
        if (null != this._media_stream || this._waiting_confirmation || this.openStream(), this.inputs) for (var t = 0; t < this.inputs.length; ++t) {
          var e = this.inputs[t];

          if (null != e.link) {
            var i = this.getInputData(t);
            void 0 !== i && "gain" == e.name && (this.audionode.gain.value = this.properties.gain = i);
          }
        }
      }, i.prototype.onAction = function (t) {
        "Play" == t ? this.audionode.gain.value = this.properties.gain : "Stop" == t && (this.audionode.gain.value = 0);
      }, i.prototype.onPropertyChanged = function (t, e) {
        "gain" == t && (this.audionode.gain.value = e);
      }, i.prototype.onConnectionsChange = m.onConnectionsChange, i.prototype.onGetInputs = function () {
        return [["playbackRate", "number"], ["Play", v.ACTION], ["Stop", v.ACTION]];
      }, i.title = "MediaSource", i.desc = "Plays microphone", v.registerNodeType("audio/media_source", i), s.prototype.onPropertyChanged = function (t, e) {
        this.audionode[t] = e;
      }, s.prototype.onExecute = function () {
        if (this.isOutputConnected(0)) {
          var t = this.audionode.frequencyBinCount;
          this._freq_bin && this._freq_bin.length == t || (this._freq_bin = new Uint8Array(t)), this.audionode.getByteFrequencyData(this._freq_bin), this.setOutputData(0, this._freq_bin);
        }

        if (this.isOutputConnected(1)) {
          t = this.audionode.frequencyBinCount;
          this._time_bin && this._time_bin.length == t || (this._time_bin = new Uint8Array(t)), this.audionode.getByteTimeDomainData(this._time_bin), this.setOutputData(1, this._time_bin);
        }

        for (var e = 1; e < this.inputs.length; ++e) {
          var i = this.inputs[e];

          if (null != i.link) {
            var s = this.getInputData(e);
            void 0 !== s && (this.audionode[i.name].value = s);
          }
        }
      }, s.prototype.onGetInputs = function () {
        return [["minDecibels", "number"], ["maxDecibels", "number"], ["smoothingTimeConstant", "number"]];
      }, s.prototype.onGetOutputs = function () {
        return [["freqs", "array"], ["samples", "array"]];
      }, s.title = "Analyser", s.desc = "Audio Analyser", v.registerNodeType("audio/analyser", s), o.prototype.onExecute = function () {
        if (this.inputs && this.inputs.length) for (var t = 1; t < this.inputs.length; ++t) {
          var e = this.inputs[t],
              i = this.getInputData(t);
          void 0 !== i && (this.audionode[e.name].value = i);
        }
      }, m.createAudioNodeWrapper(o), o.title = "Gain", o.desc = "Audio gain", v.registerNodeType("audio/gain", o), m.createAudioNodeWrapper(n), n.prototype.onRemove = function () {
        this._dropped_url && URL.revokeObjectURL(this._dropped_url);
      }, n.prototype.onPropertyChanged = function (t, e) {
        "impulse_src" == t ? this.loadImpulse(e) : "normalize" == t && (this.audionode.normalize = e);
      }, n.prototype.onDropFile = function (t) {
        this._dropped_url && URL.revokeObjectURL(this._dropped_url), this._dropped_url = URL.createObjectURL(t), this.properties.impulse_src = this._dropped_url, this.loadImpulse(this._dropped_url);
      }, n.prototype.loadImpulse = function (t) {
        function e(t) {
          i._impulse_buffer = t, i.audionode.buffer = t, console.log("Impulse signal set"), i._loading_impulse = !1;
        }

        var i = this;
        this._request && (this._request.abort(), this._request = null), this._impulse_buffer = null, this._loading_impulse = !1, t && (this._request = m.loadSound(t, e), this._loading_impulse = !0);
      }, n.title = "Convolver", n.desc = "Convolves the signal (used for reverb)", v.registerNodeType("audio/convolver", n), m.createAudioNodeWrapper(r), r.prototype.onExecute = function () {
        if (this.inputs && this.inputs.length) for (var t = 1; t < this.inputs.length; ++t) {
          var e = this.inputs[t];

          if (null != e.link) {
            var i = this.getInputData(t);
            void 0 !== i && (this.audionode[e.name].value = i);
          }
        }
      }, r.prototype.onGetInputs = function () {
        return [["threshold", "number"], ["knee", "number"], ["ratio", "number"], ["reduction", "number"], ["attack", "number"], ["release", "number"]];
      }, r.title = "DynamicsCompressor", r.desc = "Dynamics Compressor", v.registerNodeType("audio/dynamicsCompressor", r), a.prototype.onExecute = function () {
        if (this.inputs && this.inputs.length) {
          var t = this.getInputData(1);
          void 0 !== t && (this.audionode.curve = t);
        }
      }, a.prototype.setWaveShape = function (t) {
        this.audionode.curve = t;
      }, m.createAudioNodeWrapper(a), u.prototype.getAudioNodeInInputSlot = function (t) {
        return 0 == t ? this.audionode1 : 2 == t ? this.audionode2 : void 0;
      }, u.prototype.onPropertyChanged = function (t, e) {
        "gain1" == t ? this.audionode1.gain.value = e : "gain2" == t && (this.audionode2.gain.value = e);
      }, u.prototype.onExecute = function () {
        if (this.inputs && this.inputs.length) for (var t = 1; t < this.inputs.length; ++t) {
          var e = this.inputs[t];

          if (null != e.link && "audio" != e.type) {
            var i = this.getInputData(t);
            void 0 !== i && (1 == t ? this.audionode1.gain.value = i : 3 == t && (this.audionode2.gain.value = i));
          }
        }
      }, m.createAudioNodeWrapper(u), u.title = "Mixer", u.desc = "Audio mixer", v.registerNodeType("audio/mixer", u), h.prototype.onExecute = function () {
        var t = m.getAudioContext(),
            e = t.currentTime,
            i = this.audionode,
            s = i.gain,
            o = this.getInputData(1),
            n = this.getInputOrProperty("A"),
            r = this.getInputOrProperty("D"),
            a = this.getInputOrProperty("S"),
            u = this.getInputOrProperty("R");
        !this.gate && o ? (s.cancelScheduledValues(0), s.setValueAtTime(0, e), s.linearRampToValueAtTime(1, e + n), s.linearRampToValueAtTime(a, e + n + r)) : this.gate && !o && (s.cancelScheduledValues(0), s.setValueAtTime(s.value, e), s.linearRampToValueAtTime(0, e + u)), this.gate = o;
      }, h.prototype.onGetInputs = function () {
        return [["A", "number"], ["D", "number"], ["S", "number"], ["R", "number"]];
      }, m.createAudioNodeWrapper(h), h.title = "ADSR", h.desc = "Audio envelope", v.registerNodeType("audio/adsr", h), m.createAudioNodeWrapper(p), p.prototype.onExecute = function () {
        var t = this.getInputData(1);
        void 0 !== t && (this.audionode.delayTime.value = t);
      }, p.title = "Delay", p.desc = "Audio delay", v.registerNodeType("audio/delay", p), l.prototype.onExecute = function () {
        if (this.inputs && this.inputs.length) for (var t = 1; t < this.inputs.length; ++t) {
          var e = this.inputs[t];

          if (null != e.link) {
            var i = this.getInputData(t);
            void 0 !== i && (this.audionode[e.name].value = i);
          }
        }
      }, l.prototype.onGetInputs = function () {
        return [["frequency", "number"], ["detune", "number"], ["Q", "number"]];
      }, m.createAudioNodeWrapper(l), l.title = "BiquadFilter", l.desc = "Audio filter", v.registerNodeType("audio/biquadfilter", l), d.prototype.onStart = function () {
        if (!this.audionode.started) {
          this.audionode.started = !0;

          try {
            this.audionode.start();
          } catch (t) {}
        }
      }, d.prototype.onStop = function () {
        this.audionode.started && (this.audionode.started = !1, this.audionode.stop());
      }, d.prototype.onPause = function () {
        this.onStop();
      }, d.prototype.onUnpause = function () {
        this.onStart();
      }, d.prototype.onExecute = function () {
        if (this.inputs && this.inputs.length) for (var t = 0; t < this.inputs.length; ++t) {
          var e = this.inputs[t];

          if (null != e.link) {
            var i = this.getInputData(t);
            void 0 !== i && (this.audionode[e.name].value = i);
          }
        }
      }, d.prototype.onGetInputs = function () {
        return [["frequency", "number"], ["detune", "number"], ["type", "string"]];
      }, m.createAudioNodeWrapper(d), d.title = "Oscillator", d.desc = "Oscillator", v.registerNodeType("audio/oscillator", d), c.prototype.onExecute = function () {
        this._last_buffer = this.getInputData(0);
        var t = this.getInputData(1);
        void 0 !== t && (this.properties.mark = t), this.setDirtyCanvas(!0, !1);
      }, c.prototype.onDrawForeground = function (t) {
        if (this._last_buffer) {
          var e = this._last_buffer,
              i = e.length / this.size[0],
              s = this.size[1];
          t.fillStyle = "black", t.fillRect(0, 0, this.size[0], this.size[1]), t.strokeStyle = "white", t.beginPath();
          var o = 0;

          if (this.properties.continuous) {
            t.moveTo(o, s);

            for (var n = 0; n < e.length; n += i) t.lineTo(o, s - e[0 | n] / 255 * s), o++;
          } else for (n = 0; n < e.length; n += i) t.moveTo(o + .5, s), t.lineTo(o + .5, s - e[0 | n] / 255 * s), o++;

          if (t.stroke(), this.properties.mark >= 0) {
            var r = m.getAudioContext().sampleRate,
                a = r / e.length;
            o = this.properties.mark / a * 2 / i;
            o >= this.size[0] && (o = this.size[0] - 1), t.strokeStyle = "red", t.beginPath(), t.moveTo(o, s), t.lineTo(o, 0), t.stroke();
          }
        }
      }, c.title = "Visualization", c.desc = "Audio Visualization", v.registerNodeType("audio/visualization", c), _.prototype.onExecute = function () {
        if (this._freqs = this.getInputData(0), this._freqs) {
          var t = this.properties.band,
              e = this.getInputData(1);
          void 0 !== e && (t = e);
          var i = m.getAudioContext().sampleRate,
              s = i / this._freqs.length,
              o = t / s * 2;
          e = 0;
          if (o < 0 && (e = this._freqs[0]), o >= this._freqs.length) e = this._freqs[this._freqs.length - 1];else {
            var n = 0 | o,
                r = this._freqs[n],
                a = this._freqs[n + 1],
                u = o - n;
            e = r * (1 - u) + a * u;
          }
          this.setOutputData(0, e / 255 * this.properties.amplitude);
        }
      }, _.prototype.onGetInputs = function () {
        return [["band", "number"]];
      }, _.title = "Signal", _.desc = "extract the signal of some frequency", v.registerNodeType("audio/signal", _), g.prototype.onAdded = function (t) {
        t.status == LGraph.STATUS_RUNNING && (this.audionode.onaudioprocess = this._callback);
      }, g["@code"] = {
        widget: "code",
        type: "code"
      }, g.prototype.onStart = function () {
        this.audionode.onaudioprocess = this._callback;
      }, g.prototype.onStop = function () {
        this.audionode.onaudioprocess = g._bypass_function;
      }, g.prototype.onPause = function () {
        this.audionode.onaudioprocess = g._bypass_function;
      }, g.prototype.onUnpause = function () {
        this.audionode.onaudioprocess = this._callback;
      }, g.prototype.onExecute = function () {}, g.prototype.onRemoved = function () {
        this.audionode.onaudioprocess = g._bypass_function;
      }, g.prototype.processCode = function () {
        try {
          var t = new Function("properties", this.properties.code);
          this._script = new t(this.properties), this._old_code = this.properties.code, this._callback = this._script.onaudioprocess;
        } catch (t) {
          console.error("Error in onaudioprocess code", t), this._callback = g._bypass_function, this.audionode.onaudioprocess = this._callback;
        }
      }, g.prototype.onPropertyChanged = function (t, e) {
        "code" == t && (this.properties.code = e, this.processCode(), this.graph && this.graph.status == LGraph.STATUS_RUNNING && (this.audionode.onaudioprocess = this._callback));
      }, g.default_function = function () {
        this.onaudioprocess = function (t) {
          for (var e = t.inputBuffer, i = t.outputBuffer, s = 0; s < i.numberOfChannels; s++) for (var o = e.getChannelData(s), n = i.getChannelData(s), r = 0; r < e.length; r++) n[r] = o[r];
        };
      }, m.createAudioNodeWrapper(g), g.title = "Script", g.desc = "apply script to signal", v.registerNodeType("audio/script", g), f.title = "Destination", f.desc = "Audio output", v.registerNodeType("audio/destination", f);
    }(this), function (t) {
      function e() {
        this.size = [60, 20], this.addInput("send", s.ACTION), this.addOutput("received", s.EVENT), this.addInput("in", 0), this.addOutput("out", 0), this.properties = {
          url: "",
          room: "lgraph",
          only_send_changes: !0
        }, this._ws = null, this._last_sent_data = [], this._last_received_data = [];
      }

      function i() {
        this.room_widget = this.addWidget("text", "Room", "lgraph", this.setRoom.bind(this)), this.addWidget("button", "Reconnect", null, this.connectSocket.bind(this)), this.addInput("send", s.ACTION), this.addOutput("received", s.EVENT), this.addInput("in", 0), this.addOutput("out", 0), this.properties = {
          url: "tamats.com:55000",
          room: "lgraph",
          only_send_changes: !0
        }, this._server = null, this.connectSocket(), this._last_sent_data = [], this._last_received_data = [], "undefined" == typeof SillyClient && console.warn("remember to add SillyClient.js to your project: https://tamats.com/projects/sillyserver/src/sillyclient.js");
      }

      var s = t.LiteGraph;
      e.title = "WebSocket", e.desc = "Send data through a websocket", e.prototype.onPropertyChanged = function (t, e) {
        "url" == t && this.connectSocket();
      }, e.prototype.onExecute = function () {
        if (!this._ws && this.properties.url && this.connectSocket(), this._ws && this._ws.readyState == WebSocket.OPEN) {
          for (var t = this.properties.room, e = this.properties.only_send_changes, i = 1; i < this.inputs.length; ++i) {
            var s = this.getInputData(i);

            if (null != s) {
              var o;

              try {
                o = JSON.stringify({
                  type: 0,
                  room: t,
                  channel: i,
                  data: s
                });
              } catch (t) {
                continue;
              }

              e && this._last_sent_data[i] == o || (this._last_sent_data[i] = o, this._ws.send(o));
            }
          }

          for (i = 1; i < this.outputs.length; ++i) this.setOutputData(i, this._last_received_data[i]);

          "#AFA" == this.boxcolor && (this.boxcolor = "#6C6");
        }
      }, e.prototype.connectSocket = function () {
        var t = this,
            e = this.properties.url;
        "ws" != e.substr(0, 2) && (e = "ws://" + e), this._ws = new WebSocket(e), this._ws.onopen = function () {
          console.log("ready"), t.boxcolor = "#6C6";
        }, this._ws.onmessage = function (e) {
          t.boxcolor = "#AFA";
          var i = JSON.parse(e.data);
          if (!i.room || i.room == t.properties.room) if (1 == i.type) {
            if (i.data.object_class && s[i.data.object_class]) {
              var o = null;

              try {
                o = new s[i.data.object_class](i.data), t.triggerSlot(0, o);
              } catch (t) {
                return;
              }
            } else t.triggerSlot(0, i.data);
          } else t._last_received_data[i.channel || 0] = i.data;
        }, this._ws.onerror = function (e) {
          console.log("couldnt connect to websocket"), t.boxcolor = "#E88";
        }, this._ws.onclose = function (e) {
          console.log("connection closed"), t.boxcolor = "#000";
        };
      }, e.prototype.send = function (t) {
        this._ws && this._ws.readyState == WebSocket.OPEN && this._ws.send(JSON.stringify({
          type: 1,
          msg: t
        }));
      }, e.prototype.onAction = function (t, e) {
        this._ws && this._ws.readyState == WebSocket.OPEN && this._ws.send({
          type: 1,
          room: this.properties.room,
          action: t,
          data: e
        });
      }, e.prototype.onGetInputs = function () {
        return [["in", 0]];
      }, e.prototype.onGetOutputs = function () {
        return [["out", 0]];
      }, s.registerNodeType("network/websocket", e), i.title = "SillyClient", i.desc = "Connects to SillyServer to broadcast messages", i.prototype.onPropertyChanged = function (t, e) {
        "room" == t && (this.room_widget.value = e), this.connectSocket();
      }, i.prototype.setRoom = function (t) {
        this.properties.room = t, this.room_widget.value = t, this.connectSocket();
      }, i.prototype.onDrawForeground = function () {
        for (var t = 1; t < this.inputs.length; ++t) {
          var e = this.inputs[t];
          e.label = "in_" + t;
        }

        for (t = 1; t < this.outputs.length; ++t) {
          e = this.outputs[t];
          e.label = "out_" + t;
        }
      }, i.prototype.onExecute = function () {
        if (this._server && this._server.is_connected) {
          for (var t = this.properties.only_send_changes, e = 1; e < this.inputs.length; ++e) {
            var i = this.getInputData(e),
                s = this._last_sent_data[e];

            if (null != i) {
              if (t) {
                var o = !0;

                if (i && i.length && s && s.length == i.length && i.constructor !== String) {
                  for (var n = 0; n < i.length; ++n) if (s[n] != i[n]) {
                    o = !1;
                    break;
                  }
                } else this._last_sent_data[e] != i && (o = !1);

                if (o) continue;
              }

              if (this._server.sendMessage({
                type: 0,
                channel: e,
                data: i
              }), i.length && i.constructor !== String) {
                if (this._last_sent_data[e]) {
                  this._last_sent_data[e].length = i.length;

                  for (n = 0; n < i.length; ++n) this._last_sent_data[e][n] = i[n];
                } else i.constructor === Array ? this._last_sent_data[e] = i.concat() : this._last_sent_data[e] = new i.constructor(i);
              } else this._last_sent_data[e] = i;
            }
          }

          for (e = 1; e < this.outputs.length; ++e) this.setOutputData(e, this._last_received_data[e]);

          "#AFA" == this.boxcolor && (this.boxcolor = "#6C6");
        }
      }, i.prototype.connectSocket = function () {
        var t = this;
        if ("undefined" == typeof SillyClient) return this._error || console.error("SillyClient node cannot be used, you must include SillyServer.js"), void (this._error = !0);

        if (this._server = new SillyClient(), this._server.on_ready = function () {
          console.log("ready"), t.boxcolor = "#6C6";
        }, this._server.on_message = function (e, i) {
          var o = null;

          try {
            o = JSON.parse(i);
          } catch (t) {
            return;
          }

          if (1 == o.type) {
            if (o.data.object_class && s[o.data.object_class]) {
              var n = null;

              try {
                n = new s[o.data.object_class](o.data), t.triggerSlot(0, n);
              } catch (t) {
                return;
              }
            } else t.triggerSlot(0, o.data);
          } else t._last_received_data[o.channel || 0] = o.data;
          t.boxcolor = "#AFA";
        }, this._server.on_error = function (e) {
          console.log("couldnt connect to websocket"), t.boxcolor = "#E88";
        }, this._server.on_close = function (e) {
          console.log("connection closed"), t.boxcolor = "#000";
        }, this.properties.url && this.properties.room) {
          try {
            this._server.connect(this.properties.url, this.properties.room);
          } catch (t) {
            return console.error("SillyServer error: " + t), void (this._server = null);
          }

          this._final_url = this.properties.url + "/" + this.properties.room;
        }
      }, i.prototype.send = function (t) {
        this._server && this._server.is_connected && this._server.sendMessage({
          type: 1,
          data: t
        });
      }, i.prototype.onAction = function (t, e) {
        this._server && this._server.is_connected && this._server.sendMessage({
          type: 1,
          action: t,
          data: e
        });
      }, i.prototype.onGetInputs = function () {
        return [["in", 0]];
      }, i.prototype.onGetOutputs = function () {
        return [["out", 0]];
      }, s.registerNodeType("network/sillyclient", i);
    }(this);
  }).call(root);
})( // The environment-specific global.
function () {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof this !== 'undefined') return this;
  return {};
}.call(this));