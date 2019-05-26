'use strict';
($.fn.qorSliderAfterShow = $.fn.qorSliderAfterShow || {}),
  (window.QOR = {
    $formLoading:
      '<div id="qor-submit-loading" class="clearfix"><div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div></div>',
  }),
  window.Mustache && (window.Mustache.tags = ['[[', ']]']),
  $(document).ajaxComplete(function(t, e, i) {
    ('POST' != i.type && 'PUT' != i.type) ||
      ($.fn.qorSlideoutBeforeHide &&
        (($.fn.qorSlideoutBeforeHide = null), (window.onbeforeunload = null)));
  }),
  ($.fn.select2.ajaxCommonOptions = function(t) {
    var n = t.remoteDataPrimaryKey;
    return {
      dataType: 'json',
      cache: !0,
      delay: 250,
      data: function(t) {
        return { keyword: t.term, page: t.page, per_page: 20 };
      },
      processResults: function(t, e) {
        e.page = e.page || 1;
        var i = $.map(t, function(t) {
          return (t.id = t[n] || t.primaryKey || t.Id || t.ID), t;
        });
        return { results: i, pagination: { more: 20 <= i.length } };
      },
    };
  }),
  ($.fn.select2.ajaxFormatResult = function(t, e) {
    var i = '';
    return (
      (i =
        0 < e.length
          ? window.Mustache.render(e.html().replace(/{{(.*?)}}/g, '[[$1]]'), t)
          : t.text || t.Name || t.Title || t.Code || t[Object.keys(t)[0]]),
      /<(.*)(\/>|<\/.+>)/.test(i) ? $(i) : i
    );
  });
var _typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
$(function() {
  var r = window._,
    o = window.QOR,
    s = window.QOR_Translations,
    t =
      '<div id="dialog" style="display: none;">\n                  <div class="mdl-dialog-bg"></div>\n                  <div class="mdl-dialog">\n                      <div class="mdl-dialog__content">\n                        <p><i class="material-icons">warning</i></p>\n                        <p class="mdl-dialog__message dialog-message">\n                        </p>\n                      </div>\n                      <div class="mdl-dialog__actions">\n                        <button type="button" class="mdl-button mdl-button--raised mdl-button--colored dialog-ok dialog-button" data-type="confirm">\n                          ' +
      s.okButton +
      '\n                        </button>\n                        <button type="button" class="mdl-button dialog-cancel dialog-button" data-type="">\n                          ' +
      s.cancelButton +
      '\n                        </button>\n                      </div>\n                    </div>\n                </div>',
    a = $(t).appendTo('body');
  $(document)
    .on('keyup.qor.confirm', function(t) {
      a.is(':visible') &&
        (27 === t.which &&
          setTimeout(function() {
            a.hide(), (o.qorConfirmCallback = void 0);
          }, 100),
        13 === t.which &&
          setTimeout(function() {
            $('.dialog-button[data-type="confirm"]').click();
          }, 100));
    })
    .on('click.qor.confirm', '.dialog-button', function() {
      var t = $(this).data('type'),
        e = o.qorConfirmCallback;
      return (
        $.isFunction(e) && e(t), a.hide(), (o.qorConfirmCallback = void 0), !1
      );
    }),
    (o.qorConfirm = function(t, e) {
      var i = a.find('.dialog-ok'),
        n = a.find('.dialog-cancel');
      return (
        r.isString(t)
          ? (a.find('.dialog-message').text(t),
            i.text(s.okButton),
            n.text(s.cancelButton))
          : r.isObject(t) &&
            (t.confirmOk && t.confirmCancel
              ? (i.text(t.confirmOk), n.text(t.confirmCancel))
              : (i.text(s.okButton), n.text(s.cancelButton)),
            a.find('.dialog-message').text(t.confirm)),
        a.show(),
        (o.qorConfirmCallback = e),
        !1
      );
    });
  o.qorAjaxHandleFile = function(t, n, o, e) {
    var i = new XMLHttpRequest();
    (i.responseType = 'arraybuffer'),
      i.open('POST', t, !0),
      (i.onload = function() {
        if (200 === this.status) {
          var t = new Blob([this.response], { type: n }),
            e = window.URL.createObjectURL(t),
            i = document.createElement('a');
          document.body.appendChild(i),
            (i.href = e),
            (i.download = o || 'download-' + $.now()),
            i.click();
        } else window.alert(s.serverError);
      }),
      r.isObject(e) &&
        ('[object FormData]' != Object.prototype.toString.call(e) &&
          (e = (function t(e, i) {
            var n = i || new FormData(),
              o = void 0;
            for (var r in e)
              e.hasOwnProperty(r) && e[r] && (o = r),
                e[r] instanceof Date
                  ? n.append(o, e[r].toISOString())
                  : 'object' !== _typeof(e[r]) || e[r] instanceof File
                  ? n.append(o, e[r])
                  : t(e[r], n);
            return n;
          })(e)),
        i.send(e));
  };
  var e = function() {
    var t = $('.qor-linkify-object'),
      e = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.\-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    t.length &&
      t.each(function() {
        var t = $(this).data('video-link');
        t.match(e) &&
          $(this).html(
            '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' +
              t.replace(e, '$1') +
              '" frameborder="0" allowfullscreen></iframe>',
          );
      });
  };
  ($.fn.qorSliderAfterShow.converVideoLinks = e)(),
    (o.handleAjaxError = function(t) {
      var e = $('body'),
        i = t.responseJSON,
        n = t.responseText,
        o = $(
          '<ul class="qor-alert qor-error" data-dismissible="true"><button type="button" class="mdl-button mdl-button--icon" data-dismiss="alert">\n                            <i class="material-icons">close</i>\n                        </button></ul>',
        );
      if ((e.find('.qor-alert').remove(), 422 === t.status))
        if (i) {
          for (var r = i.errors, s = '', a = 0; a < r.length; a++)
            s +=
              '<li>\n                                        <i class="material-icons">error</i>\n                                        <span>' +
              r[a] +
              '</span>\n                                    </li>';
          o.append(s);
        } else o = $(n).find('.qor-error');
      else
        o.append(
          '<li>\n                            <i class="material-icons">error</i>\n                            <span>' +
            t.statusText +
            '</span>\n                        </li>',
        );
      o.prependTo(e),
        setTimeout(function() {
          o.addClass('qor-alert__active');
        }, 50),
        setTimeout(function() {
          $('.qor-alert[data-dismissible="true"]').removeClass(
            'qor-alert__active',
          ),
            $('#qor-submit-loading').remove();
        }, 6e3);
    });
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define('datepicker', ['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(T) {
  var t = T(window),
    o = window.document,
    p = T(o),
    r = window.Number,
    a = 'datepicker',
    i = 'click.' + a,
    n = 'keyup.' + a,
    s = 'focus.' + a,
    e = 'resize.' + a,
    l = 'show.' + a,
    d = 'hide.' + a,
    c = 'pick.' + a,
    u = /(y|m|d)+/g,
    h = /\d+/g,
    f = /^\d{2,4}$/,
    m = a + '-top-left',
    y = a + '-bottom-left',
    b = [m, a + '-top-right', y, a + '-bottom-right'].join(' '),
    g = a + '-hide',
    v = Math.min,
    _ = Object.prototype.toString;
  function q(t) {
    return 'string' == typeof t;
  }
  function w(t) {
    return 'number' == typeof t && !isNaN(t);
  }
  function $(t) {
    return void 0 === t;
  }
  function S(t) {
    return (
      'date' ===
      ((e = t),
      _.call(e)
        .slice(8, -1)
        .toLowerCase())
    );
    var e;
  }
  function k(t, e) {
    var i = [];
    return Array.from
      ? Array.from(t).slice(e || 0)
      : (w(e) && i.push(e), i.slice.apply(t, i));
  }
  function x(t, e) {
    var i = k(arguments, 2);
    return function() {
      return t.apply(e, i.concat(k(arguments)));
    };
  }
  function j(t, e) {
    return [
      31,
      ((i = t), (i % 4 == 0 && i % 100 != 0) || i % 400 == 0 ? 29 : 28),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][e];
    var i;
  }
  function D(t, e) {
    (e = T.isPlainObject(e) ? e : {}).language &&
      (e = T.extend({}, D.LANGUAGES[e.language], e)),
      (this.$element = T(t)),
      (this.options = T.extend({}, D.DEFAULTS, e)),
      (this.isBuilt = !1),
      (this.isShown = !1),
      (this.isInput = !1),
      (this.isInline = !1),
      (this.initialValue = ''),
      (this.initialDate = null),
      (this.startDate = null),
      (this.endDate = null),
      this.init();
  }
  (D.prototype = {
    constructor: D,
    init: function() {
      var t = this.options,
        e = this.$element,
        i = t.startDate,
        n = t.endDate,
        o = t.date;
      (this.$trigger = T(t.trigger || e)),
        (this.isInput = e.is('input') || e.is('textarea')),
        (this.isInline = t.inline && (t.container || !this.isInput)),
        (this.format = (function(t) {
          var e,
            i,
            n = String(t).toLowerCase(),
            o = n.match(u);
          if (!o || 0 === o.length) throw new Error('Invalid date format.');
          for (t = { source: n, parts: o }, e = o.length, i = 0; i < e; i++)
            switch (o[i]) {
              case 'dd':
              case 'd':
                t.hasDay = !0;
                break;
              case 'mm':
              case 'm':
                t.hasMonth = !0;
                break;
              case 'yyyy':
              case 'yy':
                t.hasYear = !0;
            }
          return t;
        })(t.format)),
        (this.initialValue = this.getValue()),
        (o = this.parseDate(o || this.initialValue)),
        i &&
          ((i = this.parseDate(i)),
          o.getTime() < i.getTime() && (o = new Date(i)),
          (this.startDate = i)),
        n &&
          ((n = this.parseDate(n)),
          i && n.getTime() < i.getTime() && (n = new Date(i)),
          o.getTime() > n.getTime() && (o = new Date(n)),
          (this.endDate = n)),
        (this.date = o),
        (this.viewDate = new Date(o)),
        (this.initialDate = new Date(this.date)),
        this.bind(),
        (t.autoshow || this.isInline) && this.show(),
        t.autopick && this.pick();
    },
    build: function() {
      var t,
        e = this.options,
        i = this.$element;
      this.isBuilt ||
        ((this.isBuilt = !0),
        (this.$picker = t = T(e.template)),
        (this.$week = t.find('[data-view="week"]')),
        (this.$yearsPicker = t.find('[data-view="years picker"]')),
        (this.$yearsPrev = t.find('[data-view="years prev"]')),
        (this.$yearsNext = t.find('[data-view="years next"]')),
        (this.$yearsCurrent = t.find('[data-view="years current"]')),
        (this.$years = t.find('[data-view="years"]')),
        (this.$monthsPicker = t.find('[data-view="months picker"]')),
        (this.$yearPrev = t.find('[data-view="year prev"]')),
        (this.$yearNext = t.find('[data-view="year next"]')),
        (this.$yearCurrent = t.find('[data-view="year current"]')),
        (this.$months = t.find('[data-view="months"]')),
        (this.$daysPicker = t.find('[data-view="days picker"]')),
        (this.$monthPrev = t.find('[data-view="month prev"]')),
        (this.$monthNext = t.find('[data-view="month next"]')),
        (this.$monthCurrent = t.find('[data-view="month current"]')),
        (this.$days = t.find('[data-view="days"]')),
        this.isInline
          ? T(e.container || i).append(t.addClass('datepicker-inline'))
          : (T(o.body).append(t.addClass('datepicker-dropdown')),
            t.addClass(g)),
        this.fillWeek());
    },
    unbuild: function() {
      this.isBuilt && ((this.isBuilt = !1), this.$picker.remove());
    },
    bind: function() {
      var t = this.options,
        e = this.$element;
      T.isFunction(t.show) && e.on(l, t.show),
        T.isFunction(t.hide) && e.on(d, t.hide),
        T.isFunction(t.pick) && e.on(c, t.pick),
        this.isInput &&
          (e.on(n, T.proxy(this.keyup, this)),
          t.trigger || e.on(s, T.proxy(this.show, this))),
        this.$trigger.on(i, T.proxy(this.show, this));
    },
    unbind: function() {
      var t = this.options,
        e = this.$element;
      T.isFunction(t.show) && e.off(l, t.show),
        T.isFunction(t.hide) && e.off(d, t.hide),
        T.isFunction(t.pick) && e.off(c, t.pick),
        this.isInput &&
          (e.off(n, this.keyup), t.trigger || e.off(s, this.show)),
        this.$trigger.off(i, this.show);
    },
    showView: function(t) {
      var e = this.$yearsPicker,
        i = this.$monthsPicker,
        n = this.$daysPicker,
        o = this.format;
      if (o.hasYear || o.hasMonth || o.hasDay)
        switch (r(t)) {
          case 2:
          case 'years':
            i.addClass(g),
              n.addClass(g),
              o.hasYear
                ? (this.fillYears(), e.removeClass(g))
                : this.showView(0);
            break;
          case 1:
          case 'months':
            e.addClass(g),
              n.addClass(g),
              o.hasMonth
                ? (this.fillMonths(), i.removeClass(g))
                : this.showView(2);
            break;
          default:
            e.addClass(g),
              i.addClass(g),
              o.hasDay ? (this.fillDays(), n.removeClass(g)) : this.showView(1);
        }
    },
    hideView: function() {
      this.options.autohide && this.hide();
    },
    place: function() {
      var t = this.options,
        e = this.$element,
        i = this.$picker,
        n = p.outerWidth(),
        o = p.outerHeight(),
        r = e.outerWidth(),
        s = e.outerHeight(),
        a = i.width(),
        l = i.height(),
        d = e.offset(),
        c = d.left,
        u = d.top,
        h = parseFloat(t.offset) || 10,
        f = m;
      l < u && o < u + s + l ? ((u -= l + h), (f = y)) : (u += s + h),
        n < c + a && ((c = c + r - a), (f = f.replace('left', 'right'))),
        i
          .removeClass(b)
          .addClass(f)
          .css({ top: u, left: c, zIndex: parseInt(t.zIndex, 10) });
    },
    trigger: function(t, e) {
      var i = T.Event(t, e);
      return this.$element.trigger(i), i;
    },
    createItem: function(t) {
      var e = this.options,
        i = e.itemTag,
        n = { text: '', view: '', muted: !1, picked: !1, disabled: !1 };
      return (
        T.extend(n, t),
        '<' +
          i +
          ' ' +
          (n.disabled
            ? 'class="' + e.disabledClass + '"'
            : n.picked
            ? 'class="' + e.pickedClass + '"'
            : n.muted
            ? 'class="' + e.mutedClass + '"'
            : '') +
          (n.view ? ' data-view="' + n.view + '"' : '') +
          '>' +
          n.text +
          '</' +
          i +
          '>'
      );
    },
    fillAll: function() {
      this.fillYears(), this.fillMonths(), this.fillDays();
    },
    fillWeek: function() {
      var t,
        e = this.options,
        i = parseInt(e.weekStart, 10) % 7,
        n = e.daysMin,
        o = '';
      for (n = T.merge(n.slice(i), n.slice(0, i)), t = 0; t <= 6; t++)
        o += this.createItem({ text: n[t] });
      this.$week.html(o);
    },
    fillYears: function() {
      var t,
        e = this.options,
        i = e.disabledClass || '',
        n = e.yearSuffix || '',
        o = T.isFunction(e.filter) && e.filter,
        r = this.startDate,
        s = this.endDate,
        a = this.viewDate,
        l = a.getFullYear(),
        d = a.getMonth(),
        c = a.getDate(),
        u = this.date,
        h = u.getFullYear(),
        f = !1,
        p = !1,
        m = !1,
        y = !1,
        b = !1,
        g = '';
      for (t = -5; t <= 6; t++)
        (u = new Date(l + t, d, c)),
          (b = -5 === t || 6 === t),
          (y = l + t === h),
          (m = !1),
          r && ((m = u.getFullYear() < r.getFullYear()), -5 === t && (f = m)),
          !m &&
            s &&
            ((m = u.getFullYear() > s.getFullYear()), 6 === t && (p = m)),
          !m && o && (m = !1 === o.call(this.$element, u)),
          (g += this.createItem({
            text: l + t,
            view: m ? 'year disabled' : y ? 'year picked' : 'year',
            muted: b,
            picked: y,
            disabled: m,
          }));
      this.$yearsPrev.toggleClass(i, f),
        this.$yearsNext.toggleClass(i, p),
        this.$yearsCurrent
          .toggleClass(i, !0)
          .html(l + -5 + n + ' - ' + (l + 6) + n),
        this.$years.html(g);
    },
    fillMonths: function() {
      var t,
        e = this.options,
        i = e.disabledClass || '',
        n = e.monthsShort,
        o = T.isFunction(e.filter) && e.filter,
        r = this.startDate,
        s = this.endDate,
        a = this.viewDate,
        l = a.getFullYear(),
        d = a.getDate(),
        c = this.date,
        u = c.getFullYear(),
        h = c.getMonth(),
        f = !1,
        p = !1,
        m = !1,
        y = !1,
        b = '';
      for (t = 0; t <= 11; t++)
        (c = new Date(l, t, d)),
          (y = l === u && t === h),
          (m = !1),
          r &&
            (m =
              (f = c.getFullYear() === r.getFullYear()) &&
              c.getMonth() < r.getMonth()),
          !m &&
            s &&
            (m =
              (p = c.getFullYear() === s.getFullYear()) &&
              c.getMonth() > s.getMonth()),
          !m && o && (m = !1 === o.call(this.$element, c)),
          (b += this.createItem({
            index: t,
            text: n[t],
            view: m ? 'month disabled' : y ? 'month picked' : 'month',
            picked: y,
            disabled: m,
          }));
      this.$yearPrev.toggleClass(i, f),
        this.$yearNext.toggleClass(i, p),
        this.$yearCurrent.toggleClass(i, f && p).html(l + e.yearSuffix || ''),
        this.$months.html(b);
    },
    fillDays: function() {
      var t,
        e,
        i,
        n = this.options,
        o = n.disabledClass || '',
        r = n.yearSuffix || '',
        s = n.monthsShort,
        a = parseInt(n.weekStart, 10) % 7,
        l = T.isFunction(n.filter) && n.filter,
        d = this.startDate,
        c = this.endDate,
        u = this.viewDate,
        h = u.getFullYear(),
        f = u.getMonth(),
        p = h,
        m = f,
        y = h,
        b = f,
        g = this.date,
        v = g.getFullYear(),
        _ = g.getMonth(),
        q = g.getDate(),
        w = !1,
        $ = !1,
        S = !1,
        k = !1,
        x = [],
        D = [],
        C = [];
      for (
        0 === f ? ((p -= 1), (m = 11)) : (m -= 1),
          t = j(p, m),
          (i = (g = new Date(h, f, 1)).getDay() - a) <= 0 && (i += 7),
          d && (w = g.getTime() <= d.getTime()),
          e = t - (i - 1);
        e <= t;
        e++
      )
        (g = new Date(p, m, e)),
          (S = !1),
          d && (S = g.getTime() < d.getTime()),
          !S && l && (S = !1 === l.call(this.$element, g)),
          x.push(
            this.createItem({
              text: e,
              view: 'day prev',
              muted: !0,
              disabled: S,
            }),
          );
      for (
        11 === f ? ((y += 1), (b = 0)) : (b += 1),
          t = j(h, f),
          i = 42 - (x.length + t),
          g = new Date(h, f, t),
          c && ($ = g.getTime() >= c.getTime()),
          e = 1;
        e <= i;
        e++
      )
        (g = new Date(y, b, e)),
          (S = !1),
          c && (S = g.getTime() > c.getTime()),
          !S && l && (S = !1 === l.call(this.$element, g)),
          D.push(
            this.createItem({
              text: e,
              view: 'day next',
              muted: !0,
              disabled: S,
            }),
          );
      for (e = 1; e <= t; e++)
        (g = new Date(h, f, e)),
          (k = h === v && f === _ && e === q),
          (S = !1),
          d && (S = g.getTime() < d.getTime()),
          !S && c && (S = g.getTime() > c.getTime()),
          !S && l && (S = !1 === l.call(this.$element, g)),
          C.push(
            this.createItem({
              text: e,
              view: S ? 'day disabled' : k ? 'day picked' : 'day',
              picked: k,
              disabled: S,
            }),
          );
      this.$monthPrev.toggleClass(o, w),
        this.$monthNext.toggleClass(o, $),
        this.$monthCurrent
          .toggleClass(o, w && $)
          .html(n.yearFirst ? h + r + ' ' + s[f] : s[f] + ' ' + h + r),
        this.$days.html(x.join('') + C.join(' ') + D.join(''));
    },
    click: function(t) {
      var e,
        i,
        n,
        o,
        r,
        s,
        a = T(t.target),
        l = this.viewDate;
      if ((t.stopPropagation(), t.preventDefault(), !a.hasClass('disabled')))
        switch (
          ((e = l.getFullYear()),
          (i = l.getMonth()),
          (n = l.getDate()),
          (s = a.data('view')))
        ) {
          case 'years prev':
          case 'years next':
            (e = 'years prev' === s ? e - 10 : e + 10),
              (r = a.text()),
              (o = f.test(r)) &&
                ((e = parseInt(r, 10)), (this.date = new Date(e, i, v(n, 28)))),
              (this.viewDate = new Date(e, i, v(n, 28))),
              this.fillYears(),
              o && (this.showView(1), this.pick('year'));
            break;
          case 'year prev':
          case 'year next':
            (e = 'year prev' === s ? e - 1 : e + 1),
              (this.viewDate = new Date(e, i, v(n, 28))),
              this.fillMonths();
            break;
          case 'year current':
            this.format.hasYear && this.showView(2);
            break;
          case 'year picked':
            this.format.hasMonth ? this.showView(1) : this.hideView();
            break;
          case 'year':
            (e = parseInt(a.text(), 10)),
              (this.date = new Date(e, i, v(n, 28))),
              (this.viewDate = new Date(e, i, v(n, 28))),
              this.format.hasMonth ? this.showView(1) : this.hideView(),
              this.pick('year');
            break;
          case 'month prev':
          case 'month next':
            (i = 'month prev' === s ? i - 1 : 'month next' === s ? i + 1 : i),
              (this.viewDate = new Date(e, i, v(n, 28))),
              this.fillDays();
            break;
          case 'month current':
            this.format.hasMonth && this.showView(1);
            break;
          case 'month picked':
            this.format.hasDay ? this.showView(0) : this.hideView();
            break;
          case 'month':
            (i = T.inArray(a.text(), this.options.monthsShort)),
              (this.date = new Date(e, i, v(n, 28))),
              (this.viewDate = new Date(e, i, v(n, 28))),
              this.format.hasDay ? this.showView(0) : this.hideView(),
              this.pick('month');
            break;
          case 'day prev':
          case 'day next':
          case 'day':
            (i = 'day prev' === s ? i - 1 : 'day next' === s ? i + 1 : i),
              (n = parseInt(a.text(), 10)),
              (this.date = new Date(e, i, n)),
              (this.viewDate = new Date(e, i, n)),
              this.fillDays(),
              'day' === s && this.hideView(),
              this.pick('day');
            break;
          case 'day picked':
            this.hideView(), this.pick('day');
        }
    },
    clickDoc: function(t) {
      for (var e, i = t.target, n = this.$trigger[0]; i !== o; ) {
        if (i === n) {
          e = !0;
          break;
        }
        i = i.parentNode;
      }
      e || this.hide();
    },
    keyup: function() {
      this.update();
    },
    getValue: function() {
      var t = this.$element,
        e = '';
      return (
        this.isInput
          ? (e = t.val())
          : this.isInline
          ? this.options.container && (e = t.text())
          : (e = t.text()),
        e
      );
    },
    setValue: function(t) {
      var e = this.$element;
      (t = q(t) ? t : ''),
        this.isInput
          ? e.val(t)
          : this.isInline
          ? this.options.container && e.text(t)
          : e.text(t);
    },
    show: function() {
      this.isBuilt || this.build(),
        this.isShown ||
          this.trigger(l).isDefaultPrevented() ||
          ((this.isShown = !0),
          this.$picker.removeClass(g).on(i, T.proxy(this.click, this)),
          this.showView(this.options.startView),
          this.isInline ||
            (t.on(e, (this._place = x(this.place, this))),
            p.on(i, (this._clickDoc = x(this.clickDoc, this))),
            this.place()));
    },
    hide: function() {
      this.isShown &&
        (this.trigger(d).isDefaultPrevented() ||
          ((this.isShown = !1),
          this.$picker.addClass(g).off(i, this.click),
          this.isInline || (t.off(e, this._place), p.off(i, this._clickDoc))));
    },
    update: function() {
      this.setDate(this.getValue(), !0);
    },
    pick: function(t) {
      var e = this.$element,
        i = this.date;
      this.trigger(c, { view: t || '', date: i }).isDefaultPrevented() ||
        (this.setValue((i = this.formatDate(this.date))),
        this.isInput && e.trigger('change'));
    },
    reset: function() {
      this.setDate(this.initialDate, !0),
        this.setValue(this.initialValue),
        this.isShown && this.showView(this.options.startView);
    },
    getMonthName: function(t, e) {
      var i = this.options,
        n = i.months;
      return (
        T.isNumeric(t) ? (t = r(t)) : $(e) && (e = t),
        !0 === e && (n = i.monthsShort),
        n[w(t) ? t : this.date.getMonth()]
      );
    },
    getDayName: function(t, e, i) {
      var n = this.options,
        o = n.days;
      return (
        T.isNumeric(t) ? (t = r(t)) : ($(i) && (i = e), $(e) && (e = t)),
        (o = !0 === i ? n.daysMin : !0 === e ? n.daysShort : o)[
          w(t) ? t : this.date.getDay()
        ]
      );
    },
    getDate: function(t) {
      var e = this.date;
      return t ? this.formatDate(e) : new Date(e);
    },
    setDate: function(t, e) {
      var i = this.options.filter;
      if (S(t) || q(t)) {
        if (
          ((t = this.parseDate(t)),
          T.isFunction(i) && !1 === i.call(this.$element, t))
        )
          return;
        (this.date = t),
          (this.viewDate = new Date(t)),
          e || this.pick(),
          this.isBuilt && this.fillAll();
      }
    },
    setStartDate: function(t) {
      (S(t) || q(t)) &&
        ((this.startDate = this.parseDate(t)), this.isBuilt && this.fillAll());
    },
    setEndDate: function(t) {
      (S(t) || q(t)) &&
        ((this.endDate = this.parseDate(t)), this.isBuilt && this.fillAll());
    },
    parseDate: function(t) {
      var e,
        i,
        n,
        o,
        r,
        s,
        a = this.format,
        l = [];
      if (S(t)) return new Date(t.getFullYear(), t.getMonth(), t.getDate());
      if (
        (q(t) && (l = t.match(h) || []),
        (i = (t = new Date()).getFullYear()),
        (n = t.getDate()),
        (o = t.getMonth()),
        (e = a.parts.length),
        l.length === e)
      )
        for (s = 0; s < e; s++)
          switch (((r = parseInt(l[s], 10) || 1), a.parts[s])) {
            case 'dd':
            case 'd':
              n = r;
              break;
            case 'mm':
            case 'm':
              o = r - 1;
              break;
            case 'yy':
              i = 2e3 + r;
              break;
            case 'yyyy':
              i = r;
          }
      return new Date(i, o, n);
    },
    formatDate: function(t) {
      var e,
        i,
        n,
        o,
        r,
        s = this.format,
        a = '';
      if (S(t))
        for (
          a = s.source,
            i = t.getFullYear(),
            (o = {
              d: t.getDate(),
              m: t.getMonth() + 1,
              yy: i.toString().substring(2),
              yyyy: i,
            }).dd = (o.d < 10 ? '0' : '') + o.d,
            o.mm = (o.m < 10 ? '0' : '') + o.m,
            e = s.parts.length,
            r = 0;
          r < e;
          r++
        )
          (n = s.parts[r]), (a = a.replace(n, o[n]));
      return a;
    },
    destroy: function() {
      this.unbind(), this.unbuild(), this.$element.removeData(a);
    },
  }),
    (D.LANGUAGES = {}),
    (D.DEFAULTS = {
      autoshow: !1,
      autohide: !1,
      autopick: !1,
      inline: !1,
      container: null,
      trigger: null,
      language: '',
      format: 'yyyy-mm-dd',
      date: null,
      startDate: null,
      endDate: null,
      startView: 0,
      weekStart: 0,
      yearFirst: !1,
      yearSuffix: '',
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      itemTag: 'li',
      mutedClass: 'muted',
      pickedClass: 'picked',
      disabledClass: 'disabled',
      template:
        '<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',
      offset: 10,
      zIndex: 1e3,
      filter: null,
      show: null,
      hide: null,
      pick: null,
    }),
    (D.setDefaults = function(t) {
      T.extend(D.DEFAULTS, T.isPlainObject(t) && t);
    }),
    (D.other = T.fn.qorDatepicker),
    (T.fn.qorDatepicker = function(o) {
      var r,
        s = k(arguments, 1);
      return (
        this.each(function() {
          var t,
            e,
            i = T(this),
            n = i.data(a);
          if (!n) {
            if (/destroy/.test(o)) return;
            (t = T.extend({}, i.data(), T.isPlainObject(o) && o)),
              i.data(a, (n = new D(this, t)));
          }
          q(o) && T.isFunction((e = n[o])) && (r = e.apply(n, s));
        }),
        $(r) ? this : r
      );
    }),
    (T.fn.qorDatepicker.Constructor = D),
    (T.fn.qorDatepicker.languages = D.LANGUAGES),
    (T.fn.qorDatepicker.setDefaults = D.setDefaults),
    (T.fn.qorDatepicker.noConflict = function() {
      return (T.fn.qorDatepicker = D.other), this;
    });
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(f) {
  var i = window.Mustache,
    p = window.QOR,
    o = 'qor.action',
    t = 'enable.' + o,
    n = 'click.' + o,
    r = '[data-ajax-form="true"][data-method]',
    e = '.qor-action-bulk-buttons',
    s = '.qor-page .qor-table-container',
    a = '.qor-table--bulking',
    l = '.qor-table--bulking tbody tr',
    m = 'is_undo',
    d = 'mdl-data-table--selectable',
    c = 'primary_values[]';
  function u(t, e) {
    (this.$element = f(t)),
      (this.options = f.extend({}, u.DEFAULTS, f.isPlainObject(e) && e)),
      (this.ajaxForm = {}),
      this.init();
  }
  return (
    (u.prototype = {
      constructor: u,
      init: function() {
        this.bind(), this.initActions();
      },
      bind: function() {
        this.$element
          .on(n, '.qor-action--bulk', this.renderBulkTable.bind(this))
          .on(n, '.qor-action--exit-bulk', this.removeBulkTable.bind(this)),
          f(document)
            .on(n, l, this.handleBulkTableClick.bind(this))
            .on(n, r, this.clickAjaxButton.bind(this));
      },
      unbind: function() {
        this.$element.off(n),
          f(document)
            .off(n, l, this.handleBulkTableClick)
            .off(n, r, this.clickAjaxButton);
      },
      initActions: function() {
        f(s).find('table').length ||
          (f(e).hide(), f('.qor-page__header a.qor-action--button').hide());
      },
      collectFormData: function() {
        var t = f(a).find('.mdl-checkbox__input:checked'),
          e = [],
          i = [],
          n = void 0;
        return (
          t.length &&
            t.each(function() {
              var t = f(this)
                .closest('tr')
                .data('primary-key');
              (n = {}),
                t &&
                  (e.push({ name: c, value: t.toString() }),
                  (n[c] = t.toString()),
                  i.push(n));
            }),
          (this.ajaxForm.formData = e),
          (this.ajaxForm.normalFormData = i),
          this.ajaxForm
        );
      },
      actionSubmit: function(t) {
        return this.submit(t), !1;
      },
      handleBulkTableClick: function(t) {
        var e = f(t.target).closest('tr'),
          i = e.find('td').first(),
          n = i.find('.mdl-js-checkbox');
        return (
          n.toggleClass('is-checked'),
          e.toggleClass('is-selected'),
          i.find('input').prop('checked', n.hasClass('is-checked')),
          !1
        );
      },
      adjustPageBodyStyle: function(t) {
        var e = f('.qor-page > .qor-page__header'),
          i = f('.qor-page > .qor-page__body'),
          n = e.find('.qor-page-subnav__header').length ? 96 : 48;
        t
          ? e.height() > n && i.css('padding-top', e.height())
          : parseInt(i.css('padding-top')) > n && i.css('padding-top', '');
      },
      renderBulkTable: function() {
        var t = f('body');
        t.hasClass('qor-slideout-open') && t.data('qor.slideout').hide(),
          f('.qor-table__inner-list').remove(),
          this.toggleBulkButtons(),
          this.enableTableMDL(),
          this.adjustPageBodyStyle(!0);
      },
      removeBulkTable: function() {
        this.toggleBulkButtons(),
          this.disableTableMDL(),
          this.adjustPageBodyStyle();
      },
      enableTableMDL: function() {
        f(s)
          .find('table')
          .removeAttr('data-upgraded')
          .addClass(d)
          .trigger('enable');
      },
      disableTableMDL: function() {
        f(s)
          .find('table')
          .removeClass(d)
          .find('tr')
          .removeClass('is-selected')
          .find('td:first,th:first')
          .remove();
      },
      toggleBulkButtons: function() {
        this.$element.find('.qor-action-forms').toggle(),
          f(e)
            .find('button')
            .toggleClass('hidden'),
          f(s)
            .toggleClass('qor-table--bulking')
            .find('.qor-table__actions')
            .toggle(),
          f(
            '.qor-page__header .qor-actions, .qor-page__header .qor-search-container',
          ).toggle();
      },
      clickAjaxButton: function(t) {
        var e = f(t.target);
        return (
          this.collectFormData(),
          (this.ajaxForm.properties = e.data()),
          this.submit(e),
          !1
        );
      },
      renderFlashMessage: function(t) {
        var e = u.FLASHMESSAGETMPL;
        return i.parse(e), i.render(e, t);
      },
      submit: function(e) {
        var i = this,
          n = this.ajaxForm || {},
          t = n.properties || e.data();
        !t.fromIndex || (n.formData && n.formData.length)
          ? t.confirm
            ? p.qorConfirm(t, function(t) {
                t && i.handleAjaxSubmit(n, e);
              })
            : this.handleAjaxSubmit(n, e)
          : p.qorConfirm(n.properties.errorNoItem);
      },
      handleAjaxSubmit: function(s, a) {
        var l = this,
          d = this.$element,
          c = s.properties || a.data(),
          u = c.url,
          h = c.undoUrl,
          e = a.hasClass(m),
          t = a.closest('.qor-slideout').length,
          i = d.length && !t;
        e && (u = h),
          f.ajax(u, {
            method: c.method,
            data: s.formData,
            dataType: c.datatype || 'json',
            beforeSend: function() {
              h ? a.prop('disabled', !0) : i && l.switchButtons(d, 1);
            },
            success: function(t) {
              if (h)
                return (
                  d.trigger('undo.qor.action', [a, e, t]),
                  e ? a.removeClass(m) : a.addClass(m),
                  void a.prop('disabled', !1)
                );
              window.location.reload();
            },
            error: function(t) {
              200 != t.status &&
                (h ? a.prop('disabled', !1) : i && l.switchButtons(d),
                p.handleAjaxError(t));
            },
            complete: function(t) {
              var e = t.getResponseHeader('content-type'),
                i = t.getResponseHeader('Content-Disposition');
              if (i && -1 !== i.indexOf('attachment')) {
                var n = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(i),
                  o = {},
                  r = '';
                null != n && n[1] && (r = n[1].replace(/['"]/g, '')),
                  c.method &&
                    (o = f.extend({}, s.normalFormData, { _method: c.method })),
                  p.qorAjaxHandleFile(u, e, r, o),
                  h ? a.prop('disabled', !1) : l.switchButtons(d);
              }
            },
          });
      },
      switchButtons: function(t, e) {
        var i = !!e;
        t.find('.qor-action-button').prop('disabled', i);
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (u.DEFAULTS = {}),
    (f.fn.qorSliderAfterShow.qorInsertActionData = function(t, e) {
      var i = f(e).find('[data-toggle="qor-action-slideout"]'),
        n = i.find('form'),
        o = f(a).find('.mdl-checkbox__input:checked');
      i.length &&
        o.length &&
        o.each(function() {
          var t = f(this)
            .closest('tr')
            .data('primary-key');
          t &&
            n.prepend(
              '<input class="js-primary-value" type="hidden" name="primary_values[]" value="' +
                t +
                '" />',
            );
        });
    }),
    (u.plugin = function(n) {
      return this.each(function() {
        var t = f(this),
          e = t.data(o),
          i = void 0;
        e || t.data(o, (e = new u(this, n))),
          'string' == typeof n && f.isFunction((i = e[n])) && i.call(e);
      });
    }),
    f(function() {
      var e = {},
        i = '[data-toggle="qor.action.bulk"]';
      f(i).length ||
        f(document).on(n, r, function(t) {
          return new u().actionSubmit(f(t.target)), !1;
        }),
        f(document)
          .on('disable.qor.action', function(t) {
            u.plugin.call(f(i, t.target), 'destroy');
          })
          .on(t, function(t) {
            u.plugin.call(f(i, t.target), e);
          })
          .triggerHandler(t);
    }),
    u
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(l) {
  var d = window.location,
    r = window.QOR,
    o = 'qor.advancedsearch',
    t = 'enable.' + o,
    e = 'click.' + o;
  function s(t, e) {
    (this.$element = l(t)),
      (this.options = l.extend({}, s.DEFAULTS, l.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (s.prototype = {
      constructor: s,
      init: function() {
        (this.$form = this.$element.find('form')),
          (this.$modal = l(s.MODAL).appendTo('body')),
          this.bind();
      },
      bind: function() {
        this.$element
          .on('submit.qor.advancedsearch', 'form', this.submit.bind(this))
          .on(e, '.qor-advanced-filter__save', this.showSaveFilter.bind(this))
          .on(e, '.qor-advanced-filter__toggle', this.toggleFilterContent)
          .on(e, '.qor-advanced-filter__close', this.closeFilter)
          .on(e, '.qor-advanced-filter__delete', this.deleteSavedFilter),
          this.$modal.on('shown.qor.modal', this.start.bind(this));
      },
      closeFilter: function() {
        l('.qor-advanced-filter__dropdown').hide();
      },
      toggleFilterContent: function(t) {
        l(t.target)
          .closest('.qor-advanced-filter__toggle')
          .parent()
          .find('>[advanced-search-toggle]')
          .toggle();
      },
      showSaveFilter: function() {
        this.$modal.qorModal('show');
      },
      deleteSavedFilter: function(t) {
        var e = l(t.target).closest('.qor-advanced-filter__delete'),
          i = e.closest('.qor-advanced-filter__savedfilter'),
          n = e.data('filter-name'),
          o = d.pathname;
        return (
          r.qorConfirm(
            { confirm: 'Are you sure you want to delete this saved filter?' },
            function(t) {
              t &&
                l
                  .get(o, l.param({ delete_saved_filter: n }))
                  .done(function() {
                    e.closest('li').remove(),
                      0 === i.find('li').length && i.remove();
                  })
                  .fail(function() {
                    r.qorConfirm('Server error, please try again!');
                  });
            },
          ),
          !1
        );
      },
      start: function() {
        this.$modal
          .trigger('enable.qor.material')
          .on(
            e,
            '.qor-advanced-filter__savefilter',
            this.saveFilter.bind(this),
          );
      },
      saveFilter: function() {
        var t = this.$modal.find('#qor-advanced-filter__savename').val();
        t &&
          this.$form
            .prepend(
              '<input type="hidden" name="filter_saving_name" value=' +
                t +
                '  />',
            )
            .submit();
      },
      submit: function() {
        var t = this.$form,
          e = t.find('input[name],select[name]'),
          i = [],
          n = void 0,
          o = t.closest('.qor-bottomsheets'),
          r = t.serialize();
        if (
          (e.each(function() {
            i.push(l(this).attr('name'));
          }),
          (n = (function(t) {
            var e = decodeURIComponent(d.search.substr(1)).split('&'),
              i = {},
              n = void 0,
              o = void 0;
            if (1 == e.length && '' == e[0]) return !1;
            for (o in e)
              '' !== e[o] && ((n = e[o].split('=')), (i[n[0]] = n[1]));
            return (
              t.forEach(function(t) {
                delete i[t];
              }),
              i
            );
          })(i)),
          !l.isEmptyObject(n))
        )
          for (var s in n)
            n.hasOwnProperty(s) &&
              t.prepend(
                '<input type="hidden" name=' + s + ' value=' + n[s] + '  />',
              );
        if (
          (this.$element.find('.qor-advanced-filter__dropdown').hide(),
          this.removeEmptyPairs(t),
          o.length)
        ) {
          if (o.data().url) {
            var a = o.data().url + '?' + r;
            return o.trigger('reloadFromUrl.qor.bottomsheets', [a]), !1;
          }
          console.log('dont have base URL! advancedsearch reload failed');
        }
      },
      removeEmptyPairs: function(t) {
        t.find('advanced-filter-group').each(function() {
          var t = l(this);
          '' == t.find('[filter-required]').val() && t.remove();
        });
      },
      destroy: function() {
        this.$element.removeData(o);
      },
    }),
    (s.DEFAULTS = {}),
    (s.MODAL =
      '<div class="qor-modal fade" tabindex="-1" role="dialog" aria-hidden="true">\n            <div class="mdl-card mdl-shadow--2dp" role="document">\n                <div class="mdl-card__title">\n                    <h2 class="mdl-card__title-text">Save advanced filter</h2>\n                </div>\n                <div class="mdl-card__supporting-text">\n                        \n                    <div class="mdl-textfield mdl-textfield--full-width mdl-js-textfield">\n                        <input class="mdl-textfield__input" type="text" id="qor-advanced-filter__savename">\n                        <label class="mdl-textfield__label" for="qor-advanced-filter__savename">Please enter name for this filter</label>\n                    </div>\n\n                </div>\n                <div class="mdl-card__actions">\n                    <a class="mdl-button mdl-button--colored mdl-button--raised qor-advanced-filter__savefilter">Save This Filter</a>\n                    <a class="mdl-button mdl-button--colored" data-dismiss="modal">Cancel</a>\n                </div>\n                <div class="mdl-card__menu">\n                    <button class="mdl-button mdl-button--icon" data-dismiss="modal" aria-label="close">\n                        <i class="material-icons">close</i>\n                    </button>\n                </div>\n            </div>\n        </div>'),
    (s.plugin = function(n) {
      return this.each(function() {
        var t = l(this),
          e = t.data(o),
          i = void 0;
        if (!e) {
          if (/destroy/.test(n)) return;
          t.data(o, (e = new s(this, n)));
        }
        'string' == typeof n && l.isFunction((i = e[n])) && i.apply(e);
      });
    }),
    l(function() {
      var e = '[data-toggle="qor.advancedsearch"]';
      l(document)
        .on('disable.qor.advancedsearch', function(t) {
          s.plugin.call(l(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          s.plugin.call(l(e, t.target), void 0);
        })
        .triggerHandler(t);
    }),
    s
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(o) {
  var r = 'qor.autoheight',
    t = 'enable.' + r;
  function s(t, e) {
    (this.$element = o(t)),
      (this.options = o.extend({}, s.DEFAULTS, o.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (s.prototype = {
      constructor: s,
      init: function() {
        var t = this.$element;
        (this.overflow = t.css('overflow')),
          (this.paddingTop = parseInt(t.css('padding-top'), 10)),
          (this.paddingBottom = parseInt(t.css('padding-bottom'), 10)),
          t.css('overflow', 'hidden'),
          this.resize(),
          this.bind();
      },
      bind: function() {
        this.$element.on('input', o.proxy(this.resize, this));
      },
      unbind: function() {
        this.$element.off('input', this.resize);
      },
      resize: function() {
        var t = this.$element;
        t.is(':hidden') ||
          t
            .height('auto')
            .height(
              t.prop('scrollHeight') - this.paddingTop - this.paddingBottom,
            );
      },
      destroy: function() {
        this.unbind(),
          this.$element.css('overflow', this.overflow).removeData(r);
      },
    }),
    (s.DEFAULTS = {}),
    (s.plugin = function(n) {
      return this.each(function() {
        var t,
          e = o(this),
          i = e.data(r);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(r, (i = new s(this, n)));
        }
        'string' == typeof n && o.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    o(function() {
      var e = 'textarea.qor-js-autoheight';
      o(document)
        .on('disable.qor.autoheight', function(t) {
          s.plugin.call(o(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          s.plugin.call(o(e, t.target));
        })
        .triggerHandler(t);
    }),
    s
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(v) {
  var u = window._,
    n = window.FormData,
    i = window.QOR_Translations, /* // NOTE: 国际化 */
    o = 'qor.bottomsheets',
    t = 'click.' + o,
    e = 'submit.' + o,
    r = 'qor-bottomsheets-open',
    _ = '.mdl-layout__content.qor-page',
    a = '.qor-page__body',
    q = '.qor-page__header',
    s = '.qor-bottomsheets__search-input';
  function h(t, e) {
    var i = [],
      n = 'href';
    return (
      e && (n = 'src'),
      t.each(function() {
        i.push(v(this).attr(n));
      }),
      u.uniq(i)
    );
  }
  function f(t, e) {
    var i = v.fn.qorSliderAfterShow;
    for (var n in i)
      i.hasOwnProperty(n) &&
        !i[n].isLoadedInBottomSheet &&
        ((i[n].isLoadedInBottomSheet = !0), i[n].call(this, t, e));
  }
  function w(t, e) {
    (this.$element = v(t)),
      (this.options = v.extend({}, w.DEFAULTS, v.isPlainObject(e) && e)),
      (this.resourseData = {}),
      this.init();
  }
  return (
    (w.prototype = {
      constructor: w,
      init: function() {
        this.build(), this.bind();
      },
      build: function() {
        var t = void 0;
        (this.$bottomsheets = t = v(w.TEMPLATE).appendTo('body')),
          (this.$body = t.find('.qor-bottomsheets__body')),
          (this.$title = t.find('.qor-bottomsheets__title')),
          (this.$header = t.find('.qor-bottomsheets__header')),
          (this.$bodyClass = v('body').prop('class')),
          (this.filterURL = ''),
          (this.searchParams = '');
      },
      bind: function() {
        this.$bottomsheets
          .on(e, 'form', this.submit.bind(this))
          .on(t, '[data-dismiss="bottomsheets"]', this.hide.bind(this))
          .on(t, '.qor-pagination a', this.pagination.bind(this))
          .on(t, '.qor-bottomsheets__search-button', this.search.bind(this))
          .on('keyup.qor.bottomsheets', this.keyup.bind(this))
          .on('selectorChanged.qor.selector', this.selectorChanged.bind(this))
          .on('filterChanged.qor.filter', this.filterChanged.bind(this))
          .on('reloadFromUrl.qor.bottomsheets', this.reloadFromUrl.bind(this));
      },
      unbind: function() {
        this.$bottomsheets
          .off(e, 'form')
          .off(t)
          .off('selectorChanged.qor.selector')
          .off('filterChanged.qor.filter');
      },
      bindActionData: function(t) {
        for (
          var e = this.$body
              .find('[data-toggle="qor-action-slideout"]')
              .find('form'),
            i = t.length - 1;
          0 <= i;
          i--
        )
          e.prepend(
            '<input type="hidden" name="primary_values[]" value="' +
              t[i] +
              '" />',
          );
      },
      filterChanged: function(t, e, i) {
        var n;
        return (n = this.constructloadURL(e, i)) && this.reload(n), !1;
      },
      selectorChanged: function(t, e, i) {
        var n;
        return (n = this.constructloadURL(e, i)) && this.reload(n), !1;
      },
      keyup: function(t) {
        var e = this.$bottomsheets.find(s);
        13 === t.which && e.length && e.is(':focus') && this.search();
      },
      search: function() {
        var t = this.$bottomsheets,
          e = t.data().url + '?keyword=' + v.trim(t.find(s).val());
        this.reload(e);
      },
      pagination: function(t) {
        var e = v(t.target).prop('href');
        return e && this.reload(e), !1;
      },
      reload: function(t) {
        var e = this.$bottomsheets.find(a);
        this.addLoading(e), this.fetchPage(t);
      },
      reloadFromUrl: function(t, e) {
        this.reload(e);
      },
      fetchPage: function(o) {
        var r = this.$bottomsheets,
          s = this;
        v.get(o, function(t) {
          var e = v(t).find(_),
            i = e.find(q),
            n = e.find(a);
          n.length
            ? (r.find(a).html(n.html()),
              i.length &&
                (s.$body
                  .find(q)
                  .html(i.html())
                  .trigger('enable'),
                s.addHeaderClass()),
              r.trigger('reload.qor.bottomsheets'))
            : s.reload(o);
        }).fail(function() {
          window.alert('server error, please try again later!');
        });
      },
      constructloadURL: function(t, e) {
        var i,
          n,
          o,
          r,
          s,
          a,
          l,
          d = this.filterURL,
          c = this.$bottomsheets.data().url;
        if (!d) {
          if (!c) return;
          d = c;
        }
        return (
          (i = (function(t, e) {
            t = t.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var i = new RegExp('[\\?&]' + t + '=([^&#]*)').exec(e);
            return null === i
              ? ''
              : decodeURIComponent(i[1].replace(/\+/g, ' '));
          })(e, new URL('http://www.getqor.com/' + t).search)),
          (d = this.filterURL = ((n = e),
          (o = i),
          (r = d),
          (s = String(n).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&')),
          (a = new RegExp('([?&])' + s + '=.*?(&|$)', 'i')),
          (l = -1 !== r.indexOf('?') ? '&' : '?'),
          r.match(a)
            ? o
              ? r.replace(a, '$1' + n + '=' + o + '$2')
              : '?' === RegExp.$1 || RegExp.$1 === RegExp.$2
              ? r.replace(a, '$1')
              : r.replace(a, '')
            : o
            ? r + l + n + '=' + o
            : void 0))
        );
      },
      addHeaderClass: function() {
        this.$body.find(q).hide(),
          this.$bottomsheets.find(q).children('.qor-bottomsheet__filter')
            .length &&
            this.$body
              .addClass('has-header')
              .find(q)
              .show();
      },
      addLoading: function(t) {
        t.html(''),
          v(w.TEMPLATE_LOADING)
            .appendTo(t)
            .trigger('enable.qor.material');
      },
      loadExtraResource: function(t) {
        var e,
          i,
          n,
          o,
          r,
          s,
          a,
          l,
          d = ((r = t.$links),
          (s = v('link')),
          (a = h(r)),
          (l = h(s)),
          u.difference(a, l)),
          c = ((e = t.$scripts),
          (i = v('script')),
          (n = h(e, !0)),
          (o = h(i, !0)),
          u.difference(n, o));
        d.length &&
          (function t(e) {
            var i = document.createElement('link'),
              n = e.shift();
            (i.type = 'text/css'),
              (i.rel = 'stylesheet'),
              (i.onload = function() {
                e.length && t(e);
              }),
              (i.href = n),
              document.getElementsByTagName('head')[0].appendChild(i);
          })(d),
          c.length &&
            (function(t, e, i) {
              for (var n = 0, o = 0, r = t.length; o < r; o++) {
                var s = document.createElement('script');
                (s.onload = function() {
                  ++n === t.length && v.isFunction(i) && i(),
                    e && e.url && e.response && f(e.url, e.response);
                }),
                  (s.src = t[o]),
                  document.body.appendChild(s);
              }
            })(c, t);
      },
      loadMedialibraryJS: function(t) {
        var e,
          i = t.filter('script'),
          n = /theme=media_library/g,
          o = this;
        i.each(function() {
          if (((e = v(this).prop('src')), n.test(e))) {
            var t = document.createElement('script');
            (t.src = e),
              document.body.appendChild(t),
              (o.mediaScriptAdded = !0);
          }
        });
      },
      submit: function(t) {
        var d,
          e = t.target,
          c = v(e),
          u = this,
          h = c.prop('action'),
          f = c.closest('.qor-bottomsheets'),
          p = f.data(),
          i = p.ajaxType,
          m = c.find(':submit');
        p.ingoreSubmit ||
          (c.data().normalSubmit ||
            (v(document).trigger('bottomsheetBeforeSend.qor.bottomsheets'),
            t.preventDefault(),
            (d = new n(e)),
            v.ajax(h, {
              method: c.prop('method'),
              data: d,
              dataType: i || 'html',
              processData: !1,
              contentType: !1,
              beforeSend: function() {
                m.prop('disabled', !0);
              },
              success: function(t, e, i) {
                if (p.ajaxMute) f.remove();
                else if (p.ajaxTakeover)
                  p.$target
                    .parent()
                    .trigger('ajaxSuccessed.qor.bottomsheets', [t, f]);
                else {
                  var n = i.getResponseHeader('Content-Disposition');
                  if (n && -1 !== n.indexOf('attachment')) {
                    var o = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(n),
                      r = i.getResponseHeader('Content-Type'),
                      s = '';
                    return (
                      null != o && o[1] && (s = o[1].replace(/['"]/g, '')),
                      window.QOR.qorAjaxHandleFile(h, r, s, d),
                      void m.prop('disabled', !1)
                    );
                  }
                  v('.qor-error').remove();
                  var a = c.data('returnUrl'),
                    l = c.data('refreshUrl');
                  l
                    ? (window.location.href = l)
                    : 'refresh' != a
                    ? (a && 'refresh' != a ? u.load(a) : u.refresh(),
                      v(document).trigger(
                        'bottomsheetSubmitComplete.qor.bottomsheets',
                      ))
                    : u.refresh();
                }
              },
              error: function(t) {
                window.QOR.handleAjaxError(t);
              },
              complete: function() {
                m.prop('disabled', !1);
              },
            })));
      },
      load: function(a, l, d) {
        var c,
          t,
          e,
          u = this.options,
          h = l.actionData,
          f = this.resourseData,
          p = f.selectModal,
          m = f.ingoreSubmit,
          y = this.$bottomsheets,
          b = this.$header,
          g = this.$body;
        a &&
          (this.show(),
          this.addLoading(g),
          (this.filterURL = a),
          g.removeClass('has-header has-hint'),
          (l = v.isPlainObject(l) ? l : {}),
          (c = l.method ? l.method : 'GET'),
          (t = l.datatype ? l.datatype : 'html'),
          (e = v.proxy(function() {
            v.ajax(a, {
              method: c,
              dataType: t,
              success: v.proxy(function(t) {
                if ('GET' === c) {
                  var e = v(t),
                    i = void 0,
                    n = void 0,
                    o = {
                      $scripts: e.filter('script'),
                      $links: e.filter('link'),
                      url: a,
                      response: t,
                    },
                    r = p && e.find('.qor-search-container').length,
                    s = t.match(/<\s*body.*>[\s\S]*<\s*\/body\s*>/gi);
                  if (
                    ((i = e.find(_)),
                    s &&
                      ((s = s
                        .join('')
                        .replace(/<\s*body/gi, '<div')
                        .replace(/<\s*\/body/gi, '</div')),
                      (n = v(s).prop('class')),
                      v('body').addClass(n)),
                    !i.length)
                  )
                    return;
                  this.loadExtraResource(o),
                    m && i.find(q).remove(),
                    i
                      .find('.qor-button--cancel')
                      .attr('data-dismiss', 'bottomsheets'),
                    g.html(i.html()),
                    this.$title.html(e.find(u.title).html()),
                    l.selectDefaultCreating &&
                      this.$title.append(
                        '<button class="mdl-button mdl-button--primary" type="button" data-load-inline="true" data-select-nohint="' +
                          l.selectNohint +
                          '" data-select-modal="' +
                          l.selectModal +
                          '" data-select-listing-url="' +
                          l.selectListingUrl +
                          '">' +
                          l.selectBacktolistTitle +
                          '</button>',
                      ),
                    p &&
                      (g
                        .find('.qor-button--new')
                        .data('ingoreSubmit', !0)
                        .data('selectId', f.selectId)
                        .data('loadInline', !0),
                      'one' == p ||
                        l.selectNohint ||
                        (void 0 !== f.maxItem && '1' == f.maxItem) ||
                        g.addClass('has-hint'),
                      'mediabox' != p ||
                        this.mediaScriptAdded ||
                        this.loadMedialibraryJS(e)),
                    b.find('.qor-button--new').remove(),
                    this.$title.after(g.find('.qor-button--new')),
                    r &&
                      (y.addClass('has-search'),
                      b.find('.qor-bottomsheets__search').remove(),
                      b.prepend(w.TEMPLATE_SEARCH)),
                    h && h.length && this.bindActionData(h),
                    f.bottomsheetClassname &&
                      y.addClass(f.bottomsheetClassname),
                    y.trigger('enable'),
                    y.one('hidden.qor.bottomsheets', function() {
                      v(this).trigger('disable');
                    }),
                    this.addHeaderClass(),
                    y.data(l),
                    d && v.isFunction(d) && d(this.$bottomsheets),
                    y.trigger('bottomsheetLoaded.qor.bottomsheets', [a, t]);
                } else l.returnUrl ? this.load(l.returnUrl) : this.refresh();
              }, this),
              error: v.proxy(function() {
                var t;
                this.$bottomsheets.remove(),
                  v('.qor-bottomsheets').is(':visible') ||
                    v('body').removeClass(r),
                  (t =
                    0 < v('.qor-error span').length
                      ? v('.qor-error span')
                          .map(function() {
                            return v(this).text();
                          })
                          .get()
                          .join(', ')
                      : i.serverError),
                  window.alert(t);
              }, this),
            });
          }, this)),
          e());
      },
      open: function(t, e) {
        t.loadInline || this.init(),
          (this.resourseData = t),
          this.load(t.url, t, e);
      },
      show: function() {
        this.$bottomsheets.addClass('is-shown').get(0).offsetHeight,
          this.$bottomsheets.addClass('is-slided'),
          v('body').addClass(r);
      },
      hide: function(t) {
        var e = v(t.target).closest('.qor-bottomsheets'),
          i = v('.qor-datepicker').not('.hidden');
        return (
          i.length && i.addClass('hidden'),
          e.qorSelectCore('destroy'),
          e.trigger('bottomsheetClosed.qor.bottomsheets').remove(),
          v('.qor-bottomsheets').is(':visible') || v('body').removeClass(r),
          !1
        );
      },
      refresh: function() {
        this.$bottomsheets.remove(),
          v('body').removeClass(r),
          setTimeout(function() {
            window.location.reload();
          }, 350);
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (w.DEFAULTS = { title: '.qor-form-title, .mdl-layout-title', content: !1 }),
    (w.TEMPLATE_ERROR =
      '<ul class="qor-error"><li><label><i class="material-icons">error</i><span>[[error]]</span></label></li></ul>'),
    (w.TEMPLATE_LOADING =
      '<div style="text-align: center; margin-top: 30px;"><div class="mdl-spinner mdl-js-spinner is-active qor-layout__bottomsheet-spinner"></div></div>'),
    (w.TEMPLATE_SEARCH =
      '<div class="qor-bottomsheets__search">\n            <input autocomplete="off" type="text" class="mdl-textfield__input qor-bottomsheets__search-input" placeholder="Search" />\n            <button class="mdl-button mdl-js-button mdl-button--icon qor-bottomsheets__search-button" type="button"><i class="material-icons">search</i></button>\n        </div>'),
    (w.TEMPLATE =
      '<div class="qor-bottomsheets">\n            <div class="qor-bottomsheets__header">\n            <h3 class="qor-bottomsheets__title"></h3>\n            <button type="button" class="mdl-button mdl-button--icon mdl-js-button mdl-js-repple-effect qor-bottomsheets__close" data-dismiss="bottomsheets">\n            <span class="material-icons">close</span>\n            </button>\n            </div>\n            <div class="qor-bottomsheets__body"></div>\n        </div>'),
    (w.plugin = function(n) {
      return this.each(function() {
        var t,
          e = v(this),
          i = e.data(o);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(o, (i = new w(this, n)));
        }
        'string' == typeof n && v.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    (v.fn.qorBottomSheets = w.plugin),
    w
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(o) {
  var r = 'qor.chooser',
    t = 'enable.' + r;
  function s(t, e) {
    (this.$element = o(t)),
      (this.options = o.extend({}, s.DEFAULTS, o.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (s.prototype = {
      constructor: s,
      init: function() {
        var t,
          i = this.$element,
          e = i.data(),
          n = { minimumResultsForSearch: 8, dropdownParent: i.parent() };
        e.remoteData &&
          ((n.ajax = o.fn.select2.ajaxCommonOptions(e)),
          (n.templateResult = function(t) {
            var e = i
              .parents('.qor-field')
              .find('[name="select2-result-template"]');
            return o.fn.select2.ajaxFormatResult(t, e);
          }),
          (n.templateSelection = function(t) {
            if (t.loading) return t.text;
            var e = i
              .parents('.qor-field')
              .find('[name="select2-selection-template"]');
            return o.fn.select2.ajaxFormatResult(t, e);
          })),
          i
            .on('select2:select', function(t) {
              o(t.target).attr('chooser-selected', 'true');
            })
            .on('select2:unselect', function(t) {
              o(t.target).attr('chooser-selected', '');
            }),
          i.select2(n),
          this.resetSelect2Width(),
          (t = window._.debounce(this.resetSelect2Width.bind(this), 300)),
          o(window).resize(t),
          i.val() && i.attr('chooser-selected', 'true');
      },
      resetSelect2Width: function() {
        var t,
          e = this.$element.data().select2;
        e && e.$container && (t = e.$container).width(t.parent().width());
      },
      destroy: function() {
        this.$element.select2('destroy').removeData(r);
      },
    }),
    (s.DEFAULTS = {}),
    (s.plugin = function(n) {
      return this.each(function() {
        var t,
          e = o(this),
          i = e.data(r);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(r, (i = new s(this, n)));
        }
        'string' == typeof n && o.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    o(function() {
      var e = 'select[data-toggle="qor.chooser"]';
      o(document)
        .on('disable.qor.chooser', function(t) {
          s.plugin.call(o(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          s.plugin.call(o(e, t.target));
        })
        .triggerHandler(t);
    }),
    s
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(q) {
  var r = window.URL || window.webkitURL,
    s = 'qor.cropper',
    t = 'enable.' + s,
    n = 'change.' + s,
    h = 'click.' + s,
    e = 'shown.qor.modal',
    i = 'hidden.qor.modal',
    w = '.qor-cropper__toggle',
    f = '.qor-cropper__wrapper',
    p = '.qor-cropper__options',
    a = '.qor-cropper__toggle--crop';
  function $(t, e) {
    var i,
      n = String(e),
      o = n.toLowerCase(),
      r = n.toUpperCase(),
      s = ('string' == typeof (i = n) &&
        (i = i.charAt(0).toUpperCase() + i.substr(1)),
      i);
    if (q.isPlainObject(t)) return t[o] || t[s] || t[r];
  }
  function l(t) {
    return /.svg$/.test(t);
  }
  function d(t, e) {
    (this.$element = q(t)),
      (this.options = q.extend(!0, {}, d.DEFAULTS, q.isPlainObject(e) && e)),
      (this.data = null),
      this.init();
  }
  return (
    (d.prototype = {
      constructor: d,
      init: function() {
        var t,
          e = this.options,
          i = this.$element,
          n = i.closest(e.parent),
          o = void 0,
          r = void 0,
          s = this,
          a = void 0;
        n.length || (n = i.parent()),
          (this.$parent = n),
          (this.$output = n.find(e.output)),
          (this.$formCropInput = n
            .closest('form')
            .find('input[name="QorResource.MediaOption"]:hidden')),
          (this.$list = n.find(e.list)),
          (t = this.$output.data('fetchSizedata'))
            ? q.getJSON(t, function(t) {
                (a = JSON.parse(t.MediaOption)),
                  s.$output.val(JSON.stringify(t)),
                  s.$formCropInput.val(JSON.stringify(t)),
                  (s.data = a || {}),
                  l(a.URL || a.Url) && s.resetImage(),
                  s.build(),
                  s.bind();
              })
            : ((r = q.trim(this.$output.val())) &&
                l((o = JSON.parse(r)).URL || o.Url) &&
                this.resetImage(),
              (this.data = o || {}),
              this.build(),
              this.bind());
      },
      resetImage: function() {
        this.$parent.addClass('is-svg');
      },
      build: function() {
        var i,
          t,
          e = this.$output.data(),
          n = {},
          o = void 0;
        e &&
          ((n = {
            title: e.cropperTitle,
            ok: e.cropperOk,
            cancel: e.cropperCancel,
          }),
          (o = this.options.text)),
          n.ok && n.title && n.cancel && (o = n),
          this.wrap(),
          (this.$modal = q(
            ((i = d.MODAL),
            (t = o),
            'string' == typeof i &&
              'object' === (void 0 === t ? 'undefined' : _typeof(t)) &&
              q.each(t, function(t, e) {
                i = i.replace('$[' + String(t).toLowerCase() + ']', e);
              }),
            i),
          ).appendTo('body'));
      },
      unbuild: function() {
        this.$modal.remove(), this.unwrap();
      },
      wrap: function() {
        var t = this.$list,
          e = void 0;
        (e = t.find('img').not('.is-svg')).length
          ? (t.find('li').append(d.TOGGLE), e.wrap(d.CANVAS), this.center(e))
          : t.find(a).remove();
      },
      unwrap: function() {
        var t = this.$list;
        t.find(w).remove(),
          t.find('.qor-cropper__canvas').each(function() {
            var t = q(this);
            t.before(t.html()).remove();
          });
      },
      bind: function() {
        this.$element.on(n, q.proxy(this.read, this)),
          this.$list.on(h, q.proxy(this.click, this)),
          this.$modal
            .on(e, q.proxy(this.start, this))
            .on(i, q.proxy(this.stop, this));
      },
      unbind: function() {
        this.$element.off(n, this.read),
          this.$list.off(h, this.click),
          this.$modal.off(e, this.start).off(i, this.stop);
      },
      click: function(t) {
        var e = t.target,
          i = void 0,
          n = this.data,
          o = void 0;
        e !== this.$list[0] &&
          ((i = q(e)).closest('.qor-cropper__toggle--delete').length &&
            ((n.Delete = !0),
            this.$output.val(JSON.stringify(n)),
            this.$formCropInput.val(JSON.stringify(n)),
            this.$list.hide(),
            (o = q(d.ALERT)).find('.qor-fieldset__undo').one(
              h,
              function() {
                o.remove(),
                  this.$list.show(),
                  delete n.Delete,
                  this.$output.val(JSON.stringify(n)),
                  this.$formCropInput.val(JSON.stringify(n));
              }.bind(this),
            ),
            this.$parent.find('.qor-fieldset').append(o)),
          i.closest(a).length &&
            ((i = i.closest('li').find('img')),
            (this.$target = i),
            this.$modal.qorModal('show')));
      },
      read: function(t) {
        var e = t.target.files,
          i = void 0,
          n = this.$list,
          o = this.$parent.find('.qor-fieldset__alert');
        n.show(),
          o.length && o.remove(),
          e &&
            e.length &&
            ((i = e[0]),
            /^image\//.test(i.type) && r
              ? ((this.fileType = i.type),
                this.load(r.createObjectURL(i)),
                this.$parent.find('.qor-medialibrary__image-desc').show())
              : n.empty().html(d.FILE_LIST.replace('{{filename}}', i.name)));
      },
      load: function(t, u, h) {
        var f,
          p = this.options,
          m = this,
          y = this.$list,
          e = q(d.LIST),
          b = this.data || {},
          g = this.$output.val() ? JSON.parse(this.$output.val()) : {},
          v = ['Video', 'SelectedType', 'Description'],
          _ = this.fileType,
          i = void 0;
        u || (y.find('ul').remove(), y.html(e)),
          (i = y.find('img')),
          this.wrap(),
          (f = i.length),
          i
            .one('load', function() {
              if ('image/svg+xml' === _) return y.find(w).remove(), !1;
              var t = q(this),
                e = this.naturalWidth,
                i = this.naturalHeight,
                n = t.data(),
                o = n.sizeResolution,
                r = n.sizeName,
                s = {},
                a = {},
                l = void 0,
                d = n.sizeResolutionWidth,
                c = n.sizeResolutionHeight;
              o
                ? (d || c || ((d = $(o, 'width')), (c = $(o, 'height'))),
                  e < i * (l = d / c) ? (c = (d = e) / l) : (d = (c = i) * l),
                  (s = { naturalWidth: e, naturalHeight: i }),
                  (a = {
                    x: Math.round((e - d) / 2),
                    y: Math.round((i - c) / 2),
                    width: Math.round(d),
                    height: Math.round(c),
                  }),
                  m.preview(t, s, a),
                  r &&
                    ((b.Crop = !0),
                    b[p.key] || (b[p.key] = {}),
                    'original' != r && (b[p.key][r] = a)))
                : m.center(t),
                ('' !== b.Crop && u) || delete b.Crop,
                u || ((b.CropOptions = null), delete b.Sizes),
                delete b.Delete,
                v.forEach(function(t) {
                  g[t] && (b[t] = g[t]);
                }),
                m.$output.val(JSON.stringify(b)),
                m.$formCropInput.val(JSON.stringify(b)),
                r &&
                  b[p.key] &&
                  Object.keys(b[p.key]).length >= f &&
                  h &&
                  q.isFunction(h) &&
                  h();
            })
            .attr('src', t)
            .data('originalUrl', t),
          y.show();
      },
      start: function() {
        var t,
          o = this.options,
          r = this.$modal,
          e = this.$target.data(),
          s = e.sizeName || 'original',
          i = e.sizeResolution,
          a = q('<img src=' + e.originalUrl + '>'),
          l = this.data || {},
          d = this,
          n = NaN,
          c = e.sizeResolutionWidth,
          u = e.sizeResolutionHeight;
        i &&
          (c || u || ((c = $(i, 'width')), (u = $(i, 'height'))), (n = c / u)),
          l[o.key] || (l[o.key] = {}),
          r
            .trigger('enable.qor.material')
            .find(f)
            .html(a),
          (t = this.getList(n)) &&
            r
              .find(p)
              .show()
              .append(t),
          a.cropper({
            aspectRatio: n,
            data: (function(t) {
              var e = {},
                i = void 0;
              if (q.isPlainObject(t))
                for (i in t)
                  t.hasOwnProperty(i) && (e[String(i).toLowerCase()] = t[i]);
              return e;
            })(l[o.key][s]),
            background: !1,
            movable: !1,
            zoomable: !1,
            scalable: !1,
            rotatable: !1,
            autoCropArea: 1,
            ready: function() {
              r
                .find('.qor-cropper__options-toggle')
                .on(h, function() {
                  r.find('.qor-cropper__options-input').prop(
                    'checked',
                    q(this).prop('checked'),
                  );
                })
                .prop('checked', !0),
                r.find('.qor-cropper__save').one(h, function() {
                  var t = a.cropper('getData', !0),
                    e = a.cropper('getCroppedCanvas'),
                    i = [],
                    n = void 0;
                  if (
                    ((l.Crop = !0),
                    (l[o.key][s] = t),
                    (d.imageData = a.cropper('getImageData')),
                    (d.cropData = t),
                    e)
                  )
                    try {
                      n = e.toDataURL();
                    } catch (t) {
                      console.log(t),
                        console.log('Please check image Cross-origin setting');
                    }
                  r.find(p + ' input').each(function() {
                    var t = q(this);
                    t.prop('checked') && i.push(t.attr('name'));
                  }),
                    d.output(n, i),
                    r.qorModal('hide');
                });
            },
          });
      },
      stop: function() {
        this.$modal
          .trigger('disable.qor.material')
          .find(f + ' > img')
          .cropper('destroy')
          .remove()
          .end()
          .find(p)
          .hide()
          .find('ul')
          .remove();
      },
      getList: function(r) {
        var s = [];
        return (
          this.$list
            .find('img')
            .not(this.$target)
            .each(function() {
              var t = q(this).data(),
                e = t.sizeResolution,
                i = t.sizeName,
                n = t.sizeResolutionWidth,
                o = t.sizeResolutionHeight;
              e &&
                (n || o || ((n = $(e, 'width')), (o = $(e, 'height'))),
                n / o === r &&
                  s.push(
                    '<label><input class="qor-cropper__options-input" type="checkbox" name="' +
                      i +
                      '" checked> <span>' +
                      i +
                      '<small>(' +
                      n +
                      '&times;' +
                      o +
                      ' px)</small></span></label>',
                  ));
            }),
          s.length ? '<ul><li>' + s.join('</li><li>') + '</li></ul>' : ''
        );
      },
      output: function(t, e) {
        var i = this.$target;
        t ? this.center(i.attr('src', t), !0) : this.preview(i),
          q.isArray(e) && e.length && this.autoCrop(t, e),
          this.$output.val(JSON.stringify(this.data)).trigger(n),
          this.$formCropInput.val(JSON.stringify(this.data));
      },
      preview: function(t, e, i) {
        var n,
          o = t.parent().parent(),
          r = o.width(),
          s = o.height(),
          a = e || this.imageData,
          l = q.extend({}, i || this.cropData),
          d = l.width / l.height,
          c = r;
        0 != c &&
          0 != a.naturalWidth &&
          0 != a.naturalHeight &&
          (s * d <= r && (c = s * d),
          (n = l.width / c),
          t.css({
            maxWidth: a.naturalWidth / n,
            maxHeight: a.naturalHeight / n,
          }),
          this.center(t));
      },
      center: function(t, i) {
        t.each(function() {
          var t = q(this),
            n = t.parent(),
            o = n.parent();
          function e() {
            var t = o.height(),
              e = n.height(),
              i = 'auto';
            e < t && (i = (t - e) / 2), n.css('margin-top', i);
          }
          i && n.add(t).removeAttr('style'),
            this.complete ? e.call(this) : (this.onload = e);
        });
      },
      autoCrop: function(i, n) {
        var o = this.cropData,
          r = this.data[this.options.key],
          s = this;
        this.$list
          .find('img')
          .not(this.$target)
          .each(function() {
            var t = q(this),
              e = t.data('sizeName');
            -1 < q.inArray(e, n) &&
              ((r[e] = q.extend({}, o)),
              i ? s.center(t.attr('src', i), !0) : s.preview(t));
          });
      },
      destroy: function() {
        this.$element.removeData(s);
      },
    }),
    (d.DEFAULTS = {
      parent: !1,
      output: !1,
      list: !1,
      key: 'data',
      data: null,
      text: { title: 'Crop the image', ok: 'OK', cancel: 'Cancel' },
    }),
    (d.TOGGLE =
      '<div class="qor-cropper__toggle">\n            <div class="qor-cropper__toggle--crop"><i class="material-icons">crop</i></div>\n            <div class="qor-cropper__toggle--delete"><i class="material-icons">delete</i></div>\n        </div>'),
    (d.ALERT =
      '<div class="qor-fieldset__alert">\n            <button class="mdl-button mdl-button--accent qor-fieldset__undo" type="button">Undo delete</button>\n        </div>'),
    (d.CANVAS = '<div class="qor-cropper__canvas"></div>'),
    (d.LIST = '<ul><li><img></li></ul>'),
    (d.FILE_LIST =
      '<div class="qor-file__list-item">\n                                <span><span>{{filename}}</span></span>\n                                <div class="qor-cropper__toggle">\n                                    <div class="qor-cropper__toggle--delete"><i class="material-icons">delete</i></div>\n                                </div>\n                            </div>'),
    (d.MODAL =
      '<div class="qor-modal fade" tabindex="-1" role="dialog" aria-hidden="true">\n            <div class="mdl-card mdl-shadow--2dp" role="document">\n                <div class="mdl-card__title">\n                    <h2 class="mdl-card__title-text">$[title]</h2>\n                </div>\n                <div class="mdl-card__supporting-text">\n                    <div class="qor-cropper__wrapper"></div>\n                    <div class="qor-cropper__options">\n                        <p>Sync cropping result to: <label><input type="checkbox" class="qor-cropper__options-toggle" checked/> All</label></p>\n                    </div>\n                </div>\n                <div class="mdl-card__actions mdl-card--border">\n                    <a class="mdl-button mdl-button--colored mdl-button--raised qor-cropper__save">$[ok]</a>\n                    <a class="mdl-button mdl-button--colored" data-dismiss="modal">$[cancel]</a>\n                </div>\n                <div class="mdl-card__menu">\n                    <button class="mdl-button mdl-button--icon" data-dismiss="modal" aria-label="close">\n                        <i class="material-icons">close</i>\n                    </button>\n                </div>\n            </div>\n        </div>'),
    (d.plugin = function(o) {
      return this.each(function() {
        var t = q(this),
          e = t.data(s),
          i = void 0,
          n = void 0;
        if (!e) {
          if (!q.fn.cropper) return;
          if (/destroy/.test(o)) return;
          (i = q.extend(
            !0,
            {},
            t.data(),
            'object' === (void 0 === o ? 'undefined' : _typeof(o)) && o,
          )),
            t.data(s, (e = new d(this, i)));
        }
        'string' == typeof o && q.isFunction((n = e[o])) && n.apply(e);
      });
    }),
    q(function() {
      var e = '.qor-file__input',
        i = {
          parent: '.qor-file',
          output: '.qor-file__options',
          list: '.qor-file__list',
          key: 'CropOptions',
        };
      q(document)
        .on(t, function(t) {
          d.plugin.call(q(e, t.target), i);
        })
        .on('disable.qor.cropper', function(t) {
          d.plugin.call(q(e, t.target), 'destroy');
        })
        .triggerHandler(t);
    }),
    d
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(a) {
  var r = 'qor.datepicker',
    t = 'enable.' + r,
    l = 'pick.' + r,
    d = 'click.' + r,
    c = '.qor-datepicker__embedded',
    u = '.qor-datepicker__save',
    i = '[data-picker-type]';
  function h(t, e) {
    (this.$element = a(t)),
      (this.options = a.extend(!0, {}, h.DEFAULTS, a.isPlainObject(e) && e)),
      (this.date = null),
      (this.formatDate = null),
      (this.built = !1),
      (this.pickerData = this.$element.data()),
      (this.$parent = this.$element.closest(i)),
      (this.isDateTimePicker = 'datetime' == this.$parent.data('picker-type')),
      (this.$targetInput = this.$parent.find(
        this.pickerData.targetInput ||
          (this.isDateTimePicker
            ? '.qor-datetimepicker__input'
            : '.qor-datepicker__input'),
      )),
      this.init();
  }
  return (
    (h.prototype = {
      init: function() {
        this.$targetInput.is(':disabled')
          ? this.$element.remove()
          : this.bind();
      },
      bind: function() {
        this.$element.on(d, a.proxy(this.show, this));
      },
      unbind: function() {
        this.$element.off(d, this.show);
      },
      build: function() {
        var i,
          t,
          e = void 0,
          n = this.$element,
          o = this.$targetInput,
          r = o.val(),
          s = { date: new Date(), inline: !0 };
        this.built ||
          (n.is(':input') && Date.parse(n.val())
            ? (s.date = new Date(n.val()))
            : r && Date.parse(r) && (s.date = new Date(r)),
          (this.$modal = e = a(
            ((i = h.TEMPLATE),
            (t = this.options.text),
            'string' == typeof i &&
              'object' === (void 0 === t ? 'undefined' : _typeof(t)) &&
              a.each(t, function(t, e) {
                i = i.replace('$[' + String(t).toLowerCase() + ']', e);
              }),
            i),
          ).appendTo('body')),
          o.data('start-date') && (s.startDate = new Date()),
          e
            .find(c)
            .on(l, a.proxy(this.change, this))
            .qorDatepicker(s)
            .triggerHandler(l),
          e.find(u).on(d, a.proxy(this.pick, this)),
          (this.built = !0));
      },
      unbuild: function() {
        this.built &&
          this.$modal
            .find(c)
            .off(l, this.change)
            .qorDatepicker('destroy')
            .end()
            .find(u)
            .off(d, this.pick)
            .end()
            .remove();
      },
      change: function(t) {
        var e,
          i = this.$modal,
          n = a(t.target);
        (this.date = e = n.qorDatepicker('getDate')),
          (this.formatDate = n.qorDatepicker('getDate', !0)),
          i.find('.qor-datepicker__picked-year').text(e.getFullYear()),
          i
            .find('.qor-datepicker__picked-date')
            .text(
              [
                n.qorDatepicker('getDayName', e.getDay(), !0) + ',',
                String(n.qorDatepicker('getMonthName', e.getMonth(), !0)),
                e.getDate(),
              ].join(' '),
            );
      },
      show: function() {
        this.built || this.build(), this.$modal.qorModal('show');
      },
      pick: function() {
        var t = this.$targetInput,
          e = this.formatDate;
        if (this.isDateTimePicker) {
          var i = /^\d{4}-\d{1,2}-\d{1,2}/,
            n = t.val();
          i.test(n) ? (e = n.replace(i, e)) : (e += ' 00:00');
        }
        t.val(e).trigger('change'), this.$modal.qorModal('hide');
      },
      destroy: function() {
        this.unbind(), this.unbuild(), this.$element.removeData(r);
      },
    }),
    (h.DEFAULTS = {
      text: { title: 'Pick a date', ok: 'OK', cancel: 'Cancel' },
    }),
    (h.TEMPLATE =
      '<div class="qor-modal fade qor-datepicker" tabindex="-1" role="dialog" aria-hidden="true">\n            <div class="mdl-card mdl-shadow--2dp" role="document">\n                <div class="mdl-card__title">\n                    <h2 class="mdl-card__title-text">$[title]</h2>\n                </div>\n                <div class="mdl-card__supporting-text">\n                    <div class="qor-datepicker__picked">\n                        <div class="qor-datepicker__picked-year"></div>\n                        <div class="qor-datepicker__picked-date"></div>\n                    </div>\n                    <div class="qor-datepicker__embedded"></div>\n                </div>\n                <div class="mdl-card__actions">\n                    <a class="mdl-button mdl-button--colored  mdl-button--raised qor-datepicker__save">$[ok]</a>\n                    <a class="mdl-button mdl-button--colored " data-dismiss="modal">$[cancel]</a>\n                </div>\n            </div>\n        </div>'),
    (h.plugin = function(o) {
      return this.each(function() {
        var t,
          e,
          i = a(this),
          n = i.data(r);
        if (!n) {
          if (!a.fn.qorDatepicker) return;
          if (/destroy/.test(o)) return;
          (t = a.extend(
            !0,
            {},
            i.data(),
            'object' === (void 0 === o ? 'undefined' : _typeof(o)) && o,
          )),
            i.data(r, (n = new h(this, t)));
        }
        'string' == typeof o && a.isFunction((e = n[o])) && e.apply(n);
      });
    }),
    a(function() {
      var e = '[data-toggle="qor.datepicker"]';
      a(document)
        .on('disable.qor.datepicker', function(t) {
          h.plugin.call(a(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          h.plugin.call(a(e, t.target));
        })
        .triggerHandler(t);
    }),
    h
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(c) {
  c.fn.extend({
    dirtyForm: function a(t, l) {
      var d = !1;
      return (
        this instanceof jQuery
          ? ((l = t), (t = this))
          : t instanceof jQuery || (t = c(t)),
        t.each(function(t, e) {
          var i = c(e);
          if (i.is('form')) {
            if (i.hasClass('ignore-dirtyform')) return !1;
            if (
              (d = a(
                i.find(
                  'input:not([type="hidden"]):not(".search-field input"):not(".chosen-search input"):not(".ignore-dirtyform"), textarea, select',
                ),
                l,
              ))
            )
              return !1;
          } else if (i.is(':checkbox') || i.is(':radio')) {
            if (i.hasClass('ignore-dirtyform')) return !1;
            if (e.checked != e.defaultChecked) return !(d = !0);
          } else if (i.is('input') || i.is('textarea')) {
            if (i.hasClass('ignore-dirtyform')) return !1;
            if (e.value != e.defaultValue) return !(d = !0);
          } else if (i.is('select')) {
            if (i.hasClass('ignore-dirtyform')) return !1;
            for (var n, o = 0, r = e.options.length, s = 0; s < r; s++)
              (n = e.options[s]),
                (d = d || n.selected != n.defaultSelected),
                n.defaultSelected && (o = s);
            if ((d && !e.multiple && (d = o != e.selectedIndex), d)) return !1;
          }
        }),
        d
      );
    },
  }),
    c(function() {
      c(document).on('submit', 'form', function() {
        (window.onbeforeunload = null), (c.fn.qorSlideoutBeforeHide = null);
      }),
        c(document).on('change', 'form', function() {
          c(this).dirtyForm()
            ? ((c.fn.qorSlideoutBeforeHide = !0),
              (window.onbeforeunload = function() {
                return 'You have unsaved changes on this page. If you leave this page, you will lose all unsaved changes.';
              }))
            : ((c.fn.qorSlideoutBeforeHide = null),
              (window.onbeforeunload = null));
        });
    });
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(l) {
  var d = window.location,
    e = l(document),
    o = 'qor.filter',
    t = 'enable.' + o,
    i = 'click.' + o,
    r = '.qor-bottomsheets',
    c = '.qor-filter__dropdown',
    u = 'is-selected';
  function s(t, e) {
    (this.$element = l(t)),
      (this.options = l.extend({}, s.DEFAULTS, l.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (s.prototype = {
      constructor: s,
      init: function() {
        this.bind();
        var t = this.$element,
          e = window.moment();
        (this.$timeStart = t.find('.qor-filter__start')),
          (this.$timeEnd = t.find('.qor-filter__end')),
          (this.$searchParam = t.find('[data-search-param]')),
          (this.$searchButton = t.find(this.options.button)),
          (this.startWeekDate = e.startOf('isoweek').toDate()),
          (this.endWeekDate = e.endOf('isoweek').toDate()),
          (this.startMonthDate = e.startOf('month').toDate()),
          (this.endMonthDate = e.endOf('month').toDate()),
          this.initActionTemplate();
      },
      bind: function() {
        var t = this.options;
        this.$element
          .on(i, t.trigger, this.show.bind(this))
          .on(i, t.label, this.setFilterTime.bind(this))
          .on(i, t.clear, this.clear.bind(this))
          .on(i, t.button, this.search.bind(this)),
          e.on(i, this.close);
      },
      unbind: function() {
        this.$element.off(i);
      },
      initActionTemplate: function() {
        var t = this.getUrlParameter('schedule_start_at'),
          e = this.getUrlParameter('schedule_end_at'),
          i = l(this.options.trigger);
        (t || e) &&
          (this.$timeStart.val(t),
          this.$timeEnd.val(e),
          (e = e ? ' - ' + e : ''),
          i
            .addClass('active clearable')
            .find('.qor-selector-label')
            .html(t + e),
          i.append('<i class="material-icons qor-selector-clear">clear</i>'));
      },
      show: function() {
        this.$element.find(c).toggle();
      },
      close: function(t) {
        var e = l(t.target),
          i = l(c),
          n = i.is(':visible'),
          o = e.closest(c).length,
          r = e.closest('.qor-filter-toggle').length,
          s = e.closest('.qor-modal').length,
          a = e.closest('.ui-timepicker-wrapper').length;
        (n && (o || r || s || a)) || i.hide();
      },
      setFilterTime: function(t) {
        var e,
          i,
          n = l(t.target),
          o = n.data(),
          r = o.filterRange,
          s = void 0,
          a = void 0;
        if (!r) return !1;
        if (
          (l(this.options.label).removeClass(u), n.addClass(u), 'events' == r)
        )
          return (
            this.$timeStart.val(o.scheduleStartAt || ''),
            this.$timeEnd.val(o.scheduleEndAt || ''),
            this.$searchButton.click(),
            !1
          );
        switch (r) {
          case 'today':
            s = a = new Date();
            break;
          case 'week':
            (s = this.startWeekDate), (a = this.endWeekDate);
            break;
          case 'month':
            (s = this.startMonthDate), (a = this.endMonthDate);
        }
        if (!s || !a) return !1;
        (e = this.getTime(s) + ' 00:00'),
          (i = this.getTime(a) + ' 23:59'),
          this.$timeStart.val(e),
          this.$timeEnd.val(i),
          this.$searchButton.click();
      },
      getTime: function(t) {
        var e = t.getMonth() + 1,
          i = t.getDate();
        return (
          (e = e < 8 ? '0' + e : e),
          (i = i < 10 ? '0' + i : i),
          t.getFullYear() + '-' + e + '-' + i
        );
      },
      clear: function() {
        var t = l(this.options.trigger),
          e = t.find('.qor-selector-label');
        return (
          t.removeClass('active clearable'),
          e.html(e.data('label')),
          this.$timeStart.val(''),
          this.$timeEnd.val(''),
          this.$searchButton.click(),
          !1
        );
      },
      getUrlParameter: function(t) {
        var e = d.search,
          i = t.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'),
          n = new RegExp('[\\?&]' + i + '=([^&#]*)').exec(e);
        return null === n ? '' : decodeURIComponent(n[1].replace(/\+/g, ' '));
      },
      updateQueryStringParameter: function(t, e, i) {
        var n = i || d.href,
          o = n.match(/#\S*$/) || '',
          r = String(t).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'),
          s = new RegExp('([?&])' + r + '=.*?(&|$)', 'i'),
          a = -1 !== n.indexOf('?') ? '&' : '?';
        return (
          o && ((o = o[0]), (n = n.replace(o, ''))),
          n.match(s)
            ? (n = e
                ? n.replace(s, '$1' + t + '=' + e + '$2')
                : '?' === RegExp.$1 || RegExp.$1 === RegExp.$2
                ? n.replace(s, '$1')
                : n.replace(s, ''))
            : e && (n = n + a + t + '=' + e),
          n + o
        );
      },
      search: function() {
        var t = this.$searchParam,
          n = d.href,
          o = this;
        t.length &&
          (t.each(function() {
            var t = l(this),
              e = t.data().searchParam,
              i = t.val();
            n = o.updateQueryStringParameter(e, i, n);
          }),
          this.$element.closest(r).length
            ? l(r).trigger('filterChanged.qor.filter', [n, 'qor.filter.time'])
            : (d.href = n));
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (s.DEFAULTS = { label: !1, trigger: !1, button: !1, clear: !1 }),
    (s.plugin = function(n) {
      return this.each(function() {
        var t,
          e = l(this),
          i = e.data(o);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(o, (i = new s(this, n)));
        }
        'string' == typeof n && l.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    l(function() {
      var e = '[data-toggle="qor.filter.time"]',
        i = {
          label: '.qor-filter__block-buttons button',
          trigger: 'a.qor-filter-toggle',
          button: '.qor-filter__button-search',
          clear: '.qor-selector-clear',
        };
      l(document)
        .on('disable.qor.filter', function(t) {
          s.plugin.call(l(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          s.plugin.call(l(e, t.target), i);
        })
        .triggerHandler(t);
    }),
    s
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(c) {
  var u = window.location,
    o = 'qor.filter',
    t = 'enable.' + o,
    e = 'click.' + o,
    i = 'change.' + o,
    h = '.qor-bottomsheets';
  function f(t, i) {
    var n,
      e = decodeURI(u.search);
    return (
      c.isArray(t) &&
        ((n = p(e)),
        c.each(t, function(t, e) {
          -1 === (t = c.inArray(e, n)) ? n.push(e) : i && n.splice(t, 1);
        }),
        (e = '?' + n.join('&'))),
      e
    );
  }
  function p(t) {
    var e = [];
    return (
      t &&
        -1 < t.indexOf('?') &&
        ((t = t.replace(/\+/g, ' ').split('?')[1]) &&
          -1 < t.indexOf('#') &&
          (t = t.split('#')[0]),
        t &&
          (e = c.map(t.split('&'), function(t) {
            var e,
              i = [];
            if (((t = t.split('=')), !/page/.test(t[0])))
              return (
                (e = t[1]),
                i.push(t[0]),
                e && (e = c.trim(decodeURIComponent(e))) && i.push(e),
                i.join('=')
              );
          }))),
      e
    );
  }
  function r(t, e) {
    (this.$element = c(t)),
      (this.options = c.extend({}, r.DEFAULTS, c.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (r.prototype = {
      constructor: r,
      init: function() {
        this.bind();
      },
      bind: function() {
        var t = this.options;
        this.$element
          .on(e, t.label, c.proxy(this.toggle, this))
          .on(i, t.group, c.proxy(this.toggle, this));
      },
      unbind: function() {
        this.$element.off(e, this.toggle).off(i, this.toggle);
      },
      toggle: function(t) {
        var e = c(t.currentTarget),
          i = [],
          n = void 0,
          o = void 0,
          r = void 0,
          s = void 0,
          a = void 0,
          l = void 0,
          d = void 0;
        e.is('select')
          ? ((n = p(decodeURI(u.search))),
            (d = s = e.attr('name')),
            (a = e.val()),
            (o = [s]),
            a && o.push(a),
            (o = o.join('=')),
            a && i.push(o),
            e.children().each(function() {
              var t = c(this),
                e = [s],
                i = c.trim(t.prop('value'));
              if ((i && e.push(i), (e = e.join('=')), -1 < c.inArray(e, n)))
                return (l = e), !1;
            }),
            l ? (i.push(l), (r = f(i, !0))) : (r = f(i)))
          : e.is('a') &&
            (t.preventDefault(),
            (d = e.data().paramName),
            (i = p(e.attr('href'))),
            (r = e.hasClass('is-active') ? f(i, !0) : f(i))),
          this.$element.closest(h).length
            ? c(h).trigger('filterChanged.qor.filter', [r, d])
            : (u.search = r);
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (r.DEFAULTS = { label: !1, group: !1 }),
    (r.plugin = function(n) {
      return this.each(function() {
        var t,
          e = c(this),
          i = e.data(o);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(o, (i = new r(this, n)));
        }
        'string' == typeof n && c.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    c(function() {
      var e = '[data-toggle="qor.filter"]',
        i = { label: 'a', group: 'select' };
      c(document)
        .on('disable.qor.filter', function(t) {
          r.plugin.call(c(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          r.plugin.call(c(e, t.target), i);
        })
        .triggerHandler(t);
    }),
    r
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(s) {
  var t = s(window),
    o = 'qor.fixer',
    n = 'enable.' + o,
    e = 'resize.' + o,
    i = 'scroll.' + o,
    a = 'qor-table-fixed-header';
  function r(t, e) {
    (this.$element = s(t)),
      (this.options = s.extend({}, r.DEFAULTS, s.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (r.prototype = {
      constructor: r,
      init: function() {
        var t = this.options,
          e = this.$element;
        this.isNeedBuild() ||
          ((this.$thead = e.find('> thead')),
          (this.$tbody = e.find('> tbody')),
          (this.$header = s(t.header)),
          (this.$subHeader = s(t.subHeader)),
          (this.$content = s(t.content)),
          (this.marginBottomPX = parseInt(this.$subHeader.css('marginBottom'))),
          (this.paddingHeight = t.paddingHeight),
          this.resize(),
          this.bind());
      },
      bind: function() {
        this.$content.on(i, this.toggle.bind(this)),
          t.on(e, this.resize.bind(this));
      },
      unbind: function() {
        this.$content.off(i, this.toggle).off(e, this.resize);
      },
      isNeedBuild: function() {
        var t = this.$element;
        return !!(
          1 < s('.qor-page__body .qor-js-table').length ||
          0 < s('.qor-global-search--container').length ||
          t.hasClass('qor-table--medialibrary') ||
          t.is(':hidden') ||
          t.find('tbody > tr:visible').length <= 1
        );
      },
      build: function() {
        var e = [];
        this.$tbody
          .find('> tr:first')
          .children()
          .each(function() {
            var t = s(this).outerWidth();
            s(this).outerWidth(t), e.push(t);
          }),
          this.$thead
            .find('>tr')
            .children()
            .each(function(t) {
              s(this).outerWidth(e[t]);
            });
      },
      toggle: function() {
        if (this.$content.length) {
          var t = this.$element,
            e = this.$thead,
            i = this.$content.scrollTop(),
            n =
              this.$subHeader.outerHeight() +
              this.paddingHeight +
              this.marginBottomPX,
            o = s('.qor-page__header').outerHeight(),
            r = this.$content.offset().top + s('.qor-page__header').height();
          n - o < i ? (e.css({ top: r }), t.addClass(a)) : t.removeClass(a);
        }
      },
      resize: function() {
        this.build(), this.toggle();
      },
      destroy: function() {
        this.buildCheck() || (this.unbind(), this.$element.removeData(o));
      },
    }),
    (r.DEFAULTS = { header: !1, content: !1 }),
    (r.plugin = function(n) {
      return this.each(function() {
        var t,
          e = s(this),
          i = e.data(o);
        i || e.data(o, (i = new r(this, n))),
          'string' == typeof n && s.isFunction((t = i[n])) && t.call(i);
      });
    }),
    s(function() {
      var e = '.qor-js-table',
        i = {
          header: '.mdl-layout__header',
          subHeader: '.qor-page__header',
          content: '.mdl-layout__content',
          paddingHeight: 2,
        };
      s(document)
        .on('disable.qor.fixer', function(t) {
          r.plugin.call(s(e, t.target), 'destroy');
        })
        .on(n, function(t) {
          r.plugin.call(s(e, t.target), i);
        })
        .triggerHandler(n);
    }),
    r
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(a) {
  var o = 'qor.inlineEdit',
    t = 'enable.' + o,
    e = 'click.' + o,
    i = 'mouseenter.' + o,
    n = 'mouseleave.' + o,
    l = '.qor-field',
    d = '.qor-field__show',
    r = '.qor-inlineedit__edit',
    c = '.qor-inlineedit__buttons',
    u = 'qor-inlineedit__field';
  function s(t, e) {
    (this.$element = a(t)),
      (this.options = a.extend({}, s.DEFAULTS, a.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (s.prototype = {
      constructor: s,
      init: function() {
        var t = this.$element,
          e = t.data('button-save'),
          i = t.data('button-cancel');
        (this.TEMPLATE_SAVE =
          '<div class="qor-inlineedit__buttons">\n                                        <button class="mdl-button mdl-button--colored mdl-js-button qor-button--small qor-inlineedit__cancel" type="button">' +
          i +
          '</button>\n                                        <button class="mdl-button mdl-button--colored mdl-js-button qor-button--small qor-inlineedit__save" type="button">' +
          e +
          '</button>\n                                      </div>'),
          this.bind();
      },
      bind: function() {
        this.$element
          .on(i, d, this.showEditButton)
          .on(n, d, this.hideEditButton)
          .on(e, '.qor-inlineedit__cancel', this.hideEdit)
          .on(e, '.qor-inlineedit__save', this.saveEdit)
          .on(e, r, this.showEdit.bind(this));
      },
      unbind: function() {
        this.$element
          .off(i)
          .off(n)
          .off(e);
      },
      showEditButton: function(t) {
        var e = a(s.TEMPLATE_EDIT);
        if (
          a(t.target)
            .closest(l)
            .find('input:disabled, textarea:disabled,select:disabled').length
        )
          return !1;
        e.appendTo(a(this));
      },
      hideEditButton: function() {
        a('.qor-inlineedit__edit').remove();
      },
      showEdit: function(t) {
        var e = a(t.target)
          .closest(r)
          .hide()
          .closest(l)
          .addClass(u);
        a(this.TEMPLATE_SAVE).appendTo(e);
      },
      hideEdit: function() {
        a(this)
          .closest(l)
          .removeClass(u)
          .find(c)
          .remove();
      },
      saveEdit: function() {
        var o = a(this),
          r = o.closest(l),
          t = o.closest('form'),
          e = r
            .closest('.qor-fieldset')
            .find('input.qor-hidden__primary_key[type="hidden"]'),
          i = r.find(
            'input[name*="QorResource"],textarea[name*="QorResource"],select[name*="QorResource"]',
          ),
          s = i.length && i.prop('name').match(/\.\w+/g),
          n = i.serialize();
        e.length && (n = n + '&' + e.serialize()),
          s.length &&
            a.ajax(t.prop('action'), {
              method: t.prop('method'),
              data: n,
              dataType: 'json',
              beforeSend: function() {
                o.prop('disabled', !0);
              },
              success: function(t) {
                var e = (function(t, e) {
                    var i = void 0,
                      n = e[t[0].slice(1)];
                    if (1 < t.length)
                      for (var o = 1; o < t.length; o++)
                        (i = t[o].slice(1)),
                          (n = a.isArray(n) ? n[0][i] : n[i]);
                    return n;
                  })(s, t),
                  i = r.removeClass(u).find(d),
                  n = i.find('.qor-field__show-inner');
                n.length ? n.html(e) : i.html(e),
                  r.find(c).remove(),
                  o.prop('disabled', !1);
              },
              error: function(t) {
                window.QOR.handleAjaxError(t), o.prop('disabled', !1);
              },
            });
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (s.DEFAULTS = {}),
    (s.TEMPLATE_EDIT =
      '<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored qor-inlineedit__edit" type="button"><i class="material-icons">mode_edit</i></button>'),
    (s.plugin = function(n) {
      return this.each(function() {
        var t,
          e = a(this),
          i = e.data(o);
        i || e.data(o, (i = new s(this, n))),
          'string' == typeof n && a.isFunction((t = i[n])) && t.call(i);
      });
    }),
    a(function() {
      var e = '[data-toggle="qor.inlineEdit"]',
        i = {};
      a(document)
        .on('disable.qor.inlineEdit', function(t) {
          s.plugin.call(a(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          s.plugin.call(a(e, t.target), i);
        })
        .triggerHandler(t);
    }),
    s
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(e) {
  var i = window.componentHandler,
    n = '[class*="mdl-js"],[class*="mdl-tooltip"]';
  function o(t) {
    i &&
      (e(t).is(n)
        ? i.upgradeElements(t)
        : i.upgradeElements(e(n, t).toArray()));
  }
  function r(t) {
    i &&
      (e(t).is(n)
        ? i.downgradeElements(t)
        : i.downgradeElements(e(n, t).toArray()));
  }
  e(function() {
    e(document)
      .on('enable.qor.material', function(t) {
        o(t.target);
      })
      .on('disable.qor.material', function(t) {
        r(t.target);
      })
      .on('update.qor.material', function(t) {
        r(t.target), o(t.target);
      });
  });
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(o) {
  var n = o(document),
    r = 'qor.modal',
    t = 'click.' + r,
    e = 'keyup.' + r,
    s = 'transitionend',
    a = 'qor-modal-open',
    l = 'in',
    i = 'aria-hidden';
  function d(t, e) {
    (this.$element = o(t)),
      (this.options = o.extend({}, d.DEFAULTS, o.isPlainObject(e) && e)),
      (this.transitioning = !1),
      (this.fadable = !1),
      this.init();
  }
  return (
    (d.prototype = {
      constructor: d,
      init: function() {
        (this.fadable = this.$element.hasClass('fade')),
          this.options.show ? this.show() : this.toggle();
      },
      bind: function() {
        this.$element.on(t, o.proxy(this.click, this)),
          this.options.keyboard && n.on(e, o.proxy(this.keyup, this));
      },
      unbind: function() {
        this.$element.off(t, this.click),
          this.options.keyboard && n.off(e, this.keyup);
      },
      click: function(t) {
        var e = this.$element[0],
          i = t.target;
        if (i === e && this.options.backdrop) this.hide();
        else
          for (; i !== e; ) {
            if ('modal' === o(i).data('dismiss')) {
              this.hide();
              break;
            }
            i = i.parentNode;
          }
      },
      keyup: function(t) {
        27 === t.which && this.hide();
      },
      show: function(t) {
        var e,
          i = this.$element;
        if (
          !this.transitioning &&
          !i.hasClass(l) &&
          ((e = o.Event('show.qor.modal')),
          i.trigger(e),
          !e.isDefaultPrevented())
        ) {
          if (
            (n.find('body').addClass(a),
            i
              .addClass('shown')
              .scrollTop(0)
              .get(0).offsetHeight,
            (this.transitioning = !0),
            t || !this.fadable)
          )
            return i.addClass(l), void this.shown();
          i.one(s, o.proxy(this.shown, this)), i.addClass(l);
        }
      },
      shown: function() {
        (this.transitioning = !1),
          this.bind(),
          this.$element
            .attr(i, !1)
            .trigger('shown.qor.modal')
            .focus();
      },
      hide: function(t) {
        var e,
          i = this.$element;
        if (
          !this.transitioning &&
          i.hasClass(l) &&
          ((e = o.Event('hide.qor.modal')),
          i.trigger(e),
          !e.isDefaultPrevented())
        ) {
          if (
            (n.find('body').removeClass(a),
            (this.transitioning = !0),
            t || !this.fadable)
          )
            return i.removeClass(l), void this.hidden();
          i.one(s, o.proxy(this.hidden, this)), i.removeClass(l);
        }
      },
      hidden: function() {
        (this.transitioning = !1),
          this.unbind(),
          this.$element
            .removeClass('shown')
            .attr(i, !0)
            .trigger('hidden.qor.modal');
      },
      toggle: function() {
        this.$element.hasClass(l) ? this.hide() : this.show();
      },
      destroy: function() {
        this.$element.removeData(r);
      },
    }),
    (d.DEFAULTS = { backdrop: !1, keyboard: !0, show: !0 }),
    (d.plugin = function(n) {
      return this.each(function() {
        var t,
          e = o(this),
          i = e.data(r);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(r, (i = new d(this, n)));
        }
        'string' == typeof n && o.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    (o.fn.qorModal = d.plugin),
    o(function() {
      var e = '.qor-modal';
      o(document)
        .on(t, '[data-toggle="qor.modal"]', function() {
          var t = o(this),
            e = t.data(),
            i = o(e.target || t.attr('href'));
          d.plugin.call(i, i.data(r) ? 'toggle' : e);
        })
        .on('disable.qor.modal', function(t) {
          d.plugin.call(o(e, t.target), 'destroy');
        })
        .on('enable.qor.modal', function(t) {
          d.plugin.call(o(e, t.target));
        });
    }),
    d
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(s) {
  var o = 'qor.tabbar.radio',
    t = 'enable.' + o,
    e = 'click.' + o,
    a = '[data-tab-target]',
    l = 'is-active';
  function r(t, e) {
    (this.$element = s(t)),
      (this.options = s.extend({}, r.DEFAULTS, s.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (r.prototype = {
      constructor: r,
      init: function() {
        this.bind();
      },
      bind: function() {
        this.$element.on(e, a, this.switchTab.bind(this));
      },
      unbind: function() {
        this.$element.off(e, a, this.switchTab);
      },
      switchTab: function(t) {
        var e = s(t.target),
          i = this.$element,
          n = i.find(a),
          o = i.find('[data-tab-source]'),
          r = e.data().tabTarget;
        e.hasClass(l) ||
          (n.removeClass(l),
          e.addClass(l),
          o
            .hide()
            .filter('[data-tab-source="' + r + '"]')
            .show(),
          i.trigger('switched.qor.tabbar.radio', [i, r]));
      },
      destroy: function() {
        this.unbind();
      },
    }),
    (r.DEFAULTS = {}),
    (r.plugin = function(n) {
      return this.each(function() {
        var t,
          e = s(this),
          i = e.data(o);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(o, (i = new r(this, n)));
        }
        'string' == typeof n && s.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    s(function() {
      var e = '[data-toggle="qor.tab.radio"]';
      s(document)
        .on('disable.qor.tabbar.radio', function(t) {
          r.plugin.call(s(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          r.plugin.call(s(e, t.target));
        })
        .triggerHandler(t);
    }),
    r
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(c) {
  var r = 'qor.redactor',
    t = 'enable.' + r,
    n = 'click.' + r,
    e = 'addCrop.' + r,
    i = 'removeCrop.' + r,
    s = 'scroll.' + r,
    o = '.qor-cropper__toggle--redactor';
  function u(t, e) {
    (this.$element = c(t)),
      (this.options = c.extend(!0, {}, u.DEFAULTS, c.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (u.prototype = {
      constructor: u,
      init: function() {
        var i,
          t,
          e = this.options,
          n = this.$element,
          o = n.closest(e.parent);
        o.length || (o = n.parent()),
          (this.$parent = o),
          (this.$button = c(u.BUTTON)),
          (this.$modal = c(
            ((i = u.MODAL),
            (t = e.text),
            'string' == typeof i &&
              'object' === (void 0 === t ? 'undefined' : _typeof(t)) &&
              c.each(t, function(t, e) {
                i = i.replace('$[' + String(t).toLowerCase() + ']', e);
              }),
            i),
          ).appendTo('body')),
          this.bind();
      },
      bind: function() {
        this.$element
          .on(e, c.proxy(this.addButton, this))
          .on(i, c.proxy(this.removeButton, this));
      },
      unbind: function() {
        this.$element
          .off(e)
          .off(i)
          .off(s);
      },
      addButton: function(t, e) {
        var i = c(e);
        this.$button
          .css('left', c(e).width() / 2)
          .prependTo(i.parent())
          .find(o)
          .one(n, c.proxy(this.crop, this, i));
      },
      removeButton: function() {
        this.$button.find(o).off(n), this.$button.detach();
      },
      crop: function(o) {
        var r = this.options,
          i = o.attr('src'),
          t = i,
          s = void 0,
          a = this.$modal;
        c.isFunction(r.replace) && (t = r.replace(t)),
          (s = c("<img src='" + t + "'>")),
          a
            .one('shown.qor.modal', function() {
              var t, e;
              s.cropper({
                data: ((t = o.attr('data-crop-options')),
                (e = t && t.split(',')),
                (t = null),
                e &&
                  4 === e.length &&
                  (t = {
                    x: Number(e[0]),
                    y: Number(e[1]),
                    width: Number(e[2]),
                    height: Number(e[3]),
                  }),
                t),
                background: !1,
                movable: !1,
                zoomable: !1,
                scalable: !1,
                rotatable: !1,
                checkImageOrigin: !1,
                ready: function() {
                  a.find('.qor-cropper__save').one(n, function() {
                    var n = s.cropper('getData', !0);
                    c.ajax(r.remote, {
                      type: 'POST',
                      contentType: 'application/json',
                      data: JSON.stringify({
                        Url: i,
                        CropOptions: {
                          original: (function(t) {
                            var e,
                              i,
                              n = {};
                            if (c.isPlainObject(t))
                              for (e in t)
                                t.hasOwnProperty(e) &&
                                  (n[
                                    ((i = e),
                                    'string' == typeof i &&
                                      (i =
                                        i.charAt(0).toUpperCase() +
                                        i.substr(1)),
                                    i)
                                  ] = t[e]);
                            return n;
                          })(n),
                        },
                        Crop: !0,
                      }),
                      dataType: 'json',
                      success: function(t) {
                        var e, i;
                        c.isPlainObject(t) &&
                          t.url &&
                          (o
                            .attr('src', t.url)
                            .attr(
                              'data-crop-options',
                              ((e = n),
                              (i = []),
                              c.isPlainObject(e) &&
                                c.each(e, function() {
                                  i.push(arguments[1]);
                                }),
                              i.join()),
                            )
                            .removeAttr('style')
                            .removeAttr('rel'),
                          c.isFunction(r.complete) && r.complete(),
                          a.qorModal('hide'));
                      },
                    });
                  });
                },
              });
            })
            .one('hidden.qor.modal', function() {
              s.cropper('destroy').remove();
            })
            .qorModal('show')
            .find('.qor-cropper__wrapper')
            .append(s);
      },
      destroy: function() {
        this.unbind(),
          this.$modal.qorModal('hide').remove(),
          this.$element.removeData(r);
      },
    }),
    (u.DEFAULTS = {
      remote: !1,
      parent: !1,
      toggle: !1,
      replace: null,
      complete: null,
      text: { title: 'Crop the image', ok: 'OK', cancel: 'Cancel' },
    }),
    (u.BUTTON =
      '<div class="qor-redactor__image--buttons">\n            <span class="qor-redactor__image--edit" contenteditable="false">Edit</span>\n            <span class="qor-cropper__toggle--redactor" contenteditable="false">Crop</span>\n        </div>'),
    (u.MODAL =
      '<div class="qor-modal fade" tabindex="-1" role="dialog" aria-hidden="true">\n            <div class="mdl-card mdl-shadow--2dp" role="document">\n              <div class="mdl-card__title">\n                <h2 class="mdl-card__title-text">$[title]</h2>\n              </div>\n              <div class="mdl-card__supporting-text">\n                <div class="qor-cropper__wrapper"></div>\n              </div>\n              <div class="mdl-card__actions mdl-card--border">\n                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect qor-cropper__save">$[ok]</a>\n                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-dismiss="modal">$[cancel]</a>\n              </div>\n              <div class="mdl-card__menu">\n                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-dismiss="modal" aria-label="close">\n                  <i class="material-icons">close</i>\n                  </button>\n              </div>\n            </div>\n        </div>'),
    (u.plugin = function(o) {
      return this.each(function() {
        var i = c(this),
          n = i.data(r),
          t = void 0,
          e = void 0;
        if (n) /destroy/.test(o) && window.$R(this, 'destroy');
        else {
          if (!window.$R) return;
          if (/destroy/.test(o)) return;
          i.data(r, (n = {}));
          (t = {
            imageUpload: i.data('uploadUrl'),
            fileUpload: i.data('uploadUrl'),
            buttons: [
              'html',
              'format',
              'bold',
              'italic',
              'deleted',
              'lists',
              'image',
              'file',
              'link',
            ],
            linkNewTab: !0,
            linkTitle: !1,
            autoparsePaste: !1,
            autoparseLinks: !1,
            multipleUpload: !1,
            toolbarFixedTarget:
              i.closest('.qor-slideout').length ||
              i.closest('.qor-bottomsheets').length
                ? document
                : c('main.mdl-layout__content').length
                ? 'main.mdl-layout__content'
                : document,
            callbacks: {
              started: function() {
                var a = c(this.container.$container.nodes[0]),
                  l = c(this.toolbar.$toolbar.nodes[0]),
                  t = c('.qor-slideout').is(':visible'),
                  e = void 0,
                  d = 64;
                t
                  ? 0 != i.closest('.qor-bottomsheets').length
                    ? ((e = i.closest('.qor-page__body')),
                      (d = i.closest('.qor-page__body').offset().top))
                    : ((e = '.qor-slideout__body'),
                      (d = c('.qor-slideout__header').height()))
                  : (d += c((e = '.qor-layout main.qor-page'))
                      .find('.qor-page__header')
                      .height()),
                  c(e).on(s, function() {
                    var t, e, i, n, o, r, s;
                    (t = l),
                      (i = d),
                      (n = (e = a).offset().top),
                      (o = e.outerHeight()),
                      (r = {
                        position: 'relative',
                        top: 'auto',
                        width: 'auto',
                      }),
                      (s = {
                        position: 'fixed',
                        top: i,
                        width: e.width(),
                        boxShadow: 'none',
                      }),
                      n < i && Math.abs(n) < Math.abs(o - i)
                        ? (t.css(s), e.css('padding-top', t.outerHeight()))
                        : (t.css(r), e.css('padding-top', 0));
                  }),
                  i.data('cropUrl') &&
                    i.data(
                      r,
                      (n = new u(i, {
                        remote: i.data('cropUrl'),
                        text: i.data('text'),
                        parent: '.qor-field',
                        toggle: '.qor-cropper__toggle--redactor',
                        replace: function(t) {
                          return t.replace(/\.\w+$/, function(t) {
                            return '.original' + t;
                          });
                        },
                        complete: c.proxy(function() {
                          this.code.sync();
                        }, this),
                      })),
                    );
              },
              imageUpload: function(t, e) {
                var i = c(t);
                e.filelink && i.prop('src', e.filelink);
              },
              insertedLink: function(t) {
                var e = c(t),
                  i = this.link.description;
                e.prop('title', i || e.text()),
                  (this.link.description = ''),
                  (this.link.linkUrlText = ''),
                  (this.link.insertedTriggered = !0);
              },
              fileUpload: function(t, e) {
                c(t)
                  .prop('href', e.filelink)
                  .html(e.filename);
              },
            },
          }),
            c.extend(t, i.data('redactorSettings')),
            (window.$R.prototype.constructor.services.editor.prototype.focus = function() {
              return !1;
            }),
            window.$R(this, t);
        }
        'string' == typeof o && c.isFunction((e = n[o])) && e.apply(n);
      });
    }),
    c(function() {
      var e = 'textarea[data-toggle="qor.redactor"]';
      c(document)
        .on('disable.qor.redactor', function(t) {
          u.plugin.call(c(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          u.plugin.call(c(e, t.target));
        })
        .triggerHandler(t);
    }),
    u
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(h) {
  var r = window._,
    o = 'qor.replicator',
    t = 'enable.' + o,
    e = 'submit.' + o,
    s = 'click.' + o,
    i = 'slideoutBeforeSend.qor.slideout.replicator',
    n =
      'selectcoreBeforeSend.qor.selectcore.replicator bottomsheetBeforeSend.qor.bottomsheets.replicator',
    a = '.qor-fieldset-container';
  function l(t, e) {
    (this.$element = h(t)),
      (this.options = h.extend({}, l.DEFAULTS, h.isPlainObject(e) && e)),
      (this.index = 0),
      this.init();
  }
  return (
    (l.prototype = {
      constructor: l,
      init: function() {
        var i = this,
          t = this.$element,
          e = t.find('> .qor-field__block > .qor-fieldset--new'),
          n = void 0;
        (this.singlePage = !(
          t.closest('.qor-slideout').length &&
          t.closest('.qor-bottomsheets').length
        )),
          (this.maxitems = t.data('maxItem')),
          (this.isSortable = t.hasClass('qor-fieldset-sortable')),
          e.length &&
            !t.closest('.qor-fieldset--new').length &&
            (e.trigger('disable'),
            (this.isMultipleTemplate = t.data('isMultiple')),
            this.isMultipleTemplate
              ? ((this.fieldsetName = []),
                (this.template = {}),
                (this.index = []),
                e.each(function(t, e) {
                  (n = h(e).data('fieldsetName')) &&
                    ((i.template[n] = h(e).prop('outerHTML')),
                    i.fieldsetName.push(n));
                }),
                this.parseMultiple())
              : ((this.template = e.prop('outerHTML')), this.parse()),
            e.hide(),
            this.bind(),
            this.resetButton(),
            this.resetPositionButton());
      },
      resetPositionButton: function() {
        var t = this.$element.find('> .qor-sortable__button');
        this.isSortable && (1 < this.getCurrentItems() ? t.show() : t.hide());
      },
      getCurrentItems: function() {
        return this.$element
          .find('> .qor-field__block > .qor-fieldset')
          .not('.qor-fieldset--new,.is-deleted').length;
      },
      toggleButton: function(t) {
        var e = this.$element.find('> .qor-field__block > .qor-fieldset__add');
        t ? e.hide() : e.show();
      },
      resetButton: function() {
        this.maxitems <= this.getCurrentItems()
          ? this.toggleButton(!0)
          : this.toggleButton();
      },
      parse: function() {
        var t;
        this.template &&
          ((t = this.initTemplate(this.template)),
          (this.template = t.template),
          (this.index = t.index));
      },
      parseMultiple: function() {
        for (
          var t = void 0,
            e = void 0,
            i = this.fieldsetName,
            n = 0,
            o = i.length;
          n < o;
          n++
        )
          (e = i[n]),
            (t = this.initTemplate(this.template[e])),
            (this.template[e] = t.template),
            this.index.push(t.index);
        this.multipleIndex = r.max(this.index);
      },
      initTemplate: function(t) {
        var c = void 0,
          u = this.$element.parents(a).length;
        return {
          template: (t = t.replace(/(\w+)\="(\S*\[\d+\]\S*)"/g, function(
            t,
            l,
            d,
          ) {
            return (
              (d = d.replace(/^(\S*)\[(\d+)\]([^\[\]]*)$/, function(t, e, i) {
                if (t === d) {
                  if (('name' !== l || c || (c = i), u)) {
                    for (
                      var n = '',
                        o = t.split(/\[\d+\]/),
                        r = t.match(/\[\d+\]/g),
                        s = 0;
                      s < o.length;
                      s++
                    ) {
                      var a = '';
                      s === u
                        ? (a = '[{{index}}]')
                        : s < r.length && (a = r[s]),
                        (n += o[s] + a);
                    }
                    return n;
                  }
                  return t.replace(/\[\d+\]/, '[{{index}}]');
                }
              })),
              l + '="' + d + '"'
            );
          })),
          index: parseFloat(c) + 5,
        };
      },
      bind: function() {
        var t = this.options;
        this.$element
          .on(s, t.addClass, h.proxy(this.add, this))
          .on(s, t.delClass, h.proxy(this.del, this)),
          this.singlePage &&
            h(document).on(
              e,
              '.mdl-layout__container form',
              this.clearFieldData,
            ),
          h(document)
            .on(i, '.qor-slideout', this.clearFieldDataInSlideout)
            .on(n, this.clearFieldDataInBottomsheet);
      },
      unbind: function() {
        this.$element.off(s),
          this.singlePage &&
            h(document).off(
              e,
              '.mdl-layout__container form',
              this.clearFieldData,
            ),
          h(document)
            .off(i, '.qor-slideout', this.clearFieldDataInSlideout)
            .off(n, this.clearFieldDataInBottomsheet);
      },
      clearFieldData: function() {
        h('.qor-fieldset--new').remove();
      },
      clearFieldDataInSlideout: function() {
        h('.qor-slideout .qor-fieldset--new').remove();
      },
      clearFieldDataInBottomsheet: function() {
        h('.qor-bottomsheets .qor-fieldset--new').remove();
      },
      add: function(t, e, i) {
        var n = this.options,
          o = void 0,
          r = void 0,
          s = h(t.target).closest(n.addClass);
        if (this.maxitems <= this.getCurrentItems()) return !1;
        if (this.isMultipleTemplate) {
          var a = s.data('template'),
            l = s.closest(this.$element).children(n.childrenClass),
            d = s.closest(n.childrenClass).children('fieldset');
          for (var c in ((r = this.template[a]),
          (o = h(r.replace(/\{\{index\}\}/g, this.multipleIndex))),
          s.data()))
            if (c.match(/^sync/)) {
              var u = c.replace(/^sync/, '');
              o.find("input[name*='." + u + "']").val(s.data(c));
            }
          d.length ? d.last().after(o.show()) : l.prepend(o.show()),
            o
              .data('itemIndex', this.multipleIndex)
              .removeClass('qor-fieldset--new'),
            this.multipleIndex++;
        } else
          i
            ? e &&
              e.length &&
              (this.addMultiple(e),
              h(document).trigger('addedMultipleDone.qor.replicator'))
            : ((o = this.addSingle()), s.before(o.show()), this.index++);
        i ||
          (o.trigger('enable'),
          h(document).trigger('added.qor.replicator', [o]),
          t.stopPropagation()),
          this.resetPositionButton(),
          this.resetButton();
      },
      addMultiple: function(t) {
        for (var e = void 0, i = 0, n = t.length; i < n; i++)
          (e = this.addSingle()),
            this.index++,
            h(document).trigger('addedMultiple.qor.replicator', [e, t[i]]);
      },
      addSingle: function() {
        var t = void 0,
          e = this.$element;
        if (
          ((t = h(this.template.replace(/\{\{index\}\}/g, this.index))),
          this.isSortable)
        ) {
          var i = e
            .find('> .qor-field__block > .qor-sortable__item')
            .not('.qor-fieldset--new').length;
          t.attr('order-index', i)
            .attr('order-item', 'item_' + i)
            .css('order', i);
        }
        return (
          t.data('itemIndex', this.index).removeClass('qor-fieldset--new'), t
        );
      },
      del: function(t) {
        var e = this.options,
          i = h(t.target).closest(e.itemClass),
          n = void 0;
        i
          .addClass('is-deleted')
          .children(':visible')
          .addClass('hidden')
          .hide(),
          (n = h(e.alertTemplate.replace('{{name}}', this.parseName(i))))
            .find(e.undoClass)
            .one(
              s,
              function() {
                if (this.maxitems <= this.getCurrentItems())
                  return (
                    window.QOR.qorConfirm(this.$element.data('maxItemHint')), !1
                  );
                i.find('> .qor-fieldset__alert').remove(),
                  i
                    .removeClass('is-deleted')
                    .children('.hidden')
                    .removeClass('hidden')
                    .show(),
                  this.resetButton(),
                  this.resetPositionButton();
              }.bind(this),
            ),
          this.resetButton(),
          this.resetPositionButton(),
          i.append(n);
      },
      parseName: function(t) {
        var e =
          t.find('input[name]').attr('name') ||
          t.find('textarea[name]').attr('name');
        if (e) return e.replace(/[^\[\]]+$/, '');
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (l.DEFAULTS = {
      itemClass: '.qor-fieldset',
      newClass: '.qor-fieldset--new',
      addClass: '.qor-fieldset__add',
      delClass: '.qor-fieldset__delete',
      childrenClass: '.qor-field__block',
      undoClass: '.qor-fieldset__undo',
      alertTemplate:
        '<div class="qor-fieldset__alert"><input type="hidden" name="{{name}}._destroy" value="1"><button class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect qor-fieldset__undo" type="button">Undo delete</button></div>',
    }),
    (l.plugin = function(n) {
      return this.each(function() {
        var t = h(this),
          e = t.data(o),
          i = void 0;
        e || t.data(o, (e = new l(this, n))),
          'string' == typeof n && h.isFunction((i = e[n])) && i.call(e);
      });
    }),
    h(function() {
      var e = a,
        i = {};
      h(document)
        .on('disable.qor.replicator', function(t) {
          l.plugin.call(h(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          l.plugin.call(h(e, t.target), i);
        })
        .triggerHandler(t);
    }),
    l
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(d) {
  var c = window.location,
    r = window.componentHandler,
    u = window.history,
    o = 'qor.globalSearch',
    t = 'enable.' + o,
    e = 'click.' + o,
    h = '.qor-global-search--resource',
    s = '.qor-global-search--results',
    a = 'is-active';
  function l(t, e) {
    (this.$element = d(t)),
      (this.options = d.extend({}, l.DEFAULTS, d.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (l.prototype = {
      constructor: l,
      init: function() {
        this.bind(), this.initTab();
      },
      bind: function() {
        this.$element.on(e, d.proxy(this.click, this));
      },
      unbind: function() {
        this.$element.off(e, this.check);
      },
      initTab: function() {
        var t,
          e = c.search;
        /resource_name/.test(e) &&
          ((t = e
            .match(/resource_name=\w+/g)
            .toString()
            .split('=')[1]),
          d(h).removeClass(a),
          d('[data-resource="' + t + '"]').addClass(a));
      },
      click: function(t) {
        var e = d(t.target),
          i = e.data();
        if (e.is(h)) {
          var n,
            o = c.href.replace(/#/g, ''),
            r = i.resource,
            s = /resource_name/.test(o),
            a = 'resource_name=' + r,
            l = /keyword/.test(o) ? '&' : '?keyword=&';
          (n = r
            ? s
              ? o.replace(/resource_name=\w+/g, a)
              : o + l + a
            : o.replace(/&resource_name=\w+/g, '')),
            u.pushState ? this.fetchSearch(n, e) : (c.href = n);
        }
      },
      fetchSearch: function(i, n) {
        var o = document.title;
        d.ajax(i, {
          method: 'GET',
          dataType: 'html',
          beforeSend: function() {
            d('.mdl-spinner').remove(),
              d(s)
                .prepend(
                  '<div class="mdl-spinner mdl-js-spinner is-active"></div>',
                )
                .find('.qor-section')
                .hide(),
              r.upgradeElement(document.querySelector('.mdl-spinner'));
          },
          success: function(t) {
            var e = d(t)
              .find(s)
              .html();
            d(h).removeClass(a),
              n.addClass(a),
              u.pushState({ Page: i, Title: o }, o, i),
              d('.mdl-spinner').remove(),
              d(s)
                .removeClass('loading')
                .html(e),
              r.upgradeElements(document.querySelectorAll('.qor-table'));
          },
          error: function(t, e, i) {
            d(s)
              .find('.qor-section')
              .show(),
              d('.mdl-spinner').remove(),
              window.alert([e, i].join(': '));
          },
        });
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (l.DEFAULTS = {}),
    (l.plugin = function(n) {
      return this.each(function() {
        var t,
          e = d(this),
          i = e.data(o);
        i || e.data(o, (i = new l(this, n))),
          'string' == typeof n && d.isFunction((t = i[n])) && t.call(i);
      });
    }),
    d(function() {
      var e = '[data-toggle="qor.global.search"]',
        i = {};
      d(document)
        .on('disable.qor.globalSearch', function(t) {
          l.plugin.call(d(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          l.plugin.call(d(e, t.target), i);
        })
        .triggerHandler(t);
    }),
    l
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(l) {
  var d = window.FormData,
    c = window.QOR,
    o = 'qor.selectcore',
    a = 'afterSelected.' + o,
    t = 'click.' + o,
    e = 'submit.' + o,
    i = 'table.qor-js-table tr';
  function r(t, e) {
    (this.$element = l(t)),
      (this.options = l.extend({}, r.DEFAULTS, l.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (r.prototype = {
      constructor: r,
      init: function() {
        this.bind();
      },
      bind: function() {
        this.$element
          .on(t, i, this.processingData.bind(this))
          .on(e, 'form', this.submit.bind(this));
      },
      unbind: function() {
        this.$element.off(t, i).off(e, 'form');
      },
      processingData: function(e) {
        var t,
          i = l(e.target).closest('tr'),
          n = {},
          o = this.options,
          r = o.onSelect,
          s = o.loading;
        return (
          ((n = l.extend({}, n, i.data())).$clickElement = i),
          (t = n.mediaLibraryUrl || n.url),
          s && l.isFunction(s) && s(i.closest('.qor-bottomsheets')),
          t
            ? l.getJSON(t, function(t) {
                t.MediaOption && (t.MediaOption = JSON.parse(t.MediaOption)),
                  (n = l.extend({}, t, n)),
                  r && l.isFunction(r) && (r(n, e), l(document).trigger(a));
              })
            : r && l.isFunction(r) && (r(n, e), l(document).trigger(a)),
          !1
        );
      },
      submit: function(e) {
        var t = e.target,
          i = l(t),
          n = this,
          o = i.find(':submit'),
          r = void 0,
          s = l(c.$formLoading),
          a = this.options.onSubmit;
        l(document).trigger('selectcoreBeforeSend.qor.selectcore'),
          i.find('.qor-fieldset--new').remove(),
          d &&
            (e.preventDefault(),
            l.ajax(i.prop('action'), {
              method: i.prop('method'),
              data: new d(t),
              dataType: 'json',
              processData: !1,
              contentType: !1,
              beforeSend: function() {
                l('.qor-submit-loading').remove(),
                  s
                    .appendTo(
                      o.prop('disabled', !0).closest('.qor-form__actions'),
                    )
                    .trigger('enable.qor.material');
              },
              success: function(t) {
                t.MediaOption && (t.MediaOption = JSON.parse(t.MediaOption)),
                  ((r = t).primaryKey = r.ID),
                  l('.qor-error').remove(),
                  a && l.isFunction(a)
                    ? (a(r, e),
                      l(document).trigger('afterSubmitted.qor.selectcore'))
                    : n.refresh();
              },
              error: function(t) {
                c.handleAjaxError(t);
              },
              complete: function() {
                o.prop('disabled', !1);
              },
            }));
      },
      refresh: function() {
        setTimeout(function() {
          window.location.reload();
        }, 350);
      },
      destroy: function() {
        this.unbind();
      },
    }),
    (r.plugin = function(n) {
      return this.each(function() {
        var t = l(this),
          e = t.data(o),
          i = void 0;
        if (!e) {
          if (/destroy/.test(n)) return;
          t.data(o, (e = new r(this, n)));
        }
        'string' == typeof n && l.isFunction((i = e[n])) && i.apply(e);
      });
    }),
    (l.fn.qorSelectCore = r.plugin),
    r
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(a) {
  var n = a('body'),
    t = a(document),
    l = window.Mustache,
    o = 'qor.selectone',
    i = 'click.' + o,
    r = 'enable.' + o,
    e = 'reload.qor.bottomsheets',
    s = '.qor-selected-many__remove',
    d = '.qor-selected-many__undo',
    c = 'qor-selected-many__deleted',
    u = '.qor-field__selectmany',
    h = 'is_selected',
    f = 'qor-bottomsheets__select-many';
  function p(t, e) {
    (this.$element = a(t)),
      (this.options = a.extend({}, p.DEFAULTS, a.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (p.prototype = {
      constructor: p,
      init: function() {
        this.bind();
      },
      bind: function() {
        t.on(e, '.' + f, this.reloadData.bind(this)),
          this.$element
            .on(i, s, this.clearSelect.bind(this))
            .on(
              i,
              '[data-select-modal="many"]',
              this.openBottomSheets.bind(this),
            )
            .on(i, d, this.undoDelete.bind(this));
      },
      unbind: function() {
        t.off(i, '[data-select-modal="many"]').off(e, '.' + f),
          this.$element.off(i, s).off(i, d);
      },
      clearSelect: function(t) {
        var e = a(t.target),
          i = e.closest(u);
        return (
          e.closest('[data-primary-key]').addClass(c),
          this.updateSelectInputData(i),
          !1
        );
      },
      undoDelete: function(t) {
        var e = a(t.target),
          i = e.closest(u);
        return (
          e.closest('[data-primary-key]').removeClass(c),
          this.updateSelectInputData(i),
          !1
        );
      },
      openBottomSheets: function(t) {
        var e = a(t.target),
          i = e.data();
        (this.BottomSheets = n.data('qor.bottomsheets')),
          (this.bottomsheetsData = i),
          (this.$selector = i.selectId
            ? a(i.selectId)
            : e.closest(u).find('select')),
          (this.$selectFeild = this.$selector
            .closest(u)
            .find('.qor-field__selected-many')),
          (this.SELECT_MANY_SELECTED_ICON = a(
            '[name="select-many-selected-icon"]',
          ).html()),
          (this.SELECT_MANY_UNSELECTED_ICON = a(
            '[name="select-many-unselected-icon"]',
          ).html()),
          (this.SELECT_MANY_HINT = a('[name="select-many-hint"]').html()),
          (this.SELECT_MANY_TEMPLATE = a(
            '[name="select-many-template"]',
          ).html()),
          (i.url = i.selectListingUrl),
          i.selectDefaultCreating && (i.url = i.selectCreatingUrl),
          this.BottomSheets.open(i, this.handleSelectMany.bind(this));
      },
      reloadData: function() {
        this.initItems();
      },
      renderSelectMany: function(t) {
        return l.render(this.SELECT_MANY_TEMPLATE, t);
      },
      renderHint: function(t) {
        return l.render(this.SELECT_MANY_HINT, t);
      },
      initItems: function() {
        var i,
          t = this.$bottomsheets.find('tbody tr'),
          n = this.SELECT_MANY_SELECTED_ICON,
          o = this.SELECT_MANY_UNSELECTED_ICON,
          r = [];
        this.$selectFeild
          .find('[data-primary-key]')
          .not('.' + c)
          .each(function() {
            r.push(a(this).data().primaryKey);
          }),
          t.each(function() {
            var t = a(this),
              e = t.find('td:first');
            (i = t.data().primaryKey),
              '-1' != r.indexOf(i) ? (t.addClass(h), e.append(n)) : e.append(o);
          }),
          this.updateHint(this.getSelectedItemData());
      },
      getSelectedItemData: function() {
        return {
          selectedNum: this.$selectFeild.find('[data-primary-key]').not('.' + c)
            .length,
        };
      },
      updateHint: function(t) {
        var e;
        a.extend(t, this.bottomsheetsData),
          (e = this.renderHint(t)),
          this.$bottomsheets.find('.qor-selectmany__hint').remove(),
          this.$bottomsheets.find('.qor-page__body').before(e);
      },
      updateSelectInputData: function(t) {
        var e,
          i,
          n,
          o = (t || this.$selectFeild).find('[data-primary-key]').not('.' + c),
          r = t ? t.find('.qor-field__selectmany-input') : this.$selector,
          s = r.find('option');
        s.prop('selected', !1),
          o.each(function() {
            (n = a(this).data().primaryKey),
              (e = s.filter('[value="' + n + '"]')).length ||
                ((i = { primaryKey: n, displayName: '' }),
                (e = a(l.render(p.SELECT_MANY_OPTION_TEMPLATE, i))),
                r.append(e)),
              e.prop('selected', !0);
          });
      },
      changeIcon: function(t, e) {
        t.find('.qor-select__select-icon').remove(),
          t.find('td:first').prepend(e);
      },
      removeItem: function(t) {
        var e = t.primaryKey;
        this.$selectFeild
          .find('[data-primary-key="' + e + '"]')
          .find(s)
          .click(),
          this.changeIcon(t.$clickElement, this.SELECT_MANY_UNSELECTED_ICON);
      },
      addItem: function(t, e) {
        var i,
          n = this.renderSelectMany(t),
          o = this.$selectFeild.find(
            '[data-primary-key="' + t.primaryKey + '"]',
          );
        return o.length
          ? o.hasClass(c)
            ? (o.removeClass(c),
              this.updateSelectInputData(),
              void this.changeIcon(
                t.$clickElement,
                this.SELECT_MANY_SELECTED_ICON,
              ))
            : void 0
          : (this.$selectFeild.append(n),
            e
              ? ((i = a(l.render(p.SELECT_MANY_OPTION_TEMPLATE, t))).appendTo(
                  this.$selector,
                ),
                i.prop('selected', !0),
                this.$bottomsheets.remove(),
                void (
                  a('.qor-bottomsheets').is(':visible') ||
                  a('body').removeClass('qor-bottomsheets-open')
                ))
              : void this.changeIcon(
                  t.$clickElement,
                  this.SELECT_MANY_SELECTED_ICON,
                ));
      },
      handleSelectMany: function(t) {
        var e = {
          onSelect: this.onSelectResults.bind(this),
          onSubmit: this.onSubmitResults.bind(this),
        };
        t.qorSelectCore(e).addClass(f),
          t.on(
            i,
            '.qor-selectmany__selectall',
            this.handleSelectAll.bind(this),
          ),
          (this.$bottomsheets = t),
          this.initItems();
      },
      handleSelectAll: function() {
        var t = this.$bottomsheets.find('.qor-table tbody tr'),
          e = t.not('.is_selected');
        e.length ? e.click() : t.click();
      },
      onSelectResults: function(t) {
        this.handleResults(t);
      },
      onSubmitResults: function(t) {
        this.handleResults(t, !0);
      },
      handleResults: function(t, e) {
        if (
          ((t.displayName =
            t.Text || t.Name || t.Title || t.Code || t[Object.keys(t)[0]]),
          e)
        )
          this.addItem(t, !0);
        else {
          var i = t.$clickElement;
          i.toggleClass(h),
            i.hasClass(h) ? this.addItem(t) : this.removeItem(t),
            this.updateHint(this.getSelectedItemData()),
            this.updateSelectInputData();
        }
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (p.SELECT_MANY_OPTION_TEMPLATE =
      '<option value="[[ primaryKey ]]" >[[ displayName ]]</option>'),
    (p.plugin = function(n) {
      return this.each(function() {
        var t,
          e = a(this),
          i = e.data(o);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(o, (i = new p(this, n)));
        }
        'string' == typeof n && a.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    a(function() {
      var e = '[data-toggle="qor.selectmany"]';
      a(document)
        .on('disable.qor.selectone', function(t) {
          p.plugin.call(a(e, t.target), 'destroy');
        })
        .on(r, function(t) {
          p.plugin.call(a(e, t.target));
        })
        .triggerHandler(r);
    }),
    p
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(r) {
  var n = r('body'),
    t = r(document),
    s = window.Mustache,
    o = 'qor.selectone',
    e = 'click.' + o,
    i = 'enable.' + o,
    a = 'reload.qor.bottomsheets',
    l = '.qor-selected__remove',
    d = '.qor-selected__change',
    c = '.qor-field__selected',
    u = '.qor-field__selectone-input',
    h = '.qor-field__selectone-trigger',
    f = '.qor-field__selectone',
    p = 'qor-bottomsheets__select-one';
  function m(t, e) {
    (this.$element = r(t)),
      (this.options = r.extend({}, m.DEFAULTS, r.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (m.prototype = {
      constructor: m,
      init: function() {
        this.bind();
      },
      bind: function() {
        t.on(a, '.' + p, this.reloadData.bind(this)),
          this.$element
            .on(e, l, this.clearSelect.bind(this))
            .on(e, '[data-selectone-url]', this.openBottomSheets.bind(this))
            .on(e, d, this.changeSelect);
      },
      unbind: function() {
        t.off(e, '[data-selectone-url]').off(a, '.' + p),
          this.$element.off(e, l).off(e, d);
      },
      clearSelect: function(t) {
        var e = r(t.target).closest(f);
        return (
          e.find(c).remove(),
          e.find(u).html(''),
          (e.find(u)[0].value = ''),
          e.find(h).show(),
          e.trigger('qor.selectone.unselected'),
          !1
        );
      },
      changeSelect: function() {
        r(this)
          .closest(f)
          .find(h)
          .trigger('click');
      },
      openBottomSheets: function(t) {
        var e = r(t.target),
          i = e.data();
        (this.BottomSheets = n.data('qor.bottomsheets')),
          (this.$parent = e.closest(f)),
          (i.url = i.selectoneUrl),
          (this.SELECT_ONE_SELECTED_ICON = r(
            '[name="select-one-selected-icon"]',
          ).html()),
          this.BottomSheets.open(i, this.handleSelectOne.bind(this));
      },
      initItem: function() {
        var t,
          e = this.$parent.find(c);
        e.length &&
          (t = e.data().primaryKey) &&
          this.$bottomsheets
            .find('tr[data-primary-key="' + t + '"]')
            .addClass('is_selected')
            .find('td:first')
            .append(this.SELECT_ONE_SELECTED_ICON);
      },
      reloadData: function() {
        this.initItem();
      },
      renderSelectOne: function(t) {
        return s.render(r('[name="select-one-selected-template"]').html(), t);
      },
      handleSelectOne: function(t) {
        var e = {
          onSelect: this.onSelectResults.bind(this),
          onSubmit: this.onSubmitResults.bind(this),
        };
        t.qorSelectCore(e).addClass(p),
          (this.$bottomsheets = t),
          this.initItem();
      },
      onSelectResults: function(t) {
        this.handleResults(t);
      },
      onSubmitResults: function(t) {
        this.handleResults(t, !0);
      },
      handleResults: function(t) {
        var e,
          i = this.$parent,
          n = i.find('select'),
          o = i.find(c);
        (t.displayName =
          t.Text || t.Name || t.Title || t.Code || t[Object.keys(t)[0]]),
          (t.selectoneValue = t.primaryKey || t.ID),
          n.length &&
            ((e = this.renderSelectOne(t)),
            o.length && o.remove(),
            i.prepend(e),
            i.find(h).hide(),
            n.html(s.render(m.SELECT_ONE_OPTION_TEMPLATE, t)),
            (n[0].value = t.primaryKey || t.ID),
            i.trigger('qor.selectone.selected', [t]),
            this.$bottomsheets.qorSelectCore('destroy').remove(),
            r('.qor-bottomsheets').is(':visible') ||
              r('body').removeClass('qor-bottomsheets-open'));
      },
      destroy: function() {
        this.unbind(), this.$element.removeData(o);
      },
    }),
    (m.SELECT_ONE_OPTION_TEMPLATE =
      '<option value="[[ selectoneValue ]]" selected>[[ displayName ]]</option>'),
    (m.plugin = function(n) {
      return this.each(function() {
        var t,
          e = r(this),
          i = e.data(o);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(o, (i = new m(this, n)));
        }
        'string' == typeof n && r.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    r(function() {
      var e = '[data-toggle="qor.selectone"]';
      r(document)
        .on('disable.qor.selectone', function(t) {
          m.plugin.call(r(e, t.target), 'destroy');
        })
        .on(i, function(t) {
          m.plugin.call(r(e, t.target));
        })
        .triggerHandler(i);
    }),
    m
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(d) {
  var t = d(document),
    r = 'qor.selector',
    i = 'enable.' + r,
    e = 'click.' + r,
    c = 'selected',
    u = 'disabled',
    s = 'clearable',
    a = '.' + c,
    h = '.qor-selector-toggle',
    l = '.qor-selector-label',
    f = '.qor-selector-menu',
    p = '.qor-bottomsheets';
  function m(t, e) {
    (this.options = e), (this.$element = d(t)), this.init();
  }
  return (
    (m.prototype = {
      constructor: m,
      init: function() {
        var t = this.$element;
        (this.placeholder =
          t.attr('placeholder') || t.attr('name') || 'Select'),
          this.build();
      },
      build: function() {
        var t = this.$element,
          e = d(m.TEMPLATE),
          i = this.options.aligned + '-aligned',
          a = {},
          n = t.data(),
          o = n.hover,
          l = t.attr('name');
        (this.isBottom = 'bottom' == n.position),
          o && e.addClass('hover'),
          e
            .addClass(i)
            .find(f)
            .html(function() {
              var s = [];
              return (
                t.children().each(function() {
                  var t = d(this),
                    e = t.attr('selected'),
                    i = t.attr('disabled'),
                    n = t.attr('value'),
                    o = t.text(),
                    r = [];
                  e &&
                    (r.push(c),
                    (a.value = n),
                    (a.label = o),
                    (a.paramName = l)),
                    i && r.push(u),
                    s.push(
                      '<li' +
                        (r.length ? ' class="' + r.join(' ') + '"' : '') +
                        ' data-value="' +
                        n +
                        '" data-label="' +
                        o +
                        '" data-param-name="' +
                        l +
                        '">' +
                        o +
                        '</li>',
                    );
                }),
                s.join('')
              );
            }),
          (this.$selector = e),
          t.hide().after(e),
          e.find(h).data('paramName', l),
          this.pick(a, !0),
          this.bind();
      },
      unbuild: function() {
        this.unbind(), this.$selector.remove(), this.$element.show();
      },
      bind: function() {
        this.$selector.on(e, d.proxy(this.click, this)),
          t.on(e, d.proxy(this.close, this));
      },
      unbind: function() {
        this.$selector.off(e, this.click);
      },
      click: function(t) {
        var e = d(t.target);
        t.stopPropagation(),
          e.is('.qor-selector-clear')
            ? this.clear()
            : e.is('li')
            ? (e.hasClass(c) || e.hasClass(u) || this.pick(e.data()),
              this.close())
            : e.closest(h).length && this.open();
      },
      pick: function(t, e) {
        var i = this.$selector,
          n = !!t.value,
          o = this.$element;
        i
          .find(h)
          .toggleClass('active', n)
          .toggleClass(s, n && this.options.clearable)
          .find(l)
          .text(t.label || this.placeholder),
          e ||
            (i
              .find(f)
              .children('[data-value="' + t.value + '"]')
              .addClass(c)
              .siblings(a)
              .removeClass(c),
            o.val(t.value),
            o.closest(p).length &&
            !o.closest('[data-toggle="qor.filter"]').length
              ? d(p).trigger('selectorChanged.qor.selector', [
                  t.value,
                  t.paramName,
                ])
              : o.trigger('change'));
      },
      clear: function() {
        var t = this.$element;
        this.$selector
          .find(h)
          .removeClass('active')
          .removeClass(s)
          .find(l)
          .text(this.placeholder)
          .end()
          .end()
          .find(f)
          .children(a)
          .removeClass(c),
          t.val('').trigger('change');
      },
      open: function() {
        t.triggerHandler(e),
          d('.qor-filter__dropdown').hide(),
          this.$selector.addClass('open'),
          this.isBottom && this.$selector.addClass('bottom');
      },
      close: function() {
        this.$selector.removeClass('open'),
          this.isBottom && this.$selector.removeClass('bottom');
      },
      destroy: function() {
        this.unbuild(), this.$element.removeData(r);
      },
    }),
    (m.DEFAULTS = { aligned: 'left', clearable: !1 }),
    (m.TEMPLATE =
      '<div class="qor-selector"><a class="qor-selector-toggle"><span class="qor-selector-label"></span><i class="material-icons qor-selector-arrow">arrow_drop_down</i><i class="material-icons qor-selector-clear">clear</i></a><ul class="qor-selector-menu"></ul></div>'),
    (m.plugin = function(o) {
      return this.each(function() {
        var t,
          e,
          i = d(this),
          n = i.data(r);
        if (!n) {
          if (/destroy/.test(o)) return;
          (t = d.extend(
            {},
            m.DEFAULTS,
            i.data(),
            'object' === (void 0 === o ? 'undefined' : _typeof(o)) && o,
          )),
            i.data(r, (n = new m(this, t)));
        }
        'string' == typeof o && d.isFunction((e = n[o])) && e.apply(n);
      });
    }),
    d(function() {
      var e = '[data-toggle="qor.selector"]';
      d(document)
        .on('disable.qor.selector', function(t) {
          m.plugin.call(d(e, t.target), 'destroy');
        })
        .on(i, function(t) {
          m.plugin.call(d(e, t.target));
        })
        .triggerHandler(i);
    }),
    m
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(q) {
  var t = q(document),
    a = window.FormData,
    i = window.QOR_Translations,
    o = window._,
    l = window.QOR,
    r = 'qor.slideout',
    e = 'keyup.' + r,
    n = 'click.' + r,
    s = 'submit.' + r,
    w = 'shown.' + r,
    $ = 'hidden.' + r,
    d = 'transitionend',
    c = 'qor-slideout-open',
    u = 'qor-slideout-mini',
    h = 'is-shown',
    f = 'is-slided',
    S = '.qor-body__loading';
  function p(t, e) {
    var i = [],
      n = 'href';
    return (
      e && (n = 'src'),
      t.each(function() {
        i.push(q(this).attr(n));
      }),
      o.uniq(i)
    );
  }
  function m(t, e) {
    var i = q.fn.qorSliderAfterShow;
    for (var n in i)
      i.hasOwnProperty(n) &&
        !i[n].isLoaded &&
        ((i[n].isLoaded = !0), i[n].call(this, t, e));
  }
  function k(t, e, i) {
    for (var n = 0, o = 0, r = t.length; o < r; o++) {
      var s = document.createElement('script');
      (s.onload = function() {
        ++n === t.length && q.isFunction(i) && i(),
          e && e.url && e.response && m(e.url, e.response);
      }),
        (s.src = t[o]),
        document.body.appendChild(s);
    }
  }
  function x(t) {
    var e = document.createElement('link'),
      i = t.shift();
    (e.type = 'text/css'),
      (e.rel = 'stylesheet'),
      (e.onload = function() {
        t.length && x(t);
      }),
      (e.href = i),
      document.getElementsByTagName('head')[0].appendChild(e);
  }
  function D(t) {
    var e = q('script'),
      i = p(t, !0),
      n = p(e, !0);
    return o.difference(i, n);
  }
  function C(t) {
    var e = q('link'),
      i = p(t),
      n = p(e);
    return o.difference(i, n);
  }
  function y(t, e) {
    (this.$element = q(t)),
      (this.options = q.extend({}, y.DEFAULTS, q.isPlainObject(e) && e)),
      (this.slided = !1),
      (this.disabled = !1),
      (this.slideoutType = !1),
      this.init();
  }
  return (
    (y.prototype = {
      constructor: y,
      init: function() {
        this.build(), this.bind();
      },
      build: function() {
        var t;
        (this.$slideout = t = q(y.TEMPLATE).appendTo('body')),
          (this.$slideoutTemplate = t.html());
      },
      unbuild: function() {
        this.$slideout.remove();
      },
      bind: function() {
        this.$slideout
          .on(s, 'form', this.submit.bind(this))
          .on(
            n,
            '.qor-slideout__fullscreen',
            this.toggleSlideoutMode.bind(this),
          )
          .on(n, '[data-dismiss="slideout"]', this.hide.bind(this)),
          t.on(e, q.proxy(this.keyup, this));
      },
      unbind: function() {
        this.$slideout.off(s, this.submit).off(n), t.off(e, this.keyup);
      },
      keyup: function(t) {
        if (27 === t.which) {
          if (
            q('.qor-bottomsheets').is(':visible') ||
            q('.qor-modal').is(':visible') ||
            q('#redactor-modal-box').length ||
            q('#dialog').is(':visible')
          )
            return;
          this.hide(), this.removeSelectedClass();
        }
      },
      loadExtraResource: function(t) {
        var e = C(t.$links),
          i = D(t.$scripts);
        e.length && x(e), i.length && k(i, t);
      },
      removeSelectedClass: function() {
        this.$element.find('[data-url]').removeClass('is-selected');
      },
      addLoading: function() {
        q(S).remove(),
          q(y.TEMPLATE_LOADING)
            .appendTo(q('body'))
            .trigger('enable.qor.material');
      },
      toggleSlideoutMode: function() {
        this.$slideout
          .toggleClass('qor-slideout__fullscreen')
          .find('.qor-slideout__fullscreen i')
          .toggle();
      },
      submit: function(t) {
        var i = this.$slideout,
          e = t.target,
          n = q(e),
          o = this,
          r = q(l.$formLoading),
          s = n.find(':submit');
        n.data('normal-submit') ||
          (i.trigger('slideoutBeforeSend.qor.slideout'),
          a &&
            (t.preventDefault(),
            (this.submitXHR = q.ajax(n.prop('action'), {
              method: n.prop('method'),
              data: new a(e),
              dataType: 'html',
              processData: !1,
              contentType: !1,
              beforeSend: function() {
                q('.qor-submit-loading').remove(),
                  r
                    .appendTo(
                      s.prop('disabled', !0).closest('.qor-form__actions'),
                    )
                    .trigger('enable.qor.material'),
                  (q.fn.qorSlideoutBeforeHide = null);
              },
              success: function() {
                var t = n.data('returnUrl'),
                  e = n.data('refreshUrl');
                i.trigger('slideoutSubmitComplete.qor.slideout'),
                  e
                    ? (window.location.href = e)
                    : 'refresh' != t && t && 'refresh' != t
                    ? o.load(t)
                    : o.refresh();
              },
              error: function(t) {
                l.handleAjaxError(t);
              },
              complete: function() {
                s.prop('disabled', !1);
              },
            }))));
      },
      load: function(m, y) {
        var b,
          t,
          e,
          g,
          v = this.options,
          _ = this.$slideout;
        m &&
          ((y = q.isPlainObject(y) ? y : {}),
          (b = y.method ? y.method : 'GET'),
          (t = y.datatype ? y.datatype : 'html'),
          (e = q.proxy(function() {
            q.ajax(m, {
              method: b,
              dataType: t,
              cache: !0,
              ifModified: !0,
              success: q.proxy(function(t) {
                var e,
                  i,
                  n,
                  o,
                  r = void 0,
                  s = void 0,
                  a = void 0,
                  l = void 0,
                  d = void 0,
                  c = void 0;
                if ((q(S).remove(), 'GET' === b)) {
                  if (
                    ((a = (s = (r = q(t)).find(
                      '.mdl-layout__content.qor-page',
                    )).find('.qor-form-container')),
                    (this.slideoutType = a.length && a.data().slideoutType),
                    !s.length)
                  )
                    return;
                  var u = t.match(/<\s*body.*>[\s\S]*<\s*\/body\s*>/gi);
                  if (u) {
                    (u = u
                      .join('')
                      .replace(/<\s*body/gi, '<div')
                      .replace(/<\s*\/body/gi, '</div')),
                      (c = q(u).prop('class')),
                      q('body').addClass(c);
                    var h = {
                      $scripts: r.filter('script'),
                      $links: r.filter('link'),
                      url: m,
                      response: t,
                    };
                    this.loadExtraResource(h);
                  }
                  if (
                    (s
                      .find('.qor-button--cancel')
                      .attr('data-dismiss', 'slideout')
                      .removeAttr('href'),
                    (l = D(s.find('script[src]'))),
                    (d = C(s.find('link[href]'))),
                    l.length)
                  )
                    k(l, { url: m, response: t }, function() {});
                  d.length && x(d),
                    s.find('script[src],link[href]').remove(),
                    _.html(this.$slideoutTemplate),
                    (g = _.find('.qor-slideout__title')),
                    (this.$body = _.find('.qor-slideout__body')),
                    g.html(r.find(v.title).html()),
                    (e = _.find('.qor-slideout__body')[0]),
                    (i = s.html()),
                    (n = 'string' == typeof e ? document.getElementById(e) : e),
                    ((o = n.cloneNode(!1)).innerHTML = i),
                    n.parentNode.replaceChild(o, n),
                    this.$body.find('.qor-actions__locale').remove(),
                    _.one(w, function() {
                      q(this).trigger('enable');
                    }).one($, function() {
                      q(this).trigger('disable');
                    }),
                    _.find('.qor-slideout__opennew').attr('href', m),
                    this.show();
                  var f = q.fn.qorSliderAfterShow;
                  if (f)
                    for (var p in f)
                      f.hasOwnProperty(p) &&
                        q.isFunction(f[p]) &&
                        ((f[p].isLoaded = !0), f[p].call(this, m, t));
                  _.trigger('slideoutLoaded.qor.slideout', [m, t]);
                } else y.returnUrl ? this.load(y.returnUrl) : this.refresh();
              }, this),
              error: q.proxy(function() {
                var t;
                q(S).remove(),
                  (t =
                    0 < q('.qor-error span').length
                      ? q('.qor-error span')
                          .map(function() {
                            return q(this).text();
                          })
                          .get()
                          .join(', ')
                      : i.serverError),
                  window.alert(t);
              }, this),
            });
          }, this)),
          this.slided ? (this.hide(!0), this.$slideout.one($, e)) : e());
      },
      open: function(t) {
        this.addLoading(), this.load(t.url, t.data);
      },
      reload: function(t) {
        this.hide(), this.load(t);
      },
      show: function() {
        var t,
          e = this.$slideout;
        this.slided ||
          ((t = q.Event('show.qor.slideout')),
          e.trigger(t),
          t.isDefaultPrevented() ||
            (e.removeClass(u),
            'mini' == this.slideoutType && e.addClass(u),
            e.addClass(h).get(0).offsetWidth,
            e
              .one(d, q.proxy(this.shown, this))
              .addClass(f)
              .scrollTop(0)));
      },
      shown: function() {
        (this.slided = !0),
          q('body').addClass(c),
          this.$slideout
            .trigger('beforeEnable.qor.slideout')
            .trigger(w)
            .trigger('afterEnable.qor.slideout');
      },
      hide: function() {
        var t = { confirm: i.slideoutCloseWarning };
        q.fn.qorSlideoutBeforeHide
          ? l.qorConfirm(
              t,
              function(t) {
                t && this.hideSlideout();
              }.bind(this),
            )
          : this.hideSlideout(),
          this.removeSelectedClass();
      },
      hideSlideout: function() {
        var t,
          e = this.$slideout,
          i = q('.qor-datepicker').not('.hidden');
        (window.onbeforeunload = null),
          (q.fn.qorSlideoutBeforeHide = null),
          this.submitXHR && this.submitXHR.abort(),
          i.length && i.addClass('hidden'),
          this.slided &&
            ((t = q.Event('hide.qor.slideout')),
            e.trigger(t),
            t.isDefaultPrevented() ||
              (e
                .one(d, q.proxy(this.hidden, this))
                .removeClass(f + ' qor-slideout__fullscreen'),
              e.trigger('slideoutClosed.qor.slideout')));
      },
      hidden: function() {
        (this.slided = !1),
          q('body').removeClass(c),
          this.$slideout.removeClass(h).trigger($);
      },
      refresh: function() {
        this.hide(),
          setTimeout(function() {
            window.location.reload();
          }, 350);
      },
      destroy: function() {
        this.unbind(), this.unbuild(), this.$element.removeData(r);
      },
    }),
    (y.DEFAULTS = { title: '.qor-form-title, .mdl-layout-title', content: !1 }),
    (y.TEMPLATE =
      '<div class="qor-slideout">\n            <div class="qor-slideout__header">\n                <div class="qor-slideout__header-link">\n                    <a href="#" target="_blank" class="mdl-button mdl-button--icon mdl-js-button mdl-js-repple-effect qor-slideout__opennew"><i class="material-icons">open_in_new</i></a>\n                    <a href="#" class="mdl-button mdl-button--icon mdl-js-button mdl-js-repple-effect qor-slideout__fullscreen">\n                        <i class="material-icons">fullscreen</i>\n                        <i class="material-icons" style="display: none;">fullscreen_exit</i>\n                    </a>\n                </div>\n                <button type="button" class="mdl-button mdl-button--icon mdl-js-button mdl-js-repple-effect qor-slideout__close" data-dismiss="slideout">\n                    <span class="material-icons">close</span>\n                </button>\n                <h3 class="qor-slideout__title"></h3>\n            </div>\n            <div class="qor-slideout__body"></div>\n        </div>'),
    (y.TEMPLATE_LOADING =
      '<div class="qor-body__loading">\n            <div><div class="mdl-spinner mdl-js-spinner is-active qor-layout__bottomsheet-spinner"></div></div>\n        </div>'),
    (y.plugin = function(n) {
      return this.each(function() {
        var t,
          e = q(this),
          i = e.data(r);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(r, (i = new y(this, n)));
        }
        'string' == typeof n && q.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    (q.fn.qorSlideout = y.plugin),
    y
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(o) {
  var r = window.location,
    s = 'qor.sorter',
    t = 'enable.' + s,
    e = 'click.' + s,
    i = 'is-sortable';
  function a(t, e) {
    (this.$element = o(t)),
      (this.options = o.extend({}, a.DEFAULTS, o.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (a.prototype = {
      constructor: a,
      init: function() {
        this.$element.addClass(i), this.bind();
      },
      bind: function() {
        this.$element.on(e, '> thead > tr > th', o.proxy(this.sort, this));
      },
      unbind: function() {
        this.$element.off(e, this.sort);
      },
      sort: function(t) {
        var e = o(t.currentTarget).data('orderBy'),
          i = r.search,
          n = 'order_by=' + e;
        e &&
          (/order_by/.test(i)
            ? (i = i.replace(/order_by(=\w+)?/, function() {
                return n;
              }))
            : (i += -1 < i.indexOf('?') ? '&' + n : n),
          (r.search = i));
      },
      destroy: function() {
        this.unbind(), this.$element.removeClass(i).removeData(s);
      },
    }),
    (a.DEFAULTS = {}),
    (a.plugin = function(n) {
      return this.each(function() {
        var t,
          e = o(this),
          i = e.data(s);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(s, (i = new a(this, n)));
        }
        'string' == typeof n && o.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    o(function() {
      var e = '.qor-js-table';
      o(document)
        .on('disable.qor.sorter', function(t) {
          a.plugin.call(o(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          a.plugin.call(o(e, t.target));
        })
        .triggerHandler(t);
    }),
    a
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(s) {
  var e = window._,
    r = s('body'),
    o = 'qor.tabbar',
    t = 'enable.' + o,
    i = 'click.' + o,
    a = '.qor-layout__tab-button',
    l = '.qor-layout__tab-content',
    d = '.mdl-layout__tab-bar-container',
    c = '.qor-layout__tab-right',
    u = '.qor-layout__tab-left',
    h = 'is-active';
  function f(t, e) {
    (this.$element = s(t)),
      (this.options = s.extend({}, f.DEFAULTS, s.isPlainObject(e) && e)),
      this.init();
  }
  return (
    (f.prototype = {
      constructor: f,
      init: function() {
        this.initTab(), this.bind();
      },
      bind: function() {
        this.$element.on(i, a, this.switchTab.bind(this)),
          this.$element.on(i, c, this.scrollTabRight.bind(this)),
          this.$element.on(i, u, this.scrollTabLeft.bind(this));
      },
      unbind: function() {
        this.$element.off(i, a, this.switchTab),
          this.$element.off(i, c, this.scrollTabRight),
          this.$element.off(i, u, this.scrollTabLeft);
      },
      initTab: function() {
        var t = this.$element.data();
        t.scopeActive
          ? r.data('tabScopeActive', t.scopeActive)
          : (s(a)
              .first()
              .addClass(h),
            r.data(
              'tabScopeActive',
              s(a)
                .first()
                .data('name'),
            )),
          (this.tabWidth = 0),
          (this.slideoutWidth = s(l).outerWidth()),
          e.each(
            s(a),
            function(t) {
              this.tabWidth = this.tabWidth + s(t).outerWidth();
            }.bind(this),
          ),
          this.tabWidth > this.slideoutWidth &&
            this.$element.find(d).append(f.ARROW_RIGHT);
      },
      scrollTabLeft: function(t) {
        t.stopPropagation();
        var e = s(d),
          i = e.scrollLeft(),
          n = i - this.slideoutWidth;
        0 < i &&
          e.animate({ scrollLeft: n }, 400, function() {
            s(c).show(), 0 == e.scrollLeft() && s(u).hide();
          });
      },
      scrollTabRight: function(t) {
        t.stopPropagation();
        var e = s(d),
          i = e.scrollLeft(),
          n = this.tabWidth,
          o = this.slideoutWidth,
          r = i + o;
        r < n &&
          (e.animate({ scrollLeft: r }, 400, function() {
            s(u).show(), e.scrollLeft() + o >= n && s(c).hide();
          }),
          !s(u).length && this.$element.find(d).prepend(f.ARROW_LEFT));
      },
      switchTab: function(t) {
        var i = s(t.target),
          e = this.$element,
          n = i.data(),
          o = r.data().tabScopeActive;
        if (s('.qor-slideout').is(':visible'))
          return (
            i.hasClass(h) ||
              (e.find(a).removeClass(h),
              i.addClass(h),
              s.ajax(n.tabUrl, {
                method: 'GET',
                dataType: 'html',
                processData: !1,
                contentType: !1,
                beforeSend: function() {
                  s('.qor-layout__tab-spinner').remove();
                  s(l)
                    .hide()
                    .before(
                      '<div class="mdl-spinner mdl-js-spinner is-active qor-layout__tab-spinner"></div>',
                    ),
                    window.componentHandler.upgradeElement(
                      s('.qor-layout__tab-spinner')[0],
                    );
                },
                success: function(t) {
                  s('.qor-layout__tab-spinner').remove(),
                    r.data('tabScopeActive', i.data('name'));
                  var e = s(t)
                    .find(l)
                    .html();
                  s(l)
                    .show()
                    .html(e)
                    .trigger('enable');
                },
                error: function() {
                  s('.qor-layout__tab-spinner').remove(),
                    r.data('tabScopeActive', o);
                },
              })),
            !1
          );
      },
      destroy: function() {
        this.unbind(), r.removeData('tabScopeActive');
      },
    }),
    (f.ARROW_RIGHT =
      '<a href="javascript://" class="qor-layout__tab-right"></a>'),
    (f.ARROW_LEFT =
      '<a href="javascript://" class="qor-layout__tab-left"></a>'),
    (f.DEFAULTS = {}),
    (f.plugin = function(n) {
      return this.each(function() {
        var t,
          e = s(this),
          i = e.data(o);
        if (!i) {
          if (/destroy/.test(n)) return;
          e.data(o, (i = new f(this, n)));
        }
        'string' == typeof n && s.isFunction((t = i[n])) && t.apply(i);
      });
    }),
    s(function() {
      var e = '[data-toggle="qor.tab"]';
      s(document)
        .on('disable.qor.tabbar', function(t) {
          f.plugin.call(s(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          f.plugin.call(s(e, t.target));
        })
        .triggerHandler(t);
    }),
    f
  );
});
_typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          'function' == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? 'symbol'
          : typeof t;
      };
!(function(t) {
  'function' == typeof define && define.amd
    ? define(['jquery'], t)
    : 'object' ===
      ('undefined' == typeof exports ? 'undefined' : _typeof(exports))
    ? t(require('jquery'))
    : t(jQuery);
})(function(r) {
  var s = 'qor.timepicker',
    t = 'enable.' + s,
    e = 'click.' + s,
    i = 'focus.' + s,
    n = 'keydown.' + s,
    o = 'blur.' + s,
    a = 'selectTime.' + s,
    l = '[data-picker-type]';
  function d(t, e) {
    (this.$element = r(t)),
      (this.options = r.extend(!0, {}, d.DEFAULTS, r.isPlainObject(e) && e)),
      (this.formatDate = null),
      (this.pickerData = this.$element.data()),
      (this.parent = this.$element.closest(l)),
      (this.isDateTimePicker = 'datetime' == this.parent.data('picker-type')),
      (this.$targetInput = this.parent.find(
        this.pickerData.targetInput ||
          (this.isDateTimePicker
            ? '.qor-datetimepicker__input'
            : '.qor-datepicker__input'),
      )),
      this.init();
  }
  return (
    (d.prototype = {
      init: function() {
        if (this.$targetInput.is(':disabled')) this.$element.remove();
        else {
          this.bind(), (this.oldValue = this.$targetInput.val());
          var t = new Date(),
            e = t.getMonth() + 1,
            i = t.getDate();
          (e = e < 8 ? '0' + e : e),
            (i = i < 10 ? '0' + i : i),
            (this.dateValueNow = t.getFullYear() + '-' + e + '-' + i);
        }
      },
      bind: function() {
        this.isDateTimePicker &&
          this.$targetInput
            .qorTimepicker({
              timeFormat: 'H:i',
              showOn: null,
              wrapHours: !1,
              scrollDefault: 'now',
            })
            .on(a, r.proxy(this.changeTime, this))
            .on(o, r.proxy(this.blur, this))
            .on(i, r.proxy(this.focus, this))
            .on(n, r.proxy(this.keydown, this)),
          this.$element.on(e, r.proxy(this.show, this));
      },
      unbind: function() {
        this.$element.off(e, this.show),
          this.isDateTimePicker &&
            this.$targetInput
              .off(a, this.changeTime)
              .off(o, this.blur)
              .off(i, this.focus)
              .off(n, this.keydown);
      },
      focus: function() {},
      blur: function() {
        var t,
          e,
          i,
          n,
          o,
          r,
          s = this.$targetInput.val(),
          a = s.split(' '),
          l = a.length,
          d = /\d{1,2}:\d{1,2}/,
          c = /^\d{4}-\d{1,2}-\d{1,2}/;
        if (s) {
          if (1 == l)
            c.test(a[0]) && ((e = a[0]), (i = '00:00')),
              d.test(a[0]) && ((e = this.dateValueNow), (i = a[0]));
          else
            for (var u = 0; u < l; u++) {
              (n = c.test(a[u])),
                (o = d.test(a[u])),
                n && ((e = a[u]), (r = '-')),
                o && ((i = a[u]), (r = ':')),
                (t = a[u].split(r));
              for (var h = 0; h < t.length; h++)
                t[h].length < 2 && (t[h] = '0' + t[h]);
              n && (e = t.join(r)), o && (i = t.join(r));
            }
          this.checkDate(e) && this.checkTime(i)
            ? (this.$targetInput.val(e + ' ' + i),
              (this.oldValue = this.$targetInput.val()))
            : this.$targetInput.val(this.oldValue);
        }
      },
      keydown: function(t) {
        var e = t.keyCode;
        -1 ==
          [
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            8,
            37,
            38,
            39,
            40,
            27,
            32,
            20,
            189,
            16,
            186,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
          ].indexOf(e) && t.preventDefault();
      },
      checkDate: function(t) {
        return /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(
          t,
        );
      },
      checkTime: function(t) {
        return /^([01]\d|2[0-3]):?([0-5]\d)$/.test(t);
      },
      changeTime: function() {
        var t,
          e = this.$targetInput,
          i = this.oldValue,
          n = /\d{1,2}:\d{1,2}/,
          o = n.test(i),
          r = e
            .data()
            .timepickerList.find('.ui-timepicker-selected')
            .html();
        (t = i
          ? o
            ? i.replace(n, r)
            : i + ' ' + r
          : this.dateValueNow + ' ' + r),
          e.val(t);
      },
      show: function() {
        this.isDateTimePicker &&
          (this.$targetInput.qorTimepicker('show'),
          (this.oldValue = this.$targetInput.val()));
      },
      destroy: function() {
        this.unbind(),
          this.$targetInput.qorTimepicker('remove'),
          this.$element.removeData(s);
      },
    }),
    (d.DEFAULTS = {}),
    (d.plugin = function(o) {
      return this.each(function() {
        var t,
          e,
          i = r(this),
          n = i.data(s);
        if (!n) {
          if (!r.fn.qorDatepicker) return;
          if (/destroy/.test(o)) return;
          (t = r.extend(
            !0,
            {},
            i.data(),
            'object' === (void 0 === o ? 'undefined' : _typeof(o)) && o,
          )),
            i.data(s, (n = new d(this, t)));
        }
        'string' == typeof o && r.isFunction((e = n[o])) && e.apply(n);
      });
    }),
    r(function() {
      var e = '[data-toggle="qor.timepicker"]';
      r(document)
        .on('disable.qor.timepicker', function(t) {
          d.plugin.call(r(e, t.target), 'destroy');
        })
        .on(t, function(t) {
          d.plugin.call(r(e, t.target));
        })
        .triggerHandler(t);
    }),
    d
  );
});
('use strict');
$(function() {
  $(document).on('click.qor.alert', '[data-dismiss="alert"]', function() {
    $(this)
      .closest('.qor-alert')
      .removeClass('qor-alert__active');
  }),
    setTimeout(function() {
      $('.qor-alert[data-dismissible="true"]').removeClass('qor-alert__active');
    }, 5e3);
}),
  $(function() {
    $(document).on('click', '.qor-dialog--global-search', function(e) {
      e.stopPropagation(),
        $(e.target).parents('.qor-dialog-content').length ||
          $(e.target).is('.qor-dialog-content') ||
          $('.qor-dialog--global-search').remove();
    }),
      $(document).on('click', '.qor-global-search--show', function(e) {
        e.preventDefault();
        var a = $(this).data(),
          o = window.Mustache.render(
            '<div class="qor-dialog qor-dialog--global-search" tabindex="-1" role="dialog" aria-hidden="true"><div class="qor-dialog-content"><form action=[[actionUrl]]><div class="mdl-textfield mdl-js-textfield" id="global-search-textfield"><input class="mdl-textfield__input ignore-dirtyform" name="keyword" id="globalSearch" value="" type="text" placeholder="" /><label class="mdl-textfield__label" for="globalSearch">[[placeholder]]</label></div></form></div></div>',
            a,
          );
        $('body').append(o),
          window.componentHandler.upgradeElement(
            document.getElementById('global-search-textfield'),
          ),
          $('#globalSearch').focus();
      });
  }),
  $(function() {
    var l = [],
      s = 'qoradmin_menu_status',
      e = localStorage.getItem(s);
    e && e.length && (l = e.split(',')),
      $('.qor-menu-container')
        .on('click', '> ul > li > a', function() {
          var e = $(this),
            a = e.parent(),
            o = e.next('ul'),
            t = a.attr('qor-icon-name');
          o.length &&
            (o.hasClass('in')
              ? (l.push(t),
                a.removeClass('is-expanded'),
                o
                  .one('transitionend', function() {
                    o.removeClass('collapsing in');
                  })
                  .addClass('collapsing')
                  .height(0))
              : ((l = _.without(l, t)),
                a.addClass('is-expanded'),
                o
                  .one('transitionend', function() {
                    o.removeClass('collapsing');
                  })
                  .addClass('collapsing in')
                  .height(o.prop('scrollHeight'))),
            localStorage.setItem(s, l));
        })
        .find('> ul > li > a')
        .each(function() {
          var e = $(this),
            a = e.parent(),
            o = e.next('ul'),
            t = a.attr('qor-icon-name');
          o.length &&
            (o.addClass('collapse'),
            a.addClass('has-menu'),
            -1 != l.indexOf(t)
              ? o.height(0)
              : (a.addClass('is-expanded'),
                o.addClass('in').height(o.prop('scrollHeight'))));
        });
    var a = $('.qor-page > .qor-page__header'),
      o = $('.qor-page > .qor-page__body'),
      t = a.find('.qor-page-subnav__header').length ? 96 : 48;
    a.length &&
      (a.height() > t && o.css('padding-top', a.height()),
      $('.qor-page').addClass('has-header'),
      $('header.mdl-layout__header').addClass('has-action'));
  }),
  $(function() {
    $('.qor-mobile--show-actions').on('click', function() {
      $('.qor-page__header').toggleClass('actions-show');
    });
  }),
  $(function() {
    var p = $('body'),
      m = void 0,
      q = void 0,
      f = 'is-selected',
      b = function() {
        return p.hasClass('qor-bottomsheets-open');
      };
    function v(e) {
      $('[data-url]').removeClass(f), e && e.length && e.addClass(f);
    }
    p.qorBottomSheets(),
      p.qorSlideout(),
      (m = p.data('qor.slideout')),
      (q = p.data('qor.bottomsheets')),
      $(document).on('click.qor.openUrl', '[data-url]', function(e) {
        var a = $(this),
          o = $(e.target),
          t = a.hasClass('qor-button--new'),
          l = a.hasClass('qor-button--edit'),
          s =
            (a.is('.qor-table tr[data-url]') ||
              a.closest('.qor-js-table').length) &&
            !a.closest('.qor-slideout').length,
          n = a.data(),
          r = void 0,
          i = n.openType,
          d = a.parents('.qor-theme-slideout').length,
          c = a.closest('.qor-slideout').length,
          h =
            a.hasClass('qor-action-button') || a.hasClass('qor-action--button');
        if (
          (e.stopPropagation(),
          !(
            a.data('ajax-form') ||
            o.closest('.qor-table--bulking').length ||
            o.closest('.qor-button--actions').length ||
            (!o.data('url') && o.is('a')) ||
            (s && b())
          ))
        )
          if ('window' != i) {
            var u, g;
            if ('new_window' != i)
              return (
                h &&
                  ((u = $('.qor-js-table tbody').find(
                    '.mdl-checkbox__input:checked',
                  )),
                  (g = []),
                  (r =
                    !!u.length &&
                    (u.each(function() {
                      g.push(
                        $(this)
                          .closest('tr')
                          .data('primary-key'),
                      );
                    }),
                    g)) && (n = $.extend({}, n, { actionData: r }))),
                (n.$target = o),
                n.method && 'GET' != n.method.toUpperCase()
                  ? void 0
                  : (('bottomsheet' != i && !h) || 'slideout' == i
                      ? 'slideout' == i || s || (t && !b()) || l
                        ? 'slideout' == i || d
                          ? a.hasClass(f)
                            ? (m.hide(), v())
                            : (m.open(n), v(a))
                          : (window.location.href = n.url)
                        : p.hasClass('qor-slideout-open') || (t && b())
                        ? q.open(n)
                        : d
                        ? m.open(n)
                        : q.open(n)
                      : h &&
                        !r &&
                        a.closest('[data-toggle="qor.action.bulk"]').length &&
                        !c
                      ? window.QOR.qorConfirm(n.errorNoItem)
                      : q.open(n),
                    !1)
              );
            window.open(n.url, '_blank');
          } else window.location.href = n.url;
      });
  }),
  $(function() {
    var l = window.location;
    $('.qor-search').each(function() {
      var e = $(this),
        a = e.find('.qor-search__input'),
        o = e.find('.qor-search__clear'),
        t = !!a.val();
      e.closest('.qor-page__header').addClass('has-search'),
        $('header.mdl-layout__header').addClass('has-search'),
        o.on('click', function() {
          a.val() || t
            ? '?' ==
              l.search.replace(new RegExp(a.attr('name') + '\\=?\\w*'), '')
              ? (l.href = l.href.split('?')[0])
              : (l.search = l.search.replace(
                  new RegExp(a.attr('name') + '\\=?\\w*'),
                  '',
                ))
            : e.removeClass('is-dirty');
        });
    });
  });
